async function hasToken(req, res, next) {
	try {
		const userToken = req.cookies.token;
		if (!userToken) {
			return res.status(401).json({ message: 'not authoticated' });
		}
		const decoded = await JWT.verify(userToken);
		req.user = decoded;
		next(); // call next middleware
	} catch (error) {
		console.log('hasToken error:', error.message);
		return res.status(401).json({ message: 'not authoticated' });
	}
}



function isAdmin(req, res, next) {
	if (req.user.role !== 1) return res.status(403).json({ message: 'not autorirezed' });
	next(); // call next middleware
}

module.exports = { isAdmin, hasToken };
