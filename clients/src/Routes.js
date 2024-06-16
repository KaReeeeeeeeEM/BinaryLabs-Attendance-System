import Error404  from "./components/Error404";
import SignUp  from "./components/SignUp";
import SignIn  from "./components/SignIn";
import Loading from "./components/Loading";
import Dashboard from "./components/Dashboard";

const Router = [
    { path: '*', element: <Error404 /> },
    { path: '/', element: <SignUp /> },
    { path: '/login', element: <SignIn /> },
    { path: '/dashboard/:id', element: <Dashboard /> },
    { path: '/loading', element: <Loading /> },
]

export default Router;