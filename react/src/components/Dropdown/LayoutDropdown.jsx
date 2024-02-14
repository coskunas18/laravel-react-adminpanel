import { IoMdExit } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { authLogout } from "../users/AuthSlice";
import { useDispatch } from "react-redux";




export default function LayoutDropdown() {

    const dispatch = useDispatch();

    const logOutHandle = () => {
        dispatch(authLogout());
    }


    return (
        <>
            <div className="bg-gray-400 text-white px-5 py-4 absolute top-0 right-0 mt-10 rounded z-50">
                <ul className="flex flex-col gap-3">
                    <li className="flex gap-2 items-center cursor-pointer hover:text-slate-500">
                        <FaUser />
                        <p className="m-0 p-0 underline">Profile</p>
                    </li>
                    <li className="flex gap-2 items-center cursor-pointer hover:text-slate-500" onClick={() => logOutHandle()}>
                        <IoMdExit />
                        <p className="m-0 p-0 underline">Logout</p>
                    </li>
                </ul>
            </div>
        </>
    )
}
