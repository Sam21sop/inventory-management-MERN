import userModel from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import processEnvVar from "../utils/processEnvVariable.js";

/**
 * Register a new user.
 * 
 * @param {Object} req - The request object from the client.
 * @param {Object} req.body - The body of the request containing the user data.
 * @param {string} req.body.username - The username of the new user.
 * @param {string} req.body.email - The email of the new user.
 * @param {string} req.body.password - The password of the new user.
 * @param {Object} res - The response object to send the response to the client.
 * @returns {Object} - Returns a JSON response with a success message and a token if the registration is successful.
 * @throws {Error} - Returns a JSON response with an error message and a status code if an error occurs.
 * @desc    Register a new user by creating a new user record in the database. If the user already exists, an error message is returned.
 * @route   POST /api/user/register
 * @access  Public
 */
const registerNewUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // validate the request body
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Please provide all required field"
            })
        }

        // check if the user already exist
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exist !"
            })
        };

        // create token and set token in cookies
        const newUser = await userModel.create({ username, email, password })

        if (newUser) {
            generateToken(res, newUser._id)
            res.status(201).json({
                _id: newUser._id,
                email: newUser.email,
                username: newUser.username
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
};


/**
 * Login user.
 * 
 * @param {Object} req - The request object from the client.
 * @param {Object} req.body - The body of the request containing the user credentials.
 * @param {string} req.body.email - The email of the user trying to log in.
 * @param {string} req.body.password - The password of the user trying to log in.
 * @param {Object} res - The response object to send the response to the client.
 * @returns {Object} - Returns a JSON response with the user ID and email if login is successful, and a token in the response header.
 * @throws {Error} - Returns a JSON response with an error message and a status code if an error occurs.
 * @desc    Authenticate a user by checking the provided email and password against the database records. 
 * If the credentials are valid, generate a token and send it in the response.
 * @route   POST /api/v1/user/login
 * @access  Public
 */
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // get user from database
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(404).json({
            message: "User not found, Invalid email !"
        });
    };

    // compair store password with entered password
    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
        generateToken(res, user._id);
        res.status(200).json({
            _id: user._id,
            email: user.email
        });
    } else {
        res.status(400).json({
            message: "Invalid Password !"
        });
    };
};


/**
 * Logout user.
 * 
 * @param {Object} req - The request object from the client.
 * @param {Object} res - The response object to send the response to the client.
 * @returns {Object} - Returns a JSON response with a success message if logout is successful.
 * @throws {Error} - Returns a JSON response with an error message and a status code if an error occurs.
 * @desc    Logs out a user by clearing the JWT token from the cookies.
 * @route   POST /api/v1/user/logout
 * @access  Public
 */
const logoutUser = async (req, res) => {
    try {
        // clear the value from cookies
        res.cookie('jwt', '', {
            httpOnly: true,
            expires: new Date(0),
        });

        res.status(200).json({ message: "User logged out successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    };
};


/**
 * Check if user is logged in.
 * 
 * @param {Object} req - The request object from the client.
 * @param {Object} req.cookies - The cookies included in the request.
 * @param {string} req.cookies.jwt - The JWT token stored in the cookies.
 * @param {Object} res - The response object to send the response to the client.
 * @returns {Object} - Returns a JSON response with `true` if the user is logged in and the token is valid, otherwise `false`.
 * @throws {Error} - Returns a JSON response with an error message and a status code if an error occurs.
 * @desc    Checks if the user is logged in by verifying the JWT token stored in the cookies.
 * @route   GET /api/v1/user/isLoggedIn
 * @access  Public
 */
const isLoggedIn = async (req, res) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json(false); // Unauthorized if no token
        };

        // verify token
        const isVerified = jwt.verify(token, processEnvVar.JWT_SECRETE_KEY);
        if (isVerified) {
            return res.status(200).json(true); // OK if token is valid
        };

        return res.status(400).json(false); // Bad request if token is invalid
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message }); // Internal server error if something goes wrong
    };
};


/**
 * Update user profile.
 * 
 * @param {Object} req - The request object from the client.
 * @param {Object} req.user - The authenticated user object.
 * @param {string} req.user._id - The ID of the authenticated user.
 * @param {Object} req.body - The body of the request containing the new user data.
 * @param {string} [req.body.email] - The new email of the user.
 * @param {string} [req.body.password] - The new password of the user.
 * @param {Object} res - The response object to send the response to the client.
 * @returns {Object} - Returns a JSON response with the updated user ID and email if the update is successful.
 * @throws {Error} - Returns a JSON response with an error message and a status code if an error occurs.
 * @desc    Updates the profile information of the authenticated user.
 * @route   PUT /api/v1/user/profile
 * @access  Private
 */
const updateUserProfile = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { _id } = req.user;

        // find user by id
        const user = await userModel.findById(_id);
        if (user) {
            // Update user email if provided
            user.email = email || user.email;

            // Update user password if provided
            if (password) {
                user.password = password;
            }

            // Save the updated user
            const updatedUser = await user.save();

            res.status(200).json({
                _id: updatedUser._id,
                email: updatedUser.email
            });
        } else {
            return res.status(404).json({ message: "User not found!" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    };
};


/**
 * Get user profile.
 * 
 * @param {Object} req - The request object from the client.
 * @param {Object} req.user - The authenticated user object.
 * @param {string} req.user._id - The ID of the authenticated user.
 * @param {string} req.user.email - The email of the authenticated user.
 * @param {Object} res - The response object to send the response to the client.
 * @returns {Object} - Returns a JSON response with the user ID and email.
 * @throws {Error} - Returns a JSON response with an error message and a status code if an error occurs.
 * @desc    Retrieves the profile information of the authenticated user.
 * @route   GET /api/v1/user/profile
 * @access  Private
 */
const getUserProfile = async (req, res) => {
    try {
        const { _id, email } = req.user;

        // Get the user profile from the database
        const user = await userModel.findById(_id).select('-password');
        if (user) {
            res.status(200).json({
                _id: user._id,
                email: user.email,
                username: user.username,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};




export {
    registerNewUser,
    loginUser,
    logoutUser,
    isLoggedIn,
    updateUserProfile,
    getUserProfile,
    
};