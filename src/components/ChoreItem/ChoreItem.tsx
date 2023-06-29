import { useContext } from "react";

import { ConfirmContext } from "../../contexts/ConfirmContext";

import { useProgress } from "../../hooks/useProgress";

import * as css from './ChoreItem.module.scss';

export const ChoreItem = ({
    _id,
    name,
    days,
    img,
    startDate,
    isActive,
}: {
    _id: string,
    name: string,
    days: number,
    img: string,
    startDate: any,
    isActive: boolean,
}) => {
    const { onActivateConfirm } = useContext(ConfirmContext);

    const { hoursRemaining, progress } = useProgress(days, startDate);


    return (
        <li className={css.chore}>
            {isActive
                ? <>
                    <article>
                        <p>ID: {_id}</p>
                        <p>Name: {name}</p>
                        <p>Repeat Time: {days} days</p>
                        <p>Start Date: : {startDate}</p>
                        <p>Hours Remaining: {hoursRemaining} </p>
                        <p>Progress: {progress.toFixed(2)} </p>
                        <p>Active: {isActive} </p>
                    </article>
                    <div>
                        <label htmlFor="chore">{name}: </label>
                        <progress id="chore" className={css.progressbar} value={hoursRemaining} max={days * 24}></progress>

                        <button onClick={() => onActivateConfirm({ action: "reset", _id, name, img, days, isActive })}>Reset</button>
                        <button onClick={() => onActivateConfirm({ action: "stop", _id, name, img, days, isActive: false })}>Stop</button>
                        <button onClick={() => onActivateConfirm({ action: "delete", _id, })}>Delete</button>
                    </div>
                </>
                :
                <>
                    <p>The "{name}" chore is not active.</p>
                    <button onClick={() => onActivateConfirm({ action: "activate", _id, name, img, days, isActive: true })}>Activate</button>
                </>
            }
        </li>
    );
};