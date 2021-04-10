const router = require('express').Router();
const { isAdmin } = require('../middleware');
const multer = require('multer');
const upload = multer({ dest: 'public/images/', preservePath: true });

const controller = require('../controller');

// delete vacations
router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const queryF = `DELETE FROM Followers WHERE vacationId = ${id};`;
		const query = `DELETE FROM Vacations WHERE id = ${id};`;
		// query databa
		const [followrsResult] = await global.connection.execute(queryF);
		const [vacations] = await global.connection.execute(query);
		res.json(vacations);
		global.socket.emit('VACATION_DELETE', { id: +id });
		console.log(`vacation ${id} was deleted`);
	} catch (error) {
		console.log('delete vacation err:', error.message);
		res.status(500).json({ message: 'Server error' });
	}
});

// remove folow
router.delete('/follow/:id', async (req, res) => {
	try {
		const { id } = req.params;

		const query = `
			DELETE FROM Followers 
			WHERE userId=${req.user.id} AND
			vacationId=${+id}
		`;

		const [result] = await global.connection.execute(query);

		console.log(`user ${req.user.id} unfollow vacation ${id}`);
		res.json({ id: result });
	} catch (error) {
		console.log('delete follow folow err', error.message);
		res.status(500).json({ message: 'Server error' });
	}
});

// reports
router.get('/reports', async (req, res) => {
	try {
		const query = `
			SELECT COUNT(userID)as count, destination, vacationId
			FROM Vacations, Followers
			WHERE Vacations.id = Followers.vacationId
			GROUP BY Vacations.destination
			
		`;
		// query databa
		const [result] = await global.connection.execute(query);
		res.json(result);
	} catch (error) {
		console.log('get reports vacation err', error.message);
		res.status(500).json({ message: 'Server error' });
	}
});

router.get('/', controller.vacations.getVacations);

// update
router.put('/:id', isAdmin, upload.single('image'), async (req, res) => {
	try {
		const { body, file } = req;
		const { id } = req.params;
		const image = `/images/${file?.filename}`;
		console.log('body', body);
		console.log('file', file);
		const { description, price, destination, startDate, endDate } = req.body;
		const imageSet = file ? `, image='${image}'` : '';
		const query = `
         UPDATE  Vacations 
			SET description='${description}', price=${price}, 
         destination='${destination}', startDate='${startDate}', 
         endDate='${endDate}' ${imageSet}
         WHERE id=${id}
		`;
		const [result] = await global.connection.execute(query);
		const newVacation = { id: +id, description, price, destination, startDate, endDate, image };
		res.json(newVacation);
		global.socket.emit('VACATION_EDIT', newVacation);
	} catch (error) {
		console.log('login err', error.message);
		res.status(500).json({ message: 'Server error' });
	}
});

// create
router.post('/', isAdmin, upload.single('image'), controller.vacations.create);

module.exports = router;
