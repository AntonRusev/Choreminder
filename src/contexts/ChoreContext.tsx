import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from '../contexts/AuthContext';

import * as choreService from '../services/choreService';

export const ChoreContext = createContext({} as any);

export const ChoreProvider = ({
    children,
}: any) => {
    const [chores, setChores] = useState([{}]);
    const [displayedChores, setDisplayedChores] = useState([{}]);
    const [searchPhrase, setSearchPhrase] = useState('');

    const { auth } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (auth._id) {
            choreService.getAll(auth._id)
                .then(result => setChores(result))
                .catch(error => console.log(error));
        };
    }, [auth]);

    useEffect(() => {
        if (chores.length > 0) {
            setDisplayedChores(chores);
        };
    }, [chores]);

    // On sending FORM input data

    const onChoreCreate = async (e: any, formValues: any) => {
        e.preventDefault();

        const startDate: string = new Date().toString();
        const isActive: boolean = true;

        const data: {} = { ...formValues, startDate, isActive };

        const newChore = await choreService.create(data);

        setChores([...chores, newChore]);

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

    // Sorting the chores

    const sortChores = (order: string, key: string) => {
        let sortedChores: any;

        if (order === 'fromMin') {
            sortedChores = [...chores].sort((a: any, b: any) => { return (a[key] > b[key] ? 1 : -1) });
        } else if (order === 'fromMax') {
            sortedChores = [...chores].sort((a: any, b: any) => { return (b[key] > a[key] ? 1 : -1) });
        };
        setChores(sortedChores);
    };

    // Search 

    const searchChores = (e: any) => {
        e.preventDefault();

        setSearchPhrase(e.target.value);

        const matched = chores.filter((e: any) => {
            return e.name
                .toLowerCase()
                .includes(searchPhrase.toLowerCase())
        });
        setDisplayedChores(matched);
    };

    const clear = (e: any) => {
        e.preventDefault();

        setSearchPhrase('');
        setDisplayedChores(chores);
    };

    const choreContextValue: {} = {
        onChoreCreate,
        onEdit,
        onDelete,
        sortChores,
        searchChores,
        clear,
        displayedChores,
        chores,
        searchPhrase,
    };

    return (
        <>
            <ChoreContext.Provider value={choreContextValue}>
                {children}
            </ChoreContext.Provider>
        </>
    );
};
