import jwt from 'jsonwebtoken';
import processEnvVar from './processEnvVariable.js';

const SECRETE_KEY = processEnvVar.JWT_SECRETE_KEY;


const generateToken = (res, userId) => {
    const generatedToken = jwt.sign(
        {userId}, 
        SECRETE_KEY,
        {expiresIn:'1d'}
    );

    // set the token in cookies 
    res.cookie(
        'jwt', 
        generatedToken,
        {
            httpOnly: true,
            secure: processEnvVar.NODE_ENV !== 'development',
            sameSite:'strict',
            maxAge: 24 * 60 * 60 * 1000,
        }
    );
};


export default generateToken;