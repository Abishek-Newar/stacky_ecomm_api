import jwt from 'jsonwebtoken';
import env from '../../infrastructure/env.js';

export const Auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ msg: "Authorization required in headers" });
    }

    const token = authHeader.split(' ')[1]; 

    jwt.verify(token, env.JWT_SECRET, (err,decoded) => {
        if (err) {
            return res.status(401).json({ msg: "Invalid token" });
        }

        req.userId = decoded.id; 
        next();
    });
};


