const { JWT } = require('../config');

const db = require('../database');

function validateRegister(body) {
	const { firstName, lastName, userName, password } = body;
	if (!firstName) return 'firstName is required';
	if (!lastName) return 'lastName is required';
	if (!userName) return 'userName is required';
	if (!password) return 'password is required';

	return null;
}



module.exports = {
	logout: async (req, res) => {
		try {
			res.cookie('token', null, {
				httpOnly: true,
				maxAge: 0,
			});
			res.json({
				success: true,
			});
		} catch (error) {
			console.log('/api/auth/current err', error.message);
			res.status(500).json({ message: 'Server error', error });
		}
	},
	login: async (req, res) => {
		try {
			const { userName, password } = req.body;
			const user = await db.auth.login(userName, password);
			if (!user) return res.status(400).json({ message: 'user name or password not valid' });
			delete user.password;
			const token = await JWT.sign({ id: user.id, role: user.role });
			res.cookie('token', token, {
				httpOnly: true,
			});
			res.json(user);
		} catch (error) {
			console.log('controller.auth.login err', error.message);
			res.status(500).json({ message: 'Server error' });
		}
	},
	register: async (req, res) => {
		try {
			const errorMessage = validateRegister(req.body);
			if (errorMessage) {
				return res.status(400).json({ message: errorMessage });
			}
			const { firstName, lastName, userName, password } = req.body;

			const id = await db.auth.register({ lastName, firstName, userName, password });
			if (!id) {
				// insert fail
			}
			res.json({ id: id });
		} catch (error) {
			console.log('controller.auth.register err', error.message);
			if (error.errno === 1062) {
				//  Duplicate entry key 'users.userName
				return res.status(400).json({ message: 'this user name is exists' });
			}
			res.status(500).json({ message: 'Server error', error });
		}
	},
	current: async (req, res) => {
		try {
			const user = await db.auth.current(req.user.id);
			res.json(user);
		} catch (error) {
			console.log('/api/auth/current err', error.message);
			res.status(500).json({ message: 'Server error', error });
		}
	},
};
