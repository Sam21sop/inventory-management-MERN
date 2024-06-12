import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginUser } from '../../redux/userSlices/userSlice';



const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('admin@gmail.com');
    const [password, setPassword] = useState('admin@123');

    const submitFormHandler = (e) => {
        e.preventDefault();

        // mandatory field validation
        if (!email || !password) {
            return toast.error("All field are Required !");
        };

        try {
            dispatch(loginUser({ email, password }));
            navigate('/inventory-management/admin');
        } catch (error) {
            toast.error(error.message)
            console.log(error);
        }
    };

    return (
        <>
            <section className="bg-transparent bg-slate-700 dark:bg-gray-900 ">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white my-20 rounded-lg shadow-[0px_0px_10px_5px_#00000017] border-x-fuchsia-400 border dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

                            <div className='flex justify-center py-2'>
                                <img
                                    src="https://cdn-icons-png.flaticon.com/128/8712/8712101.png"
                                    alt="login"
                                    width={40}
                                    height={40}
                                />
                            </div>
                            <h1 className="text-xl font-bold leading-tight text-center tracking-tight text-fuchsia-700  md:text-2xl dark:text-white">
                                User Login
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={submitFormHandler}>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Email <span className='text-red-500'>*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="admin@gmail.com"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Password <span className='text-red-500'>*</span>
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="flex items-center justify-between">

                                    <Link
                                        to={'/inventory-management/forgot-password'}
                                        className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                                    >
                                        Forgot password ?
                                    </Link>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-fuchsia-900 hover:bg-green-200 hover:text-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Login
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet?
                                    <Link
                                        to={'/inventory-management/register'}
                                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                    >
                                        Register
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login