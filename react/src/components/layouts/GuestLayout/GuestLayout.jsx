
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

export default function GuestLayout() {

    const { authToken } = useSelector(state => state.auth);

    if (authToken) {
        return <Navigate to="/" />
    }

    return (
        <div className="h-screen bg-slate-300 flex items-center">
            <div className="bg-slate-400 py-20 w-96 mx-auto rounded min-w-screen-xl">
                <div className="text-center font-bold text-4xl mb-5">
                    TAC - SERVICES
                </div>
                <Outlet />
            </div>
        </div>
    )
}
