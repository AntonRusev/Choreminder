import { useContext } from 'react';

import { ChoreContext } from '../../contexts/ChoreContext';

import { ChoreItem } from '../ChoreItem/ChoreItem';

import * as css from './ChoresList.module.scss';

export const ChoreList = () => {
    const { chores } = useContext(ChoreContext);

    // TODO Fix the key!! 
    return (
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
    );
};