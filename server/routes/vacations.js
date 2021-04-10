const router = require('express').Router();
const { isAdmin } = require('../middleware');
const multer = require('multer');
const upload = multer({ dest: 'public/images/', preservePath: true });






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
		console.log('delete vacation err', error.message);
		res.status(500).json({ message: 'Server error' });
	}
});




router.get('/', async (req, res) => {
	try {
		const query = `SELECT 
		v.description, v.price, v.destination, 
		v.startDate, v.endDate, v.id, v.image,
		f.userId as isFollow
		FROM Vacations As v
		LEFT JOIN Followers As f
		ON v.id = f.vacationId;
		;`;
		// query databa
		const [vacations] = await global.connection.execute(query);
		res.json(vacations);
	} catch (error) {
		console.log('login err', error.message);
		res.status(500).json({ message: 'Server error' });
	}
});



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
router.post('/', isAdmin, upload.single('image'), async (req, res) => {
	try {
		const { body, file } = req;
		console.log('body', body);
		console.log('file', file);
		const image = `/images/${file.filename}`;
		const { description, price, destination, startDate, endDate } = req.body;
		const query = `
			INSERT INTO Vacations (description, price, destination, startDate, endDate, image) 
			VALUES ('${description}', ${price}, '${destination}', '${startDate}', '${endDate}', '${image}')
		`;
		const [result] = await global.connection.execute(query);
		res.json({ id: result.insertId, description, price, destination, startDate, endDate, image });
	} catch (error) {
		console.log('login err', error.message);
		res.status(500).json({ message: 'Server error' });
	}
});


module.exports = router;
