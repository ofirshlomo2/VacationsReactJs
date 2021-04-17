const database = require('../database');

module.exports = {
	follow: async (req, res) => {
		try {
			const { vacationId } = req.body;

			console.log(`user ${req.user.id} follow vacation ${vacationId}`);

			const id = await database.vacations.follow({ userId: req.user.id, vacationId });
			res.json({ id: id });
		} catch (error) {
			console.log('add folow err', error.message);
			res.status(500).json({ message: 'Server error' });
		}
	},
	unFollow: async (req, res) => {
		try {
			const { id } = req.params;

			console.log(`user ${req.user.id} unfollow vacation ${id}`);
			const result = await database.vacations.unFollow({ userId: req.user.id, vacationId: +id });
			res.json({ id: +id });
		} catch (error) {
			console.log('delete follow folow err', error.message);
			res.status(500).json({ message: 'Server error' });
		}
	},
	reports: async (req, res) => {
		try {
			const result = await database.vacations.reports();
			res.json(result);
		} catch (error) {
			console.log('get reports vacation err', error.message);
			res.status(500).json({ message: 'Server error' });
		}
	},
	delete: async (req, res) => {
		try {
			const { id } = req.params;
			const success = await database.vacations.delete(id);
			res.json(success);
			global.socket.emit('VACATION_DELETE', { id: +id });
			console.log(`vacation ${id} was deleted`);
		} catch (error) {
			console.log('controller.vacation.delete err:', error.message);
			res.status(500).json({ message: 'Server error' });
		}
	},
	getVacations: async (req, res) => {
		try {
			const vacations = await database.vacations.getAllVacations(req.user.id);
			res.json(vacations);
		} catch (error) {
			console.log('controller.vacation.getVacations err', error.message);
			res.status(500).json({ message: 'Server error' });
		}
	},
	update: async (req, res) => {
		try {
			const { body, file } = req;
			const { id } = req.params;
			const image = `/images/${file?.filename}`;

			const { description, price, destination, startDate, endDate } = req.body;
			const imageSet = file ? `, image='${image}'` : '';

			const success = await database.vacations.update({
				description,
				price,
				destination,
				startDate,
				endDate,
				id,
				imageSet,
			});
			const newVacation = { id: +id, description, price, destination, startDate, endDate, image };
			res.json(newVacation);
			global.socket.emit('VACATION_EDIT', newVacation);
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
			const result = await database.vacations.addVacation({
				description,
				price,
				destination,
				startDate,
				endDate,
				image,
			});
			res.json({ id: result.insertId, description, price, destination, startDate, endDate, image });
		} catch (error) {
			console.log('login err', error.message);
			res.status(500).json({ message: 'Server error' });
		}
	},
};
