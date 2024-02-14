
import { useState } from "react";
import { RiLockPasswordLine } from "react-icons/ri";
import { RiEyeFill } from "react-icons/ri";
import { RiEyeOffFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { authSignUp } from "../../components/users/AuthSlice";



export default function SignUp() {

    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);

    const showPasswordHandle = () => {
        setShowPassword(!showPassword)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

    };
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })


    const registerHandle = (e) => {
        e.preventDefault();
        try {
            dispatch(authSignUp(formData))
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <p className="text-3xl font-semibold text-center my-5">Signup Form</p>
            <form onSubmit={registerHandle} className="flex flex-col gap-3 w-64 mx-auto">
                <label className="font-semibold text-lg" htmlFor="">Name</label>
                <div className="relative flex items-center mt-2">
                    <input type="text" name="name" onChange={handleInputChange}
                        className="w-full rounded outline-none py-1 text-gray-600"
                    />
                </div>

                <div>
                    <label className="font-semibold text-lg" htmlFor="">Email:</label>
                    <div className="relative flex items-center mt-2">
                        <input type="text" name="email" onChange={handleInputChange}
                            className="w-full rounded outline-none py-1 text-gray-600"
                        />
                    </div>
                </div>

                <div>
                    <label className="font-semibold text-lg">Password:</label>
                    <div className="relative flex items-center mt-2">
                        <input type={showPassword ? "text" : "password"} name="password" onChange={handleInputChange}
                            className="w-full rounded outline-none px-7 py-1 text-gray-600"
                        />
                        <div className="absolute top-0 left-0 mt-2 opacity-50 px-1" >
                            <RiLockPasswordLine size={18} />
                        </div>
                        {showPassword && (
                            <div className="absolute top-0 right-0 mt-2 opacity-50 px-1 cursor-pointer" onClick={() => showPasswordHandle()} >
                                <RiEyeFill size={18} />
                            </div>
                        )}

                        {!showPassword && (
                            <div className="absolute top-0 right-0 mt-2 opacity-50 px-1 cursor-pointer" onClick={() => showPasswordHandle()} >
                                <RiEyeOffFill size={18} />

                            </div>
                        )}

                    </div>
                </div>

                <div>
                    <label className="font-semibold text-lg text-nowrap select-none">Password Confirmation:</label>
                    <div className="relative flex items-center mt-2 ">
                        <input type={showPassword ? "text" : "password"} name="password_confirmation" onChange={handleInputChange}
                            className="w-full rounded outline-none px-7 py-1 text-gray-600"
                        />
                        <div className="absolute top-0 left-0 mt-2 opacity-50 px-1" >
                            <RiLockPasswordLine size={18} />
                        </div>
                    </div>
                </div>

                <div className="text-sm hover:underline">
                    <NavLink to={'/login'}>
                        Do you already have an account?
                    </NavLink>
                </div>
                <div className="w-full mt-3 flex flex-col gap-3">
                    <button className="bg-slate-700 w-full text-white p-2 rounded-md">Sign up</button>
                </div>

            </form>
        </div>
    )
}
