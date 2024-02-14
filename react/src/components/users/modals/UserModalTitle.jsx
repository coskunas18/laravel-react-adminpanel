import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getUserError } from "../UserSlice";
import UserModalErrors from "./UserModalErrors";

export default function UserModalTitle({ title, userPreview = null }) {

    const errors = useSelector(getUserError);

    return (
        <>
            <div className="text-4xl text-slate-700 border-b-2 text-center border-slate-700
        flex items-center gap-2 font-semibold">
                <p>{title}</p>
                {userPreview && (
                    <img src={userPreview} className="w-14 h-14 rounded-full shadow-md" alt="" />
                )}
                {!userPreview && (
                    <FaUser size={30} />
                )}
            </div>

            {errors !== null && (
                <UserModalErrors />
            )}
        </>


    )
}
