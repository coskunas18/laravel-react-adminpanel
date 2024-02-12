import { IoMdExit } from "react-icons/io";
import { FaUser } from "react-icons/fa";





export default function LayoutDropdown() {
    return (
        <>
            <div className="bg-gray-400 text-white px-5 py-4 absolute top-0 right-0 mt-10 rounded z-50">
                <ul className="flex flex-col gap-3">
                    <li className="flex gap-2 items-center cursor-pointer hover:text-slate-500">
                        <FaUser />
                        <p className="m-0 p-0 underline">Profile</p>
                    </li>
                    <li className="flex gap-2 items-center cursor-pointer hover:text-slate-500">
                        <IoMdExit />
                        <p className="m-0 p-0 underline">Logout</p>
                    </li>
                </ul>
            </div>
        </>
    )
}
