
import { useState } from "react";
import { RiLockPasswordLine } from "react-icons/ri";
import { RiEyeFill } from "react-icons/ri";
import { RiEyeOffFill } from "react-icons/ri";

export default function SignUp() {

    const [showPassword, setShowPassword] = useState(false);

    const showPasswordHandle = () => {
        setShowPassword(!showPassword)
    }


    return (
        <div>
            <p className="text-3xl font-semibold text-center my-5">Signup Form</p>
            <form className="flex flex-col gap-3 w-64 mx-auto">
                <label className="font-semibold text-lg" htmlFor="">Name</label>
                <div className="relative flex items-center mt-2">
                    <input type="text"
                        className="w-full rounded outline-none py-1 text-gray-600"
                    />
                </div>

                <div>
                    <label className="font-semibold text-lg" htmlFor="">Email:</label>
                    <div className="relative flex items-center mt-2">
                        <input type="text"
                            className="w-full rounded outline-none py-1 text-gray-600"
                        />
                    </div>
                </div>

                <div>
                    <label className="font-semibold text-lg">Password:</label>
                    <div className="relative flex items-center mt-2">
                        <input type={showPassword ? "text" : "password"}
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
                        <input type={showPassword ? "text" : "password"}
                            className="w-full rounded outline-none px-7 py-1 text-gray-600"
                        />
                        <div className="absolute top-0 left-0 mt-2 opacity-50 px-1" >
                            <RiLockPasswordLine size={18} />
                        </div>
                    </div>
                </div>

                <div className="w-full mt-5 flex flex-col gap-3">
                    <button className="bg-slate-700 w-full text-white p-2 rounded-md">Sign up</button>
                </div>

            </form>
        </div>
    )
}
