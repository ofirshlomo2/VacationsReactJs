const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const cookieParser = require('cookie-parser');
const mysql = require('mysql2/promise');
const { hasToken } = require('./middleware');
const multer = require('multer');
const upload = multer({ dest: 'public/images/', preservePath: true });
const app = express();
const cors = require('cors');
const routes = require('./routes');
const server = http.createServer(app); // http routing

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser()); // parser cookie -> req.cookies

app.use('/api/vacations', hasToken, routes.vacation);
app.use('/api/auth', routes.auth);

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
