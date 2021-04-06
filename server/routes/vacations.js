const router = require('express').Router();

const { isAdmin } = require('../middleware');

const multer = require('multer');
const upload = multer({ dest: 'public/images/', preservePath: true });

// update
router.put('/:id', isAdmin, upload.single('image'), async (req, res) => {
	try {
		const { body, file } = req;

		const { id } = req.params;

		const image = `/images/${file?.filename}`;
		console.log('body', body);
		console.log('file', file);

		const { description, price, destination, startDate, endDate } = req.body;

		const imageSet = file ? `, image='${image}` : '';

		const query = `
         UPDATE  Vacations 
			SET description='${description}', price=${price}, 
         destination='${destination}', startDate='${startDate}', 
         endDate='${endDate}' ${imageSet}
         WHERE id=${id}
		`;

		console.log('query', query);

		const [result] = await global.connection.execute(query);

		res.json({ id: result.insertId, description, price, destination, startDate, endDate, image });
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
			VALUES ('${description}', ${price}, '${destination}', '${startDate}', '${startDate}', '${image}')
		
		`;

		const [result] = await global.connection.execute(query);

		res.json({ id: result.insertId, description, price, destination, startDate, endDate, image });
	} catch (error) {
		console.log('login err', error.message);
		res.status(500).json({ message: 'Server error' });
	}
});

module.exports = router;
