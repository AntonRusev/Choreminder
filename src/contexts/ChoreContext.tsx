import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from '../contexts/AuthContext';

import * as choreService from '../services/choreService';
import { dateGenerator } from "../utils/dateGenerator";

export const ChoreContext = createContext({} as any);

export const ChoreProvider = ({
    children,
}: any) => {
    const [chores, setChores] = useState([{}]);
    const [displayedChores, setDisplayedChores] = useState([{}]);

    const { auth } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (auth._id) {
            choreService.getAll(auth._id)
                .then(result => setChores(result))
                .catch(error => console.log(error));
        };
    }, [auth]);

    // Displaying chores

    const displayChores = (chores: any, page = { currentPage: 0, resultsShown: 5, maxPages: 0 }) => {
        const toShow = [];


        let start = page.currentPage * page.resultsShown;
        let end = start + page.resultsShown;

        if (end > chores.length) {
            end = chores.length;
        };

        for (let i = start; i < end; i++) {
            toShow.push(chores[i]);
        };

        setDisplayedChores(toShow);
    };

    // On sending FORM input data

    const onChoreCreate = async (e: any, formValues: any) => {
        e.preventDefault();

        // Generate start and end date;
        const { startDate, endDate } = dateGenerator(formValues.days);

        const isActive: boolean = true;

        const data: {} = { ...formValues, startDate, endDate, isActive};

        const newChore = await choreService.create(data);

        setChores([newChore, ...chores]);

        navigate('/');
    };

    // Editing a Chore(Reseting the timer or turning it inactive)

    const onEdit = async (choreId: string, data: any) => {
        const startDate: string = new Date().toString();

        const result = await choreService.edit(choreId, { ...data, startDate });

        setChores(state => state.map((x: any) => x._id === data._id ? result : x));

        navigate('/');
    };

    // Deleting a Chore

    const onDelete = async (choreId: string) => {
        await choreService.remove(choreId);

        setChores(state => state.filter((x: any) => x._id !== choreId));

        navigate('/');
    };

    const choreContextValue: {} = {
        displayChores,
        onChoreCreate,
        onEdit,
        onDelete,
        setChores,
        displayedChores,
        chores,
    };

    return (
        <>
            <ChoreContext.Provider value={choreContextValue}>
                {children}
            </ChoreContext.Provider>
        </>
    );
};
