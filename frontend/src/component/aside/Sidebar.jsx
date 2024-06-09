import React from 'react';
import { Link } from 'react-router-dom';


// menu item data
const menuItem = [
    {
        href: "/inventory-management/admin",
        title: "Home",
        iconUrl: "https://cdn-icons-png.flaticon.com/128/845/845022.png"
    },
    {
        href: "/inventory-management/admin/category",
        title: "Category",
        iconUrl: "https://cdn-icons-png.flaticon.com/128/4013/4013399.png"
    },
    {
        href: "/inventory-management/admin/subcategory",
        title: "Sub Category",
        iconUrl: "https://cdn-icons-png.flaticon.com/128/9131/9131997.png"
    },
    {
        href: "/inventory-management/admin/product",
        title: "Product",
        iconUrl: "https://cdn-icons-png.flaticon.com/128/1601/1601366.png"
    }
]


const Sidebar = () => {
    return (
        <>
            <div className="h-full top-20 px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <ul className="space-y-2 font-medium">
                    {
                        menuItem.map((item, index) => (
                            <li key={index}>
                                <Link
                                    to={item.href}
                                    className="focus:bg-indigo-300 flex items-center gap-4 p-2 text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700 group"
                                >
                                    <img src={item.iconUrl} alt="product" width={25} height={25} />
                                    <span className="flex-1 ms-3 whitespace-nowrap">{item.title}</span>
                                    <img src="https://cdn-icons-png.flaticon.com/128/59/59385.png" alt="product" width={15} height={15} />
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>

        </>
    )
}

export default Sidebar;