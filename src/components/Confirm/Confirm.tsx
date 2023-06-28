import { useContext } from 'react';

import { ConfirmContext } from '../../contexts/ConfirmContext';

import * as css from './Confirm.module.scss';

export const Confirm = () => {
    const { onCloseConfirm, confirmData, onConfirm } = useContext(ConfirmContext);

    return (
        <section className={css.confirmWindow}>
            <p>Are you sure, that you want to {confirmData.action} this chore?</p>
            <button onClick={onConfirm}>I'm Sure</button>
            <button onClick={onCloseConfirm}>Cancel</button>
        </section>
    );
};