import { memo, useContext, useState } from "react";

import { ChoreContext } from "../../contexts/ChoreContext";
import { dateSort, daysSort } from "../../utils/sorters";

const SortChores = () => {
    const [sortOrder, setSortOrder] = useState('incremental');
    const { chores, setChores } = useContext(ChoreContext);

    // Sorting the existing chores
    const sortChores = (order: string, sortBy: string) => {
        changeSortOrder();

        let sortedChores: any;

        if (sortBy === 'days') {
            sortedChores = [...chores].sort((a: any, b: any) => daysSort(a, b, sortBy, order));
        } else if (sortBy === 'startDate' || sortBy === 'endDate') {
            sortedChores = [...chores].sort((a: any, b: any) => dateSort(a, b, sortBy, order));
        } else {
            if (order === 'incremental') {
                sortedChores = [...chores].sort((a: any, b: any) => { return (a[sortBy] > b[sortBy] ? 1 : -1) });
            } else if (order === 'decremental') {
                sortedChores = [...chores].sort((a: any, b: any) => { return (b[sortBy] > a[sortBy] ? 1 : -1) });
            };
        };
        setChores(sortedChores);
    };

    // Changing sort order
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
            <button onClick={() => sortChores(sortOrder, 'startDate')}>Sort by start of timer</button>
            <button onClick={() => sortChores(sortOrder, 'endDate')}>Sort by remaining hours</button>
        </>
    );
};

export default memo(SortChores);