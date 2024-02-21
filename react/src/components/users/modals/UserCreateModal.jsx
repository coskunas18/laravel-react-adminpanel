import { useEffect, useRef, useState } from "react";
import UserModalTitle from "./UserModalTitle";
import { useDispatch, useSelector } from "react-redux";
import { addNewUser, getUserStatus } from "../UserSlice";
import { MdFileUpload } from "react-icons/md";
import { toastChange } from "../../Toast/ToastSlice";


export default function UserCreateModal({ closeModal }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [status, setStatus] = useState('active');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');

    const dispatch = useDispatch();
    const userStatus = useSelector(getUserStatus);
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleUploadTriggerClick = () => {
        fileInputRef.current.click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        // Dosya türünü kontrol etmek için desteklenen uzantılar
        const allowedExtensions = ["jpg", "jpeg", "png"];
        // split ile . dan sonrakileri böldük ve pop ile çıkarttık.to lower case ile hepsini küçülttük.
        const fileExtension = file?.name.split('.').pop().toLowerCase();

        if (fileExtension) {
            if (!allowedExtensions.includes(fileExtension)) {
                setErrorMessage('Dosya türü desteklenmiyor.');
                return;
            } else {
                setSelectedFile(file);
                setErrorMessage('');
            }

            if (file) {
                const fileReader = new FileReader();
                fileReader.onload = () => {
                    setPreviewUrl(fileReader.result) //base 64 kodu
                };
                fileReader.readAsDataURL(file);
            }
        }
    }

    const onClickCreateUser = () => {
        try {
            dispatch(addNewUser({
                name,
                email: email,
                telephone: telephone,
                status: status,
                image: previewUrl,
                password: password,
                password_confirmation: password_confirmation
            })).then((action) => {
                if (addNewUser.fulfilled.match(action)) {
                    if (action.payload?.data) {
                        dispatch(toastChange({
                            type: 'success',
                            title: 'Crate user is successful',
                            status: true,
                        }))
                    }
                }
            })
        } catch (error) {
            console.log(error.message)
        }

    }

    useEffect(() => {
        if (userStatus === 'idle') {
            closeModal();
            setName('');
            setEmail('')
            setTelephone('')
        }
    }, [userStatus]);


    return (
        <>
            <UserModalTitle title="Create User" />
            <form encType="multipart/form-data" onSubmit={(e) => {
                onClickCreateUser();
                e.preventDefault();
            }} className="flex flex-col flex-wrap justify-start gap-3 px-6 py-2">

                <div className="flex flex-col flex-wrap gap-2 ">
                    <p className="text-2xl font-semibold">Profile Photo:</p>
                    <div className="flex font-semibold text-slate-700 cursor-pointer items-center gap-3" onClick={handleUploadTriggerClick}>
                        <MdFileUpload size={25} /> Upload Photo :
                        {selectedFile && !errorMessage && (
                            <img src={previewUrl} alt="" className="w-20 h-20 rounded-full" />
                        )}
                    </div>
                    {errorMessage && (
                        <p className="text-red-600 font-semibold text-xl">Hatalı format seçimi!</p>
                    )}

                    <input ref={fileInputRef}
                        type="file" className="text-xl px-2 py-1 rounded-md hidden
                        focus:ring-0 focus:border-slate-500  bg-slate-400/25" name="image" onChange={handleFileChange}
                    />
                </div>
                <div className="grid md:grid-cols-2 gap-2 ">
                    <div>
                        <p className="text-2xl font-semibold">Name - Surname:</p>
                        <input
                            type="text" className="text-xl px-2 py-1 rounded-md
                        focus:ring-0 focus:border-slate-500  bg-slate-400/25"
                            name="name" value={name} onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <p className="text-2xl font-semibold">E-mail:</p>
                        <input type="text" className="text-xl px-2 py-1 rounded-md outline-none focus:ring-0 focus:border-slate-500  bg-slate-400/25"
                            name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
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
                            <input type="radio"
                                className="h-5 w-5 focus:ring-0 checked:hover:bg-slate-600 outline-none rounded-full bg-slate-400 checked:bg-slate-600
                                hover:bg-slate-500 "
                                name="status" value='active' onChange={(e) => setStatus(e.target.value)} />
                        </div>

                        <div className="flex gap-1 items-center">
                            <label className="text-xl font-semibold" htmlFor="">Passive</label>
                            <input type="radio"
                                className="h-5 w-5 focus:ring-0 checked:hover:bg-slate-600 outline-none rounded-full bg-slate-400 checked:bg-slate-600
                                hover:bg-slate-500 "
                                name="status" value='passive' onChange={(e) => setStatus(e.target.value)} />
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-2">
                    <div>
                        <p className="text-2xl font-semibold">Password:</p>
                        <input type="password"
                            className="text-xl px-2 py-1 rounded-md outline-none focus:ring-0 focus:border-slate-500  bg-slate-400/25"
                            name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div>
                        <p className="text-2xl font-semibold">Password Confirmation:</p>
                        <input type="password"
                            className="text-xl px-2 py-1 rounded-md outline-none focus:ring-0 focus:border-slate-500  bg-slate-400/25"
                            name="password_confirmation" value={password_confirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
                    </div>

                </div>
                <button type="submit" className="bg-slate-500 text-white p-3 rounded-md mt-2 hover:bg-slate-600" >
                    Create
                </button>
            </form>
        </>
    )
}
