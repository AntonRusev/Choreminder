import { memo, useContext, useState } from "react";

import { useClickOutside } from "../../hooks/useClickOutside";

import { ChoreContext } from "../../contexts/ChoreContext";
import { dateSort, daysSort } from "../../utils/sorters";

import style from './SortChores.module.scss';

const SortChores = () => {
    const [sortOrder, setSortOrder] = useState('incremental');
    const [showSortOptions, setShowSortOptions] = useState(false);
    const { chores, setChores } = useContext(ChoreContext);

    // Toggle the dropdown sorting menu
    const toggleSort = () => {
        setShowSortOptions(!showSortOptions);
    };

    // Close on click outside the menu
    const domNode = useClickOutside(() => {
        setShowSortOptions(false);
    });

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
        <div ref={domNode} className={`${style.sort}`}>
            <div
                onClick={() => toggleSort()}
                className={style.crudBtn}
            >
                <span className={style.tooltip}>Sort by...</span>
                <span>
                    <i className="fa-solid fa-sort"></i>
                </span>
            </div>

            {showSortOptions
                ?
                <div className={`${style.sortingOptions}`}>
                    <button onClick={() => sortChores(sortOrder, 'name')}>Sort by name</button>
                    <button onClick={() => sortChores(sortOrder, 'days')}>Sort by days</button>
                    <button onClick={() => sortChores(sortOrder, 'startDate')}>Sort by start of timer</button>
                    <button onClick={() => sortChores(sortOrder, 'endDate')}>Sort by remaining time</button>
                </div>
                :
                ''
            }

        </div >
    );
};

export default memo(SortChores);