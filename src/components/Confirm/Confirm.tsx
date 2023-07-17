import { useContext } from 'react';

import { ConfirmContext } from '../../contexts/ConfirmContext';

import style from './Confirm.module.scss';

export const Confirm = () => {
    const { onCloseConfirm, confirmData, onConfirm } = useContext(ConfirmContext);

    return (
        <section onClick={onCloseConfirm} className={style.overlay}>
            <div onClick={(e) => e.stopPropagation()} className={style.confirm}>
                <p>Are you sure, that you want to <span className={style.important}>{confirmData.action}</span> this chore?</p>

                <div className={style.btnHolder}>
                    <button onClick={onConfirm} className={style.basicBtn}>I'm Sure</button>
                    <button onClick={onCloseConfirm} className={style.basicBtn}>Cancel</button>
                </div>
            </div>
        </section>
    );
};