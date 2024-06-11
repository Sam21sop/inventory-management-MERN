import jwt from 'jsonwebtoken';
import processEnvVar from '../utils/processEnvVariable.js';
import userModel from '../models/userModel.js';


const isAuthorised = async (req, res, next) => {
    let token;
    if (req.cookies && req.cookies.jwt) {
        try {
            // Get token from cookies
            token = req.cookies.jwt;

            // Verify token
            const decoded = jwt.verify(token, processEnvVar.JWT_SECRETE_KEY);

            // Get user from the token
            req.user = await userModel.findById(decoded.userId).select('-password'); // exclude password

            if (!req.user) {
                return res.status(401).json({ message: "User not found!" });
            }

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    };

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};


export default isAuthorised;
