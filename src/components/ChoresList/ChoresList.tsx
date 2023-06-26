import { useContext } from 'react';

import { ChoreContext } from '../../contexts/ChoreContext';

import { ChoreItem } from '../ChoreItem/ChoreItem';

export const ChoreList = () => {
    const { chores } = useContext(ChoreContext);

    // TODO Fix the key!! 
    return (
        <section>
            {chores
                ?
                <ul>
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