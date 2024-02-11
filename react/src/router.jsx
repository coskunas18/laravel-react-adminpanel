import Dashboard from "./pages/Dashboard";
import DefaultLayout from "./components/layouts/DefaultLayout/DefaultLayout";
import Users from "./pages/Users/Users";
import UsersWithRole from "./pages/Users/UsersWithRole";
import Login from "./pages/AuthPage/Login";
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
        path: '/login',
        element: <Login />
    },
];

export default routes;
