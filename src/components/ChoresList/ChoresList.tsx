import { useContext } from 'react';

import { ChoreContext } from '../../contexts/ChoreContext';
import { ConfirmContext } from '../../contexts/ConfirmContext';

import { ChoreItem } from '../ChoreItem/ChoreItem';
import { Confirm } from '../Confirm/Confirm';

import * as css from './ChoresList.module.scss';

export const ChoreList = () => {
    const { chores, sortChores } = useContext(ChoreContext);
    const { isConfirmActive } = useContext(ConfirmContext);

    // TODO Fix the key!! 
    return (
        <>
            <section>
                {chores
                    ?
                    <ul className={css.list}>
                        {chores.map((chore: any, index: number) => <ChoreItem key={index} {...chore} />)}
                    </ul>
                    :
                    <p>
                        No chores.
                    </p>
                }
                <button onClick={() => sortChores('fromMin', 'name')}>Sort by Name</button>
                <button onClick={() => sortChores('fromMin', 'days')}>Sort by Days</button>
                <button onClick={() => sortChores('fromMin', 'startDate')}>Sort by starting date</button>
            </section>

            {/* Confirmation Window */}
            {isConfirmActive && <Confirm />}
        </>
    );
};