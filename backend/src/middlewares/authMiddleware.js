const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado! Token não fornecido.' });
    }

    try {
        req.user = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido ou expirado!' });
    }
};

module.exports = {authMiddleware};
