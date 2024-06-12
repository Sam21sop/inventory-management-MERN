import React, { useState } from 'react'
import { Outlet } from "react-router-dom";
import Navbar from '../Navbar/Navbar';
import LogoutModal from '../userComponents/LogoutModal';
import Sidebar from '../aside/Sidebar';

const LayoutComponent = () => {

    const [isLogoutModalOpen, setIsLogoutmodalOpen] = useState(false);

    const openLogoutModalHandler = () => {
        setIsLogoutmodalOpen(!isLogoutModalOpen);
    }

    return (
        <div className='m-0 p-0'>
            {/* navbar */}
            <nav className="bg-purple-200 border-gray-200 w-screen dark:bg-gray-900">
                <Navbar openLogoutModal={openLogoutModalHandler} />
            </nav>

            <div className='relative h-screen w-screen'>
                {/* aside  */}
                <aside className="h-full w-1/5 absolute ">
                    <Sidebar />
                </aside>

                {/* main content  */}
                <main className='absolute h-full ml-80 w-4/5'>
                    {
                        isLogoutModalOpen ? <LogoutModal isLogoutModalOpen={isLogoutModalOpen} setIsLogoutmodalOpen={setIsLogoutmodalOpen} /> : <Outlet />
                    }
                </main>
            </div>
        </div>
    );
}

export default LayoutComponent