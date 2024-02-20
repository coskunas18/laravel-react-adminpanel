import { FaRegUserCircle } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import LayoutDropdown from "../../Dropdown/LayoutDropdown";
import { authCurrentUser } from "../../users/AuthSlice";
import LoadingScreen from "../../loading/LoadingScreen";
import { useMediaQuery } from '@react-hook/media-query'
import { IoMenuOutline } from "react-icons/io5";

import MobileMenu from "./MobileMenu";


export default function DefaultLayout() {

    const isMobile = useMediaQuery('(max-width:800px)');


    const [dropdown, setDropdown] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const sidebar = useSelector(state => state.sidebar);

    const dispatch = useDispatch()

    const menuRef = useRef();

    const { authToken, currentUser, loading } = useSelector(state => state.auth);


    useEffect(() => {
        dispatch(authCurrentUser());
    }, [dispatch, authToken]);



    const closeDropdown = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setDropdown(false);
        }
    }

    useEffect(() => {
        window.addEventListener("click", closeDropdown)

        return () => document.body.removeEventListener('click', closeDropdown)
    }, [dropdown]);


    if (!authToken) {
        return <Navigate to="login" />
    }

    return (
        <>
            {loading && (
                <LoadingScreen />
            )}
            {!loading && (
                <div>
                    <header>
                        <nav>
                            <div className="flex">

                                {!isMobile && <SideBar sidebar={sidebar} />}

                                {/* Navbar */}
                                <div className="bg-slate-500 w-full h-20  border-b border-black relative text-gray-800">
                                    <p className="text-5xl font-bold mt-3 md:text-center text-left ">LOGO</p>
                                    <div className="absolute right-0 top-0 my-5 mx-4 flex gap-3 select-none">
                                        {!isMobile && (
                                            <>
                                                <p className="p-0 m-0 font-semibold mt-1">{currentUser?.name}</p>
                                                <div className="relative" ref={menuRef}>
                                                    <FaRegUserCircle
                                                        onClick={() => setDropdown(!dropdown)}
                                                        size={30} className="hover:text-white cursor-pointer " />
                                                </div>
                                                {dropdown && (
                                                    <LayoutDropdown />
                                                )}
                                            </>
                                        )}

                                        {isMobile && (
                                            <div className="flex justify-end items-center cursor-pointer" onClick={() => setMobileMenu(!mobileMenu)}>
                                                <IoMenuOutline size={25} />
                                            </div>
                                        )}

                                        {/* MOBILE MENU */}
                                        {mobileMenu && (
                                            <MobileMenu setMobileMenu={setMobileMenu} currentUser={currentUser} />
                                        )}
                                        {/* MOBILE MENU */}
                                    </div>
                                </div>
                                {/* Navbar */}
                            </div>
                        </nav>
                    </header>

                    <div className="lg:px-20 bg-slate-700 h-screen overflow-auto">
                        <Outlet />
                    </div>
                </div>
            )}

        </>

    )
}
