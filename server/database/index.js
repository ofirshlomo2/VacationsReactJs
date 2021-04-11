
module.exports = {
	vacations: {
		getAllVacations: async id => {
			const query = `SELECT 
            v.description, v.price, v.destination, 
            v.startDate, v.endDate, v.id, v.image,
            f.userId as isFollow
            FROM Vacations As v
            LEFT JOIN Followers As f
            ON v.id = f.vacationId AND f.userId = ${id};
            ;`;
			// query databa
			const [vacations] = await global.connection.execute(query);
			return vacations;
		},

		addVacation: async ({ description, price, destination, startDate, endDate, image }) => {
			const query = `
               INSERT INTO Vacations (description, price, destination, startDate, endDate, image) 
               VALUES ('${description}', ${price}, '${destination}', '${startDate}', '${endDate}', '${image}')
            `;
			const [result] = await global.connection.execute(query);
			return result;
		},
	},

	user: {},

	auth: {
		LoginFanction: async ({ userName, password }) => {
			const query = `SELECT * FROM Users WHERE userName='${userName}' AND password='${password}'`;
			const [rows] = await global.connection.execute(query);
			console.log(rows)
			return rows;
		},
		currenUser: async id => {
			const query = `SELECT * FROM Users WHERE id='${id}'`;
			const [result] = await global.connection.execute(query);
			return result;

		},

	}


};
