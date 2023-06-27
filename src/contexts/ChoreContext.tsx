import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from '../contexts/AuthContext';
import * as choreService from '../services/choreService';

export const ChoreContext = createContext({} as any);

export const ChoreProvider = ({
    children,
}: any) => {
    const [chores, setChores] = useState([{}]);
    const [formValues, setFormValues] = useState({} as any);

    const { auth } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (auth._id) {
            choreService.getAll(auth._id)
                .then(result => setChores(result))
                .catch(error => console.log(error));
        };
    }, [auth]);


    // On filling the input fields - name, days, img

    function formValueChangeHandler(e: any) {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    // On sending FORM input data

    const onChoreCreate = async (e: any) => {
        e.preventDefault();

        const startDate: string = new Date().toString();
        const isActive: boolean = true;

        const data: {} = { ...formValues, startDate, isActive };

        const newChore = await choreService.create(data)

        setChores([...chores, newChore]);
        setFormValues({});

        navigate('/');
    };

    const choreContextValue: {} = {
        formValueChangeHandler,
        onChoreCreate,
        chores
    };

    return (
        <>
            <ChoreContext.Provider value={choreContextValue}>
                {children}
            </ChoreContext.Provider>
        </>
    );
};
