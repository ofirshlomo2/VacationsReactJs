const jwt = require('jsonwebtoken');

const JWT = {
	privateKey: 'SECRET!!!!!',
	sign: function (payload) {
		return new Promise((resolve, reject) => {
			jwt.sign(payload, this.privateKey, function (err, token) {
				if (err) return reject(err);
				return resolve(token);
			});
		});
	},

	verify: function (token) {
		return new Promise((resolve, reject) => {
			jwt.verify(token, this.privateKey, function (err, decoded) {
				if (err) return reject(err);
				return resolve(decoded);
			});
		});
	},
};

module.exports = { JWT };
