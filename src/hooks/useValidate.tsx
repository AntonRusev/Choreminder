import { useState, useEffect } from "react";

export const useValidate = (originalValues: any, keys: any) => {
    const [formErrors, setFormErrors] = useState({ ...keys });
    const [touched, setTouched] = useState({});
    const [disabled, setDisabled] = useState(true);

    // Using this to compare passwords
    const { ...formValues } = originalValues;

    useEffect(() => {
        if (Object.keys(formErrors).length > 0) {
            setDisabled(true);
        } else {
            if (formValues.rePass && (formValues.rePass !== formValues.password)) {
                setDisabled(true);
            } else {
                setDisabled(false);
            };
        };
    }, [formValues, Object.keys(formErrors).length]);

    const validateForm = (e: any) => {
        const { name, value } = e.target;

        setTouched({ ...touched, [name]: true });

        // Login and Register forms input

        if (name === 'email' && value === '') {
            setFormErrors({ ...formErrors, email: 'Email is required' });
        } else if (isEmailValid(value) === false) {
            setFormErrors({ ...formErrors, email: 'This is not a valid Email address' });
        } else if (name === 'email') {
            setFormErrors(removeError(formErrors, name));
        };


        if (name === 'password' && value === '') {
            setFormErrors({ ...formErrors, password: 'Password is required' });
        } else if (name === 'password' && (value.length < 5 || value.length > 12)) {
            setFormErrors({ ...formErrors, password: 'Password must be between 5 and 12 characters long' });
        } else if (name === 'password') {
            setFormErrors(removeError(formErrors, name));
        };

        if (name === 'rePass' && value !== formValues.password) {
            setFormErrors({ ...formErrors, rePass: 'Passwords do not match' });
        } else if (name === 'rePass') {
            setFormErrors(removeError(formErrors, name));
        };

        // Create Chore form input 

        if (name === 'name' && value === '') {
            setFormErrors({ ...formErrors, name: 'Name is required' });
        } else if (name === 'name' && (value.length < 2)) {
            setFormErrors({ ...formErrors, name: 'Name of chore must be minimum 2 characters long.' });
        } else if (name === 'name') {
            setFormErrors(removeError(formErrors, name));
        };

        if (name === 'days' && value === '') {
            setFormErrors({ ...formErrors, days: 'Days field is required' });
        } else if (name === 'days' && (value < 2 || value > 31)) {
            setFormErrors({ ...formErrors, days: 'Days must be a number between 2 and 31' });
        } else if (name === 'days') {
            setFormErrors(removeError(formErrors, name));
        };
    };

    //Email validation
    const isEmailValid = (email: string) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    //Removing Error 
    const removeError = (errObj: any, key: any) => {
        delete errObj[`${key}`];

        return errObj;
    };

    return {
        validateForm,
        formErrors,
        disabled,
    };
};