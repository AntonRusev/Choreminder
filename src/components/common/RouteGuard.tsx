import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

export const GuestRouteGuard = () => {
    const { auth } = useContext(AuthContext);

    if (!auth._id) {
        return <Navigate to='/login' />;
    };

    return (
        <Outlet />
    );
};

export const UserRouteGuard = () => {
    const { auth } = useContext(AuthContext);

    if (auth._id) {
        return <Navigate to='/' replace />;
    };

    return (
        <Outlet />
    );
};