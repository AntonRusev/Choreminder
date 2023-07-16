import { memo, useContext } from 'react';

import { ChoreContext } from '../../contexts/ChoreContext';
import { ConfirmContext } from '../../contexts/ConfirmContext';

import ChoreItem from '../ChoreItem/ChoreItem';
import { Confirm } from '../Confirm/Confirm';

import style from './ChoresList.module.scss';

const ChoreList = () => {
    const { displayedChores } = useContext(ChoreContext);
    const { isConfirmActive } = useContext(ConfirmContext);

    // TODO Fix the key!! 
    return (
        <>
            <section>
                {displayedChores
                    ?
                    <ul className={style.list}>
                        {displayedChores.map((chore: any, index: number) => <ChoreItem key={index} {...chore} />)}
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

export default memo(ChoreList);