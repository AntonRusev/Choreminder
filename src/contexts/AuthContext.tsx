import { createContext, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import * as authService from '../services/authService';

export const AuthContext = createContext({} as any);

export const AuthProvider = ({
    children,
}: any) => {
    const [auth, setAuth] = useState({} as any);
    const [authFormValues, setAuthFormValues] = useState({} as any);

    const navigate = useNavigate();

    useEffect(() => {
        if(auth.accessToken) {
            localStorage.setItem('userData', JSON.stringify(auth));
            
        } else {
            const userData = JSON.parse(localStorage.getItem('userData') as string);

            if(userData) {
                setAuth(userData);
            };
        };
    },[auth, auth.accessToken]);

    function authFormValueChangeHandler(e: any) {
        setAuthFormValues({ ...authFormValues, [e.target.name]: e.target.value });
    };

    const onAuthSubmit = async (e: any) => {
        e.preventDefault();

        let result: {} = {};

        const { rePass, ...values } = authFormValues;

        const inputFields: number = Object.keys(authFormValues).length;

        try {
            if (inputFields > 2) {
                result = await authService.register(values);
            } else {
                result = await authService.login(values);
            };

            setAuth(result);

            navigate('/');
        } catch (err: any) {
            throw new Error(err);
        };
    };

    const onLogout = async () => {
        await authService.logout();

        if (auth) {
            localStorage.removeItem('userData');
        };

        setAuth({});
    };

    const authContextValue: {} = {
        authFormValueChangeHandler,
        onAuthSubmit,
        onLogout
    };

    return (
        <>
            <AuthContext.Provider value={authContextValue}>
                {children}
            </AuthContext.Provider>
        </>
    );
};