import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLoginStatus } from '../apiServices/authApiService';
import { setLogin } from '../redux/userSlices/userSlice';
import { toast } from "react-toastify";


const useRedirectLoggedOutUser = (path) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const redirectLoggedOutUser = async () => {
    // get the login status from backend
    const isLoggedIn = await getLoginStatus();

    // dispach / update login status in reducer
    dispatch(setLogin(isLoggedIn));

    // check user is not loggedin
    if (!isLoggedIn) {
        toast.info("Session Expired !, Please login.");
        navigate(path);
        return;
    };
  };

  useEffect(() =>{
    redirectLoggedOutUser();
  }, [navigate, path, dispatch]);

};

export default useRedirectLoggedOutUser;
