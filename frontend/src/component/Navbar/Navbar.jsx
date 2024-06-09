import { Link } from 'react-router-dom'


const Navbar = (props) => {

  const { openLogoutModal } = props;

  return (
    <>
        <div className=" flex flex-wrap items-center justify-between mx-auto p-4">
          {/* company logo with name  */}
          <Link
            to={''}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/4300/4300058.png"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              My Company
            </span>
          </Link>

          {/* user profile icon  */}
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <img
              className="w-8 h-8 rounded-full"
              src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
              alt="user photo"
              onClick={openLogoutModal}
            />
          </div>
        </div>
    </>
  )
}

export default Navbar;
