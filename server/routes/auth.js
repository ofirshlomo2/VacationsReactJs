const router = require('express').Router();

const { hasToken } = require('../middleware');

const controller = require('../controller');

router.get('/current', hasToken, controller.auth.current);
router.get('/logout', hasToken, controller.auth.logout);
router.post('/login', controller.auth.login);
router.post('/register', controller.auth.register);

module.exports = router;
