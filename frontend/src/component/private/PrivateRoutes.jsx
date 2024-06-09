import React from 'react'
import { Navigate } from 'react-router-dom';
import { userSelector } from '../../redux/userSlices/userSlice';
import { useSelector, useDispatch } from 'react-redux';


const PrivateRoutes = ({ children }) => {
    const userStatus = useSelector(userSelector);
    const isAuthenticated = true;
    return isAuthenticated ? children : <Navigate to={'/inventory-management'}/>
}

export default PrivateRoutes;