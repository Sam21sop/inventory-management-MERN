import axios from "axios";
import { toast } from "react-toastify";

// backend url
const BACKEND_BASE_URL = "http://localhost:8080/api/user";

// email validation
const validateEmail = async (email) => {
    return await email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};


// register user
const registerUserApiHandler = async (userData) => {
    try {
        const response = await axios.post(`http://localhost:8080/api/user/register`, userData, {withCredentials:true});
        if (response.statusText === 'OK') {
            toast.success("User Registered successfully.");
        }
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        toast.error(message);
    }
};


//  login user
const loginUserApiHandler = async (userData) => { 
    try {
        const response = await axios.post(`${BACKEND_BASE_URL}/login`, userData);
        if (response.statusText === "OK") {
            toast.success("User Login Successfully.");
        };
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        toast.error(message);
    }
};


//logout user
const logoutUserApiHandler = async () => {
    try {
        await axios.get(`${BACKEND_BASE_URL}/logout`);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        toast.error(message);
    }
};


// forgot password
const forgotPasswordApiHandler = async (userData) => {
    try {
        const response = await axios.post(`${BACKEND_BASE_URL}/forgot-password`, userData);
        toast.success(response.data.message);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        toast.error(message);
    }
};


// reset password
const resetPasswordApiHandler = async (userData, resetToken) => { 
    try {
        const response = await axios.put(`${BACKEND_BASE_URL}/reset-password/${resetToken}`, userData);
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        toast.error(message);
    }
};


// get login status
const getLoginStatusApiHandler = async () => { 
    try {
        const response = await axios.get(`${BACKEND_BASE_URL}/logged`);
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        toast.error(message);
    }
};


// get user
const getUserApiHandler = async () => {
    try {
        const response = await axios.get(`${BACKEND_BASE_URL}/get-user`);
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        toast.error(message);
    }
};


// update user profile
const updateUserApiHandler = async (formData) => { 
    try {
        const response = await axios.patch(`${BACKEND_BASE_URL}/update-user`, formData);
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        toast.error(message);
    }
};


// change password
const changePasswordApiHandler = async (formData) => {
    try {
        const response = await axios.patch(`${BACKEND_BASE_URL}/change-password`);
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        toast.error(message);
    }
};


export {
    validateEmail,
    registerUserApiHandler,
    loginUserApiHandler,
    logoutUserApiHandler,
    getLoginStatusApiHandler,
    getUserApiHandler,
    updateUserApiHandler,
    changePasswordApiHandler,
    forgotPasswordApiHandler,
    resetPasswordApiHandler
};