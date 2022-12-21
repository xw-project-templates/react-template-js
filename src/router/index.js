import React from "react";
import { Navigate } from "react-router-dom"

const Home = React.lazy(() => import("pages/Home"))
const Mine = React.lazy(() => import("pages/Mine"))
const Login = React.lazy(() => import("pages/Login"))

const routes = [
    {
        path: "/",
        element: <Navigate to="/home" />
    },
    {
        path: "/home",
        element: <Home />
    },
    {
        path: "/mine",
        element: <Mine />
    },
    {
        path: "/login",
        element: <Login />
    }
]

export default routes