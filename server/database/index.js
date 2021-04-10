// const mysql2Promise = require("mysql2/promise")
// const { DB_SCHEMA, DB_USER, DB_PASSWORD, DB_PORT, DB_HOST } = process.env;
// console.log(DB_SCHEMA, DB_USER, DB_PASSWORD, DB_PORT, DB_HOST)

// async function getConnection() {
//     try {
//         const connection = await mysql2Promise.createPool({
//             host: DB_HOST,
//             port: DB_PORT,
//             user: DB_USER,
//             password: DB_PASSWORD,
//             multipleStatements: false,
//             database: DB_SCHEMA,
//             connectionLimit: 10
//         });
//         return connection;
//     } catch (ex) {
//         console.log("Failed connect to DB")
//         console.log(ex.message)
//     }

// }

// module.exports = getConnection

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
		addVacation: async ({description, price, destination, startDate, endDate, image}) => {
			const query = `
               INSERT INTO Vacations (description, price, destination, startDate, endDate, image) 
               VALUES ('${description}', ${price}, '${destination}', '${startDate}', '${endDate}', '${image}')
            `;
			const [result] = await global.connection.execute(query);
            return result;
		},
	},
	user: {},
	auth: {},
};
