import { useContext } from "react";

import { AlertContext } from "../../contexts/AlertContext";

import style from './Alert.module.scss';

export const Alert = () => {
    const { onCloseAlert, alertData } = useContext(AlertContext);
    const message = alertData.pop();

    return (
        <section onClick={onCloseAlert} className={style.overlay}>
            <div onClick={(e) => e.stopPropagation()} className={style.confirm}>
                <p>{message}</p>

                <button onClick={onCloseAlert} className={style.basicBtn}>Ok</button>
            </div>
        </section>
    );
};