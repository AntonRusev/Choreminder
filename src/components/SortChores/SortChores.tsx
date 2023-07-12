import { useContext, useState } from "react";

import { ChoreContext } from "../../contexts/ChoreContext";

export const SortChores = () => {
    const [sortOrder, setSortOrder] = useState('incremental');
    const { chores, setChores } = useContext(ChoreContext);


    const sortChores = (order: string, key: string) => {
        changeSortOrder();

        let sortedChores: any;

        if (key === 'days') {
            if (order === 'incremental') {
                sortedChores = [...chores].sort((a: any, b: any) => { return (+a[key] > +b[key] ? 1 : -1) });
            } else if (order === 'decremental') {
                sortedChores = [...chores].sort((a: any, b: any) => { return (+b[key] > +a[key] ? 1 : -1) });
            };
        } else {
            if (order === 'incremental') {
                sortedChores = [...chores].sort((a: any, b: any) => { return (a[key] > b[key] ? 1 : -1) });
            } else if (order === 'decremental') {
                sortedChores = [...chores].sort((a: any, b: any) => { return (b[key] > a[key] ? 1 : -1) });
            };
        };

        setChores(sortedChores);
    };

    const changeSortOrder = () => {
        if (sortOrder === 'incremental') {
            setSortOrder('decremental');
        } else {
            setSortOrder('incremental');
        };
    };

    return (
        <>
            <button onClick={() => sortChores(sortOrder, 'name')}>Sort by Name</button>
            <button onClick={() => sortChores(sortOrder, 'days')}>Sort by Days</button>
            <button onClick={() => sortChores(sortOrder, 'startDate')}>Sort by starting date</button>
            <button onClick={() => sortChores(sortOrder, 'endDate')}>Sort by end date</button>
        </>
    );
};