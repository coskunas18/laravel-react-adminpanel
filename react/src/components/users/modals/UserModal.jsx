
import { useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { selectUserById, onChangeError } from "../UserSlice";
import UserShowModal from "./UserShowModal";
import UserEditModal from "./UserEditModal";
import UserCallModal from "./UserCallModal";
import UserDeleteModal from "./UserDeleteModal";
import UserCreateModal from "./UserCreateModal";

export default function UserModal({ modalClose, userId, modalOptions }) {


    let modalRef = useRef();

    const user = useSelector(state => selectUserById(state, userId));
    const dispatch = useDispatch();


    function checkClickOutside(e) {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            modalClose();
            dispatch(onChangeError(null))
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', checkClickOutside)
    }, [])

    return (
        <>

            <div className={`fixed top-0 left-0 flex justify-center items-center z-50 w-full h-full
            bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm`}>
                <div ref={modalRef}
                    className={`bg-slate-200/70 p-6 rounded-md relative flex flex-col gap-2 shadow-xl`}>
                    <div>
                        <IoMdClose className="absolute top-2 right-2 text-red-600 cursor-pointer rounded-full
                         hover:bg-black/10" size={24} onClick={modalClose} />
                    </div>

                    {modalOptions.option === "show" && userId && (
                        <UserShowModal user={user} />
                    )}

                    {modalOptions.option === "create" && (
                        <UserCreateModal closeModal={modalClose} />

                    )}

                    {modalOptions.option === "edit" && userId && (
                        <UserEditModal user={user} closeModal={modalClose} />
                    )}

                    {modalOptions.option === "call" && userId && (
                        <UserCallModal user={user} closeModal={modalClose} />
                    )}

                    {modalOptions.option === "delete" && userId && (
                        <UserDeleteModal user={user} closeModal={modalClose} />
                    )}
                </div>
            </div >
        </>

    )
}
