import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const verifyAdmin = (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(403).json({ message: "Access denied. No token provided." });
        }

        // Verify JWT Token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Invalid or expired token." });
            }
            req.adminEmail = decoded.email; // Attach admin email to request
            next();
        });
    } catch (error) {
        res.status(500).json({ message: "Server error." });
    }
};

export default verifyAdmin;
