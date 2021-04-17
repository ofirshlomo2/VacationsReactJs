module.exports = {
	login: async (userName, password) => {
		try {
			const query = `SELECT * FROM Users WHERE userName='${userName}' AND password='${password}'`;
			// query databa
			const [rows] = await global.connection.execute(query);
			return rows[0];
		} catch (error) {
			console.log('database.auth.login error', error.message);
		}
	},
	register: async ({ firstName, lastName, userName, password }) => {
		try {
			const query = `
            INSERT INTO Users (firstName, lastName, userName, password, role) 
            VALUES ('${firstName}', '${lastName}', '${userName}', '${password}', 0)
         `;
			// query databa
			const [result] = await global.connection.execute(query);
			return result.insertId;
		} catch (error) {
			console.log('database.auth.register error', error.message);
		}
	},
	current: async id => {
		try {
			const query = `SELECT * FROM Users WHERE id='${id}'`;
			// query databa
			const [result] = await global.connection.execute(query);
			return result[0];
		} catch (error) {
			console.log('database.auth.register error', error.message);
		}
	},
};
