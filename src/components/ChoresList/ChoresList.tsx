import { useContext } from 'react';

import { ChoreContext } from '../../contexts/ChoreContext';
import { ConfirmContext } from '../../contexts/ConfirmContext';

import { ChoreItem } from '../ChoreItem/ChoreItem';
import { Confirm } from '../Confirm/Confirm';

import * as css from './ChoresList.module.scss';

export const ChoreList = () => {
    const { chores } = useContext(ChoreContext);
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
            </section>

            {/* Confirmation Window */}
            {isConfirmActive && <Confirm />}
        </>
    );
};