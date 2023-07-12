import { useContext } from "react";

import { ChoreContext } from "../../contexts/ChoreContext";

export const SortChores = () => {
    const { chores, setChores } = useContext(ChoreContext);


    const sortChores = (order: string, key: string) => {
        let sortedChores: any;

        if (key === 'days') {
            if (order === 'fromMin') {
                sortedChores = [...chores].sort((a: any, b: any) => { return (+a[key] > +b[key] ? 1 : -1) });
            } else if (order === 'fromMax') {
                sortedChores = [...chores].sort((a: any, b: any) => { return (+b[key] > +a[key] ? 1 : -1) });
            };
        } else {
            if (order === 'fromMin') {
                sortedChores = [...chores].sort((a: any, b: any) => { return (a[key] > b[key] ? 1 : -1) });
            } else if (order === 'fromMax') {
                sortedChores = [...chores].sort((a: any, b: any) => { return (b[key] > a[key] ? 1 : -1) });
            };
        };

        setChores(sortedChores);
    };

    return (
        <>
            <button onClick={() => sortChores('fromMin', 'name')}>Sort by Name</button>
            <button onClick={() => sortChores('fromMin', 'days')}>Sort by Days</button>
            <button onClick={() => sortChores('fromMin', 'startDate')}>Sort by starting date</button>
        </>
    );
};