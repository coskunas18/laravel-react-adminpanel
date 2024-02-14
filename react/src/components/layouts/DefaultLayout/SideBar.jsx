import { IoMdArrowBack } from "react-icons/io";
import { sideBarToggle } from "../../../redux/sideBarSlice";
import { useDispatch } from "react-redux";

import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaUserGear } from "react-icons/fa6";
import { FaWarehouse } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";



import { NavLink } from "react-router-dom";
import { useState } from "react";


export default function SideBar({ sidebar }) {

    const dispatch = useDispatch();
    const [openSubMenuIndex, setOpenSubMenuIndex] = useState(null);

    const handleSubMenuToggle = (index) => {
        setOpenSubMenuIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const navigation = [
        {
            name: 'Dashboard', to: '/', icon: <MdDashboard />
        },
        {
            name: 'Kullanicilar', to: '/users', icon: <FaUser />,
            subMenu: [
                {
                    name: 'Kullanicilar', to: '/users', icon: <FaUserGear />
                },
                {
                    name: 'Role Sahip Kullanicilar', to: '/users/role', icon: <FaUserGear />
                }
            ]
        },
        {
            name: 'Şantiyeye Bağlı İşlemler', to: '/santiye', icon: <FaWarehouse />,
            subMenu: [
                {
                    name: 'Şantiye İşlemleri', to: '/depo', icon: <FaWarehouse />
                },
                {
                    name: 'Temizlik İşlemleri', to: '/depo', icon: <FaWarehouse />
                },
                {
                    name: 'Nakliye İşlemleri', to: '/depo', icon: <FaWarehouse />
                }
            ]

        },
        {
            name: 'Ajanda', to: '/calendar', icon: <FaCalendarAlt />,
        }
    ]

    return (
        <>
            <div className={`w-50 bg-slate-600 border-r transition-all duration-200 shrink-0 fixed z-50
                 border-black h-screen text-white ${sidebar.sidebarIsOpen ? 'left-0' : "-left-[8rem]"}`}>
                <div className="mt-4 flex justify-between mx-3 gap-3 items-center">
                    <div className="flex justify-center w-full">
                        <p className="font-bold text-center">CRM-PROJECT</p>
                    </div>
                    <div onClick={() => dispatch(sideBarToggle())}>
                        <IoMdArrowBack size={30} className={`hover:text-slate-300 cursor-pointer transition-all duration-300
                        ${sidebar.sidebarIsOpen ? 'rotate-0' : "rotate-180"}
                        `} />
                    </div>
                </div>
                {sidebar.sidebarIsOpen && (
                    <div className="mt-10  text-center">
                        {navigation?.map((nav, index) => (
                            <div key={index}>

                                {!nav?.subMenu && (
                                    <NavLink to={nav.to} className={({ isActive }) =>
                                        isActive ? 'p-5 border-b border-black hover:bg-slate-200 hover:text-black cursor-pointer font-semibold block bg-slate-200 text-black'
                                            : 'p-5 border-b border-black hover:bg-slate-200 hover:text-black cursor-pointer font-semibold block '}>
                                        {nav.name}
                                    </NavLink>
                                )}

                                {nav?.subMenu && (
                                    <div>
                                        <div className={`flex justify-between items-center gap-2
                                        p-5 cursor-pointer font-semibold select-none
                                        ${openSubMenuIndex !== index ? 'border-b border-black' : ''}
                                        `}>
                                            <div className="flex justify-center w-full">
                                                <p>{nav.name}</p>
                                            </div>

                                            <div>
                                                <IoIosArrowDown
                                                    onClick={() => handleSubMenuToggle(index)}
                                                    size={20} className={`hover:text-slate-500
                                                    ${openSubMenuIndex !== index ? '' : 'rotate-180 transition-all duration-200'} `} />
                                            </div>

                                        </div>
                                        {openSubMenuIndex === index && nav?.subMenu.map((navSub, i) => (
                                            <NavLink to={navSub.to} key={i}
                                                className={` p-4 hover:bg-slate-200 text-md block
                                                 hover:text-black cursor-pointer ${i === nav.subMenu.length - 1 ? 'border-b border-black' : ''} `}>
                                                {navSub.name}
                                            </NavLink>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {!sidebar.sidebarIsOpen && (
                    <div className="mt-10">
                        {navigation?.map((nav, index) => (
                            <NavLink to={nav.to} className="p-5 border-b border-black hover:bg-slate-200 flex justify-end
                 hover:text-black cursor-pointer font-semibold" key={index}>
                                {nav.icon}
                            </NavLink>
                        ))}
                    </div>
                )}
            </div>
        </>
    )

}
