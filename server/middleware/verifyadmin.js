import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const verifyAdmin = (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (token && token.startsWith("Bearer ")) {
            token = token.slice(7);
        }

        if (!token && req.cookies?.token) {
            token = req.cookies.token;
        }

        if (!token) {
            return res.status(403).json({ message: "Access denied. No token provided." });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Invalid or expired token." });
            }
            req.adminEmail = decoded.email;
            next();
        });
    } catch (error) {
        res.status(500).json({ message: "Server error." });
    }
};

export default verifyAdmin;
