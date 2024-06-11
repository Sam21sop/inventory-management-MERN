import { Router } from "express";
import isAuthorised from "../middleware/authMiddleware.js";
import { getUserProfile, isLoggedIn, loginUser, logoutUser, registerNewUser, updateUserProfile } from "../controllers/userController.js";


const userRoutes = Router();

userRoutes.post('/register', registerNewUser);
userRoutes.post('/login', loginUser);
userRoutes.post('/logout', isAuthorised, logoutUser);

userRoutes.get('/is-logged-in', isLoggedIn);
userRoutes.get('/profile', isAuthorised, getUserProfile)

userRoutes.put('/profile', isAuthorised, updateUserProfile);



export default userRoutes;