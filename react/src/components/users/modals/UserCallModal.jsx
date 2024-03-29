import UserModalTitle from "./UserModalTitle";


export default function UserCallModal({ user, closeModal }) {
    return (
        <>
            <UserModalTitle title="User call" />
            <div>
                <p className="text-2xl text-slate-800 font-semibold">Are you sure you want to call the user?</p>
                <div className="flex items-center gap-2">
                    <p className="text-lg font-semibold">User:</p>
                    <p>{user.name}</p>
                </div>

                <div className="flex items-center gap-2">
                    <p className="text-lg font-semibold">Phone:</p>
                    <p>{user.telephone}</p>
                </div>
            </div>
            <div className="w-full flex justify-between items-center text-white mt-3">

                <button className="bg-red-500 px-4 py-2 rounded-md" onClick={closeModal}>
                    Cancel
                </button>
                <button className="bg-green-600 px-4 py-2 rounded-md">
                    Yes
                </button>
            </div>
        </>
    )
}
