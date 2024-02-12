import { FaRegUserCircle } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import SideBar from "./SideBar";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import LayoutDropdown from "../../Dropdown/LayoutDropdown";


export default function DefaultLayout() {

    const [dropdown, setDropdown] = useState(false);
    const sidebar = useSelector(state => state.sidebar)

    const menuRef = useRef();

    const { authToken } = useSelector(state => state.auth);

    if (!authToken) {
        return <Navigate to="login" />
    }


    useEffect(() => {
        const closeDropdown = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setDropdown(false);
            }
        }

        window.addEventListener("click", closeDropdown)

        return () => document.body.removeEventListener('click', closeDropdown)
    }, [dropdown]);

    return (
        <div>
            <header>
                <nav>
                    <div className="flex">
                        <SideBar sidebar={sidebar} />
                        {/* Navbar */}
                        <div className="bg-slate-500 w-full h-20 border-b items-center border-black relative text-gray-800">
                            <p className="text-5xl font-bold mt-3 text-center ">LOGO</p>
                            <div className="absolute right-0 top-0 my-5 mx-4 flex gap-3 select-none">
                                <p className="p-0 m-0 font-semibold mt-1">Coşkun Demirel</p>

                                <div className="relative" ref={menuRef}>
                                    <FaRegUserCircle
                                        onClick={() => setDropdown(!dropdown)}
                                        size={30} className="hover:text-white cursor-pointer " />
                                </div>
                                {dropdown && (
                                    <LayoutDropdown />
                                )}
                            </div>
                        </div>
                        {/* Navbar */}
                    </div>
                </nav>
            </header>
            <div className="px-20 bg-slate-700 h-screen overflow-auto">
                <Outlet />
            </div>
        </div>
    )
}
