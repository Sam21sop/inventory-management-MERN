import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../redux/userSlices/userSlice';

const LogoutModal = (props) => {

    const { isLogoutModalOpen, setIsLogoutmodalOpen } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/inventory-management');
    }

    return (
        <>
            <div className="p-4 w-full max-w-md max-h-full mx-auto my-auto">
                <div className="bg-white rounded-lg shadow-[0px_0px_10px_5px_#00000017] border-x-fuchsia-400 border dark:bg-gray-700">
                    <div className="p-4 md:p-5 text-center">
                        <div className='flex gap-6 font-bold justify-center'>
                            <img src="https://cdn-icons-png.flaticon.com/128/595/595067.png" alt="warning" height={50} width={50} />
                            <h1 className='text-5xl'>Logout</h1>
                        </div>

                        <h3 className="my-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to logout ?
                        </h3>
                        <div className='flex gap-10 justify-center'>
                            <button
                                onClick={handleLogout}
                                type="button"
                                className="text-white bg-red-600 hover:bg-red-100 hover:text-black focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                            >
                                Yes, I'm sure
                            </button>
                            <button
                                onClick={() => setIsLogoutmodalOpen(!isLogoutModalOpen)}
                                type="button"
                                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            >
                                No, cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default LogoutModal