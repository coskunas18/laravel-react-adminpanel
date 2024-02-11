import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";

export default function Login() {
    return (
        <div className="h-screen bg-slate-300 flex items-center">
            <div className="bg-slate-400 py-20 w-96 mx-auto rounded min-w-screen-xl">
                <div className="text-center font-bold text-4xl mb-5">
                    TAC - SERVICES
                </div>

                <form className="flex flex-col gap-3 w-64 mx-auto">
                    <div>
                        <label className="font-semibold text-2xl" htmlFor="">Email:</label>
                        <div className="relative flex items-center mt-2">
                            <input type="text"
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
                            <input type="password"
                                className="w-full rounded outline-none px-7 py-1 text-gray-600"
                            />
                            <div className="absolute top-0 left-0 mt-2 opacity-50 px-1" >
                                <RiLockPasswordLine size={18} />
                            </div>
                        </div>
                    </div>

                    <div className="w-full mt-5 flex flex-col gap-3">
                        <div className="flex items-center gap-2 select-none">
                            <input type="checkbox" className=" w-4 h-4 accent-slate-300 none-outline" />
                            <p className="m-0 mb-1 p-0 font-semibold">Remember me</p>
                        </div>
                        <button className="bg-slate-700 w-full text-white p-2 rounded-md">Sign in</button>
                    </div>

                </form>

            </div>
        </div>
    )
}
