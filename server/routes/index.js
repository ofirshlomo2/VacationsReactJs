const vacationRouter = require('./vacations');
const authRouter = require('./auth');

module.exports = {
	vacation: vacationRouter,
	auth: authRouter,
};
