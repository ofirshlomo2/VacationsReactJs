const router = require('express').Router();
const { isAdmin } = require('../middleware');
const multer = require('multer');
const upload = multer({ dest: 'public/images/', preservePath: true });

const controller = require('../controller');

router.get('/', controller.vacations.getVacations);
router.post('/', isAdmin, upload.single('image'), controller.vacations.create);
router.post('/follow', controller.vacations.follow);

// delete vacations
router.delete('/:id', controller.vacations.delete);

// remove follow from vacations
router.delete('/follow/:id', controller.vacations.unFollow);

// reports
router.get('/reports', controller.vacations.reports);

// update vacation details
router.put('/:id', isAdmin, upload.single('image'), controller.vacations.update);

module.exports = router;
