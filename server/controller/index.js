const database = require('../database');

module.exports = {
	vacations: {
		getVacations: async (req, res) => {
			try {
				const vacations = await database.vacations.getAllVacations(req.user.id);
				res.json(vacations);
			} catch (error) {
				console.log('login err', error.message);
				res.status(500).json({ message: 'Server error' });
			}
		},
		create: async (req, res) => {
			try {
				const { body, file } = req;

				const image = `/images/${file.filename}`;
				const { description, price, destination, startDate, endDate } = req.body;

				const result = await database.vacations.create({ description, price, destination, startDate, endDate });

				res.json({ id: result.insertId, description, price, destination, startDate, endDate, image });
			} catch (error) {
				console.log('login err', error.message);
				res.status(500).json({ message: 'Server error' });
			}
		},
	},

	auth: {
		login: async (req, res) => {},
		register: async (req, res) => {
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
		},
		current: async (req, res) => {},
	},
};

function validateRegister(body) {
	const { firstName, lastName, userName, password } = body;
	if (!firstName) return 'firstName is required';
	if (!lastName) return 'lastName is required';
	if (!userName) return 'userName is required';
	if (!password) return 'password is required';

	return null;
}
