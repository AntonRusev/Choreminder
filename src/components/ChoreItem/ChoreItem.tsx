import { memo, useContext } from "react";

import { ConfirmContext } from "../../contexts/ConfirmContext";

import { useProgress } from "../../hooks/useProgress";

import style from './ChoreItem.module.scss';

const ChoreItem = ({
    _id,
    name,
    days,
    img,
    startDate,
    endDate,
    isActive,
}: {
    _id: string,
    name: string,
    days: number,
    img: string,
    startDate: any,
    endDate: any,
    isActive: boolean,
}) => {
    const { onActivateConfirm } = useContext(ConfirmContext);

    const { hoursRemaining, progress } = useProgress(days, startDate);

    return (
        <li className={style.chore}>
            {isActive === true
                ? <>
                    <article>
                        <p>ID: {_id}</p>
                        <p>Name: {name}</p>
                        <p>Repeat Time: {days} days</p>
                        <p>Start Date: {startDate}</p>
                        <p>End Date: {endDate}</p>
                        <p>Hours Remaining: {hoursRemaining} </p>
                        <p>Progress: {progress?.toFixed(2)} </p>
                        <p>Active: {isActive} </p>
                    </article>
                    
                    <div className={style.progressbar}>
                        <label htmlFor="chore">{name}: </label>
                        <progress id="chore" value={hoursRemaining} max={days * 24}></progress>

                        <div className={style.btns}>
                            <button onClick={() => onActivateConfirm({ action: "reset", _id, name, days, isActive })}>Reset</button>
                            <button onClick={() => onActivateConfirm({ action: "stop", _id, name, days, isActive: false })}>Stop</button>
                            <button onClick={() => onActivateConfirm({ action: "delete", _id, })}>Delete</button>
                        </div>
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

export default memo(ChoreItem);