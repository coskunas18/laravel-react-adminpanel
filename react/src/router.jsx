import Dashboard from "./pages/Dashboard";
import DefaultLayout from "./components/layouts/DefaultLayout/DefaultLayout";
import Users from "./pages/Users/Users";
import UsersWithRole from "./pages/Users/UsersWithRole";
import Login from "./pages/AuthPage/Login";
import GuestLayout from "./components/layouts/GuestLayout/GuestLayout"
import SignUp from "./pages/AuthPage/SignUp";

const routes = [
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Dashboard />,
            },
            {
                path: 'users',
                element: <Users />,
            },
            {
                path: 'users/role',
                element: <UsersWithRole />,
            },
        ],
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'signup',
                element: <SignUp />
            },
        ]
    }
];

export default routes;
