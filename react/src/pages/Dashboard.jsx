import Title from "../components/layouts/DefaultLayout/Title"

import { FaUsers } from "react-icons/fa";
import { FaUsersCog } from "react-icons/fa";
import { GoContainer } from "react-icons/go";
import { FaCalendarAlt } from "react-icons/fa";
import { FaWarehouse } from "react-icons/fa";

import { NavLink } from "react-router-dom";

export default function Dashboard() {

    const dashboardMenu = [
        {
            id: 1,
            name: 'Kullanıcılar',
            svg: <FaUsers size={60} />,
            to: '/users'
        },
        {
            id: 2,
            name: 'Role Sahip Kullanıcılar',
            svg: <FaUsersCog size={60} />,
            to: '/users-with-role'
        },
        {
            id: 3,
            name: 'Ürünler',
            svg: <GoContainer size={60} />,
            to: '/products'
        },
        {
            id: 3,
            name: 'Ajanda',
            svg: <FaCalendarAlt size={60} />,
            to: '/agende'
        },
        {
            id: 4,
            name: 'Stoklar',
            svg: <FaWarehouse size={60} />,
            to: '/stocks'
        },
    ];

    return (
        <div>
            {/* Title */}
            < Title title="Dashboard" />
            {/* Title */}

            <div className="grid grid-cols-3 gap-5 mt-10 ">
                {dashboardMenu.map(menu => (
                    <NavLink to={menu.to} key={menu.id} className="bg-slate-400 rounded-lg p-4 cursor-pointer hover:bg-slate-500 hover:text-white">
                        {/*SVG*/}
                        <div className="flex justify-center items-center text-slate-800">
                            {menu.svg}
                        </div>
                        {/*SVG*/}

                        {/*MENU NAME*/}
                        <div className="text-center mt-5 text-3xl text-slate-700">
                            {menu.name}
                        </div>
                        {/*MENU NAME*/}
                    </NavLink>
                ))}
            </div>

        </div>
    )
}
