import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import * as authService from '../services/authService';
import { AlertContext } from "./AlertContext";

export const AuthContext = createContext({} as any);

export const AuthProvider = ({
    children,
}: any) => {
    const [auth, setAuth] = useState({} as any);

    const { onActivateAlert } = useContext(AlertContext);

    const navigate = useNavigate();

    // Checking if there is logged in User

    useEffect(() => {
        if (auth.accessToken) {
            localStorage.setItem('userData', JSON.stringify(auth));

        } else {
            const userData = JSON.parse(localStorage.getItem('userData') as string);

            if (userData) {
                setAuth(userData);
            };
        };
    }, [auth, auth.accessToken]);

    // On clicking Login or Register

    const onAuthSubmit = async (e: any, formValues: any) => {
        e.preventDefault();

        let result: {} = {};

        const { rePass, ...values } = formValues;

        const inputFields: number = Object.keys(formValues).length;

        try {
            if (inputFields > 2) {
                result = await authService.register(values);
            } else {
                result = await authService.login(values);
            };

            setAuth(result);

            navigate('/');
        } catch (err: any) {
            // Toggling alert window
            onActivateAlert([err.message]);

            throw new Error(err);
        };
    };

    // On clicking Logout

    const onLogout = async () => {
        await authService.logout();

        if (auth) {
            localStorage.removeItem('userData');
        };

        setAuth({});
    };

    const authContextValue: {} = {
        onAuthSubmit,
        onLogout,
        auth
    };

    return (
        <>
            <AuthContext.Provider value={authContextValue}>
                {children}
            </AuthContext.Provider>
        </>
    );
};