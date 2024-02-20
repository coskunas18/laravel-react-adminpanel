import { IoMdClose } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { authLogout } from "../../users/AuthSlice";
export default function MobileMenu({ setMobileMenu, currentUser }) {

    const [openSubMenuIndex, setOpenSubMenuIndex] = useState(null);
    const handleSubMenuToggle = (index) => {
        setOpenSubMenuIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const dispatch = useDispatch();

    const logoutHandle = () => dispatch(authLogout());

    const navigation = [
        {
            name: 'Dashboard', to: '/',
        },
        {
            name: 'Kullanicilar', to: '/users',
            subMenu: [
                {
                    name: 'Kullanicilar', to: '/users',
                },
                {
                    name: 'Role Sahip Kullanicilar', to: '/users/role',
                }
            ]
        },
        {
            name: 'Şantiyeye Bağlı İşlemler', to: '/santiye',
            subMenu: [
                {
                    name: 'Şantiye İşlemleri', to: '/depo',
                },
                {
                    name: 'Temizlik İşlemleri', to: '/depo',
                },
                {
                    name: 'Nakliye İşlemleri', to: '/depo',
                }
            ]

        },
        {
            name: 'Ajanda', to: '/calendar',
        }
    ]


    return (
        <>

            <div className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-80 text-white">
                <p className="flex justify-end items-center px-3 py-2 text-2xl text-red-700" onClick={() => setMobileMenu(false)}>
                    <IoMdClose size={25} />
                </p>

                <div className="flex flex-col px-2">
                    <div>
                        {currentUser.name}
                    </div>
                    <div>
                        {currentUser.email}
                    </div>
                    <div>
                        {currentUser.telephone}
                    </div>

                </div>

                <div className="mt-10  text-center">
                    {navigation?.map((nav, index) => (
                        <div key={index}>

                            {!nav?.subMenu && (
                                <NavLink to={nav.to} className={({ isActive }) =>
                                    isActive ? 'p-5 border-b border-slate-300 hover:bg-slate-200 hover:text-slate-300 cursor-pointer font-semibold block bg-slate-200 text-black'
                                        : 'p-5 border-b border-slate-300 hover:bg-slate-200 hover:text-slate-300 cursor-pointer font-semibold block '}>
                                    {nav.name}
                                </NavLink>
                            )}

                            {nav?.subMenu && (
                                <div>
                                    <div className={`flex justify-between items-center gap-2
                                        p-5 cursor-pointer font-semibold select-none
                                        ${openSubMenuIndex !== index ? 'border-b border-slate-300' : ''}
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
                    <div className="flex justify-end items-center">
                        <button className="border border-red-600 rounded-md p-4 mx-2 my-1" onClick={() => logoutHandle()}>
                            Logout
                        </button>
                    </div>
                </div>


            </div>
        </>
    )
}
