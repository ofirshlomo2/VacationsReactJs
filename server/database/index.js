const auth = require('./auth');

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
		delete: async id => {
			try {
				const queryF = `DELETE FROM Followers WHERE vacationId = ${id};`;
				const query = `DELETE FROM Vacations WHERE id = ${id};`;
				// query databa
				const [followrsResult] = await global.connection.execute(queryF);
				const [vacations] = await global.connection.execute(query);
				return true;
			} catch (error) {
				console.log('database.vacations.delete error', error.message);
			}
		},
		reports: async id => {
			try {
				const query = `
            SELECT COUNT(userId)as count, destination, vacationId
            FROM vacations, followers
            WHERE vacations.id = followers.vacationId
            GROUP BY vacations.destination
         `;
				// query databa
				const [result] = await global.connection.execute(query);
				return result;
			} catch (error) {
				console.log('database.vacations.reports error', error.message);
			}
		},
		update: async ({ description, price, destination, startDate, endDate, id, imageSet }) => {
			try {
				const query = `
            UPDATE  Vacations 
            SET description='${description}', price=${price}, 
            destination='${destination}', startDate='${startDate}', 
            endDate='${endDate}' ${imageSet}
            WHERE id=${id}
         `;
				const [result] = await global.connection.execute(query);
				return result;
			} catch (error) {
				console.log('database.vacations.update error', error.message);
			}
		},
		unFollow: async ({ vacationId, userId }) => {
			try {
				const query = `
            DELETE FROM Followers 
            WHERE userId=${userId} AND
            vacationId=${vacationId}
         `;
				const [result] = await global.connection.execute(query);
				return result;
			} catch (error) {
				console.log('database.vacations.unFollow error', error.message);
			}
		},
		follow: async ({ userId, vacationId }) => {
			const query = `
					INSERT INTO Followers (userId, vacationId) 
					VALUES (${userId}, ${vacationId})
				`;
			const [result] = await global.connection.execute(query);
			return result.insertId;
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
	auth: auth,
};
