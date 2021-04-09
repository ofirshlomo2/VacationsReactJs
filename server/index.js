const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const mysql = require('mysql2/promise');
// multer
const multer = require('multer');
const upload = multer({ dest: 'public/images/', preservePath: true });
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser()); // parser cookie -> req.cookies
const routes = require('./routes');
app.use('/api/vacations', hasToken, routes.vacation);
const server = http.createServer(app); // http routing
// create websocket instance
const io = socketIO(server, {
	cors: {
		origin: '*',
	},
});

io.on('connection', socket => {
	console.log('socket id:', socket.id);
});

global.socket = io;

// INSERT RESULT
// affectedRows: 1
// fieldCount: 0
// info: ""
// insertId: 3
// serverStatus: 2
// warningStatus: 0

function validateRegister(body) {
	const { firstName, lastName, userName, password } = body;
	if (!firstName) return 'firstName is required';
	if (!lastName) return 'lastName is required';
	if (!userName) return 'userName is required';
	if (!password) return 'password is required';

	return null;
}
app.post('/api/register', async (req, res) => {
	try {
		const errorMessage = validateRegister(req.body);

		if (errorMessage) {
			return res.status(400).json({ message: errorMessage });
		}
		const { firstName, lastName, userName, password } = req.body;

		const query = `
			INSERT INTO Users (firstName, lastName, userName, password, role) 
			VALUES ('${firstName}', '${lastName}', '${userName}', '${password}', 0)
		
		`;

		// query databa
		const [result] = await global.connection.execute(query);

		res.json({ id: result.insertId });
	} catch (error) {
		console.log('login err', error.message);
		if (error.errno === 1062) {
			//  Duplicate entry key 'users.userName
			return res.status(400).json({ message: 'this user name is exists' });
		}

		res.status(500).json({ message: 'Server error', error });
	}
});

// add folow
app.post('/api/vacations/follow', hasToken, async (req, res) => {
	try {
		const { vacationId } = req.body;

		const query = `
			INSERT INTO Followers (userId, vacationId) 
			VALUES (${req.user.id}, ${vacationId})
		`;

		const [result] = await global.connection.execute(query);

		console.log(`user ${req.user.id} follow vacation ${vacationId}`);
		res.json({ id: result.insertId });
	} catch (error) {
		console.log('add folow err', error.message);
		res.status(500).json({ message: 'Server error' });
	}
});




// remove folow
app.delete('/api/vacations/follow', hasToken, async (req, res) => {
	try {
		const { vacationId } = req.body;

		const query = `
			DELETE FROM Followers 
			WHERE userId=${req.user.id} AND
			vacationId=${vacationId}
		`;

		const [result] = await global.connection.execute(query);

		console.log(`user ${req.user.id} unfollow vacation ${vacationId}`);
		res.json({ id: result });
	} catch (error) {
		console.log('add folow err', error.message);
		res.status(500).json({ message: 'Server error' });
	}
});

app.get('/api/auth/current', hasToken, async (req, res) => {
	try {
		console.log('user', req.user);

		const query = `SELECT * FROM Users WHERE id='${req.user.id}'`;

		// query databa
		const [result] = await global.connection.execute(query);

		res.json(result[0]);
	} catch (error) {
		console.log('/api/auth/current err', error.message);
		res.status(500).json({ message: 'Server error', error });
	}
});





app.post('/api/login', async (req, res) => {
	try {
		const { userName, password } = req.body;

		console.log('login:', userName, password);

		const query = `SELECT * FROM Users WHERE userName='${userName}' AND password='${password}'`;

		// query databa
		const [rows] = await global.connection.execute(query);
		console.log('rows', rows);
		const user = rows[0];

		if (!user) {
			return res.status(400).json({ message: 'user name or password not valid' });
		}
		delete user.password;

		const token = await JWT.sign({ id: user.id, role: user.role });

		res.cookie('token', token);
		res.json(user);
	} catch (error) {
		console.log('login err', error.message);
		res.status(500).json({ message: 'Server error' });
	}
});

server.listen(5000, async () => {
	const connection = await mysql.createConnection({
		database: 'vacationdb',
		host: 'localhost',
		user: 'root',
		password: 'ofirshlomo', //123qwe!!
	});
	global.connection = connection;
	console.log('server work 5000');
});

const JWT = {
	privateKey: 'SECRET!!!!!',
	sign: function (payload) {
		return new Promise((resolve, reject) => {
			jwt.sign(payload, this.privateKey, function (err, token) {
				if (err) return reject(err);
				return resolve(token);
			});
		});
	},

	verify: function (token) {
		return new Promise((resolve, reject) => {
			jwt.verify(token, this.privateKey, function (err, decoded) {
				if (err) return reject(err);
				return resolve(decoded);
			});
		});
	},
};

async function hasToken(req, res, next) {
	try {
		const userToken = req.cookies.token;

		if (!userToken) {
			return res.status(401).json({ message: 'not authoticated' });
		}

		const decoded = await JWT.verify(userToken);

		req.user = decoded;
		next(); // call next middleware
	} catch (error) {
		console.log('hasToken error:', error.message);
		return res.status(401).json({ message: 'not authoticated' });
	}
}

function isAdmin(req, res, next) {
	if (req.user.role !== 1) return res.status(403).json({ message: 'not autorirezed' });
	next(); // call next middleware
}
