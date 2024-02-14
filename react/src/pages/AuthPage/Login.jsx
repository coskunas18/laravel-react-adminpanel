import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { useState } from 'react';
import { authLogin } from "../../components/users/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function Login() {

    const { errors } = useSelector(state => state.auth);

    let errorMessages = null;

    if (errors !== null) {
        errorMessages = Object.values(errors);
    }


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);


    const dispatch = useDispatch();

    const handleRememberChange = () => {
        setRemember(!remember);
    };


    const loginSubmit = (e) => {
        e.preventDefault();

        const credentials = {
            'email': email,
            'password': password,
            'remember': remember
        }

        try {
            dispatch(authLogin(credentials))
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <p className="text-3xl font-semibold text-center my-5">Login Form</p>
            <form onSubmit={loginSubmit} className="flex flex-col gap-3 w-64 mx-auto">

                {errorMessages && (
                    <div className="bg-red-700 p-2 text-white text-md rounded-md">
                        {errorMessages.map((err, index) => (
                            <div key={index}>
                                * {err}
                            </div>
                        ))}
                    </div>
                )}

                <div>
                    <label className="font-semibold text-2xl" htmlFor="">Email:</label>
                    <div className="relative flex items-center mt-2">
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded outline-none px-7 py-1 text-gray-600"
                        />
                        <div className="absolute top-0 left-0 mt-2 opacity-50 px-1" >
                            <FaRegUser />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="font-semibold text-2xl">Password:</label>
                    <div className="relative flex items-center mt-2">
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded outline-none px-7 py-1 text-gray-600"
                        />
                        <div className="absolute top-0 left-0 mt-2 opacity-50 px-1" >
                            <RiLockPasswordLine size={18} />
                        </div>
                    </div>
                </div>
                <div className="w-full mt-5 flex flex-col gap-2">
                    <div className="flex items-center gap-2 select-none">
                        <input type="checkbox" className=" w-4 h-4 accent-slate-300 none-outline"
                            checked={remember} onChange={handleRememberChange} />
                        <p className="m-0 mb-1 p-0 font-semibold">Remember me</p>
                    </div>

                    <div className="text-sm hover:underline">
                        <NavLink to={'/signup'}>
                            Don't you have any account?
                        </NavLink>
                    </div>
                    <button className="bg-slate-700 w-full text-white p-2 rounded-md">Sign in</button>
                </div>

            </form>
        </>
    )
}
