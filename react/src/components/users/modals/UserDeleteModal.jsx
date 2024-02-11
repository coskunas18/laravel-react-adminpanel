import { useDispatch } from "react-redux"
import UserModalTitle from "./UserModalTitle"
import { deleteUser } from "../UserSlice";

export default function UserDeleteModal({ user, closeModal }) {

    const dispatch = useDispatch();


    const deleteHandle = () => {
        dispatch(deleteUser({ id: user.id }));
        closeModal();
    }

    return (
        <>
            {user?.id && (
                <>
                    <UserModalTitle title="User Delete" />
                    <div>
                        <p className="text-2xl text-slate-800 font-semibold">Are you sure you want to delete this user?</p>
                        <div className="flex items-center gap-2">
                            <p className="text-xl font-semibold">User:</p>
                            <p className="text-lg">{user.name}</p>
                        </div>
                    </div>
                    <div className="w-full flex justify-between items-center text-white mt-3">

                        <button className="bg-red-500 px-4 py-2 rounded-md" onClick={closeModal}>
                            Cancel
                        </button>
                        <button onClick={deleteHandle} className="bg-green-600 px-4 py-2 rounded-md">
                            Yes
                        </button>
                    </div>
                </>
            )}

        </>
    )
}
