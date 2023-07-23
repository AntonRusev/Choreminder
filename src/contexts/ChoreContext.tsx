import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from '../contexts/AuthContext';

import * as choreService from '../services/choreService';

import { dateGenerator } from "../utils/dateGenerator";
import { dateSort } from "../utils/sorters";

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
                .then(result => {
                    // Initial sort by least time remaining
                    setChores([...result].sort((a: any, b: any) => dateSort(a, b, 'endDate', 'incremental')));
                })
                .catch(error => console.log(error));
        };
    }, [auth]);

    // Displaying chores

    const displayChores = (choresToDisplay: any, page = { currentPage: 0, resultsShown: 5, maxPages: 0 }) => {
        const toShow = [];

        let start = page.currentPage * page.resultsShown;
        let end = start + page.resultsShown;

        if (end > choresToDisplay.length) {
            end = choresToDisplay.length;
        };

        for (let i = start; i < end; i++) {
            toShow.push(choresToDisplay[i]);
        };

        setDisplayedChores(toShow);
    };

    // On sending FORM input data

    const onChoreCreate = async (e: any, formValues: any) => {
        e.preventDefault();

        const { startDate, endDate } = dateGenerator(formValues.days);

        const isActive: boolean = true;

        const data: {} = { ...formValues, startDate, endDate, isActive };

        const newChore = await choreService.create(data);

        setChores([newChore, ...chores]);

        navigate('/');
    };

    // Editing a Chore(Reseting the timer or turning it inactive)

    const onEdit = async (choreId: string, data: any) => {
        const { startDate, endDate } = dateGenerator(data.days);

        const result = await choreService.edit(choreId, { ...data, startDate, endDate });

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
