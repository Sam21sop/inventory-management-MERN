import React from 'react'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
    return (
        <>
            <section className="bg-slate-50 dark:bg-gray-900 ">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow-[0px_0px_10px_5px_#00000017] border-x-fuchsia-400 border dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="space-y-4 md:space-y-6 sm:p-8">
                            <div className='flex justify-center py-1'>
                                <img
                                    src="https://cdn-icons-png.flaticon.com/128/1000/1000999.png"
                                    alt="login"
                                    width={50}
                                    height={50}
                                />
                            </div>
                            {/* heading section  */}
                            <h1 className="text-xl font-bold leading-none text-center tracking-tight text-fuchsia-700 md:text-2xl dark:text-white">
                                Did you forgot password ?
                            </h1>
                            <p className='text-sm text-center'> We'll send you a link to reset password</p>

                            {/* form body  */}
                            <form className="space-y-4 md:space-y-6" action="#">
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
                                        placeholder="employee@company.com"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full text-white bg-fuchsia-900 hover:bg-green-100 hover:text-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Request Reset Link
                                </button>
                                <p className="text-md text-center font-light text-gray-500 dark:text-gray-400">
                                    <Link
                                        to={'/inventory-management'}
                                        className="font-medium hover:underline "
                                    >
                                        Back to Home
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

export default ForgotPassword