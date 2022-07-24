const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers['token'];
        if (token) {
            const verifyTKN = jwt.verify(token, process.env.JWT_SECRET);
            if (verifyTKN) {
                req.user = verifyTKN
                next();
            } else {
                res.status(400).json({ msg: "Invalid Token" });
            };
        } else {
            res.status(400).json("Invalid Token");
        };
    } catch (error) {
        res.status(400).json({ msg: "Invalid Token" });
    };
};