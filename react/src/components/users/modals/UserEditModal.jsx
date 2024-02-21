import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, getUserStatus, } from '../UserSlice';
import { toastChange } from '../../Toast/ToastSlice';
import { CiEdit } from "react-icons/ci";
import UserModalTitle from './UserModalTitle';

export default function UserEditModal({ user, closeModal }) {


    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [telephone, setTelephone] = useState(user?.telephone || '');
    const [userStatus, setUserStatus] = useState(user?.status || '');
    const [errorMessage, setErrorMessage] = useState('');
    const [userImage, setUserImage] = useState(null)
    const [previewImage, setPreviewUrl] = useState(user?.image || '');
    const status = useSelector(getUserStatus)
    const fileInputRef = useRef(null)
    const dispatch = useDispatch()






    const onUpdateUserClicked = (id) => {
        let data = {
            id: id,
            name: name,
            email: email,
            status: userStatus,
            telephone: telephone,
        }
        if (userImage) {
            data.image = userImage;
        }
        dispatch(updateUser(data)).then((resultAction) => {
            if (updateUser.fulfilled.match(resultAction)) {
                if (resultAction.payload.data?.id) {
                    dispatch(toastChange({
                        type: 'success',
                        title: 'Update user is successful',
                        status: true
                    }))
                }
            }
        });
    }


    const fileInputTrigger = () => {
        fileInputRef.current.click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        const allowedExtension = ['jpg', 'jpeg', 'png'];

        const fileExtension = file?.name.split('.').pop().toLowerCase();

        if (fileExtension) {
            if (!allowedExtension.includes(fileExtension)) {
                setErrorMessage('Dosya türü desteklenmiyor.');
                return;
            } else {
                setErrorMessage('');
            }

            if (file) {
                const fileReader = new FileReader();
                fileReader.onload = () => {
                    setPreviewUrl(fileReader.result)
                    setUserImage(fileReader.result)
                    e.target.value = "";
                }
                fileReader.readAsDataURL(file);
            }
        }

    }


    useEffect(() => {
        if (status === 'idle') {
            closeModal();
            setName('');
            setEmail('')
            setTelephone('')
        }
    }, [status]);



    return (
        <>
            <div className='relative'>
                <div className='absolute top-0 -right-6 hover:opacity-65 cursor-pointer'>
                    <CiEdit className="font-semibold" size={25} onClick={fileInputTrigger} />
                </div>
                <UserModalTitle title="Edit Modal" className="p-3" userPreview={previewImage} />
            </div>

            {errorMessage && (
                <p className="text-red-600 font-semibold text-xl">Hatalı format seçimi!</p>
            )}

            <form onSubmit={(e) => {
                onUpdateUserClicked(user.id)
                e.preventDefault();
            }} className="flex flex-col justify-start gap-3">
                <div className="flex flex-col gap-2 ">
                    <p className="text-2xl font-semibold">Name - Surname:</p>
                    <input
                        type="text" className="text-xl px-2 py-1 rounded-md outline-none focus:ring-0 focus:border-slate-500  bg-slate-400/25"
                        name="name" value={name} onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <input ref={fileInputRef} type="file" hidden name="image" onChange={handleFileChange} />

                <div className="flex flex-col gap-2 ">
                    <p className="text-2xl font-semibold">E-mail:</p>
                    <input type="text" className="text-xl px-2 py-1 rounded-md outline-none focus:ring-0 focus:border-slate-500  bg-slate-400/25"
                        name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="flex flex-col gap-2">
                    <p className="text-2xl font-semibold">Telephone:</p>
                    <input type="text"
                        className="text-xl px-2 py-1 rounded-md outline-none focus:ring-0 focus:border-slate-500  bg-slate-400/25"
                        name="telephone" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
                </div>

                <div className="flex flex-col gap-2">
                    <p className="text-2xl font-semibold">User Status:</p>
                    <div className="flex items-center gap-4">
                        <div className="flex gap-1 items-center">
                            <label className="text-xl font-semibold" htmlFor="">Active</label>
                            <input type="radio" checked={userStatus === "active"}
                                className="h-5 w-5 focus:ring-0 checked:hover:bg-slate-600 outline-none rounded-full bg-slate-400 checked:bg-slate-600
                                hover:bg-slate-500 "
                                name="status" value='active' onChange={(e) => setUserStatus(e.target.value)} />
                        </div>

                        <div className="flex gap-1 items-center">
                            <label className="text-xl font-semibold" htmlFor="">Passive</label>
                            <input type="radio" checked={userStatus === "passive"}
                                className="h-5 w-5 focus:ring-0 checked:hover:bg-slate-600 outline-none rounded-full bg-slate-400 checked:bg-slate-600
                                hover:bg-slate-500 "
                                name="status" value='passive' onChange={(e) => setUserStatus(e.target.value)} />
                        </div>
                    </div>
                </div>


                <button type="submit" className="bg-slate-500 text-white p-3 rounded-md mt-2 hover:bg-slate-600" >
                    Update
                </button>
            </form>
        </>
    )
}
