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

                        <div className={style.btnHolder}>
                            {/* Reset Button */}
                            <div
                                onClick={() => onActivateConfirm({ action: "reset", _id, name, days, isActive })}
                                className={style.crudBtn}
                            >
                                <span className={style.tooltip}>Reset</span>
                                <span>
                                    <i className="fa-solid fa-clock-rotate-left"></i>
                                </span>
                            </div>

                            {/* Stop Button */}
                            <div
                                onClick={() => onActivateConfirm({ action: "stop", _id, name, days, isActive: false })}
                                className={style.crudBtn}
                            >
                                <span className={style.tooltip}>Stop</span>
                                <span>
                                    <i className="fa-solid fa-circle-stop"></i>
                                </span>
                            </div>

                            {/* Delete Button */}
                            <div
                                onClick={() => onActivateConfirm({ action: "delete", _id, })}
                                className={style.crudBtn}
                            >
                                <span className={style.tooltip}>Delete</span>
                                <span>
                                    <i className="fa-solid fa-trash-can"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </>
                :
                <>
                    <p>The "{name}" chore is not active.</p>
                    {/* Activate Button */}
                    <div
                        onClick={() => onActivateConfirm({ action: "activate", _id, name, img, days, isActive: true })}
                        className={style.crudBtn}
                    >
                        <span className={style.tooltip}>Activate</span>
                        <span>
                            <i className="fa-solid fa-circle-play"></i>
                        </span>
                    </div>
                </>
            }
        </li>
    );
};

export default memo(ChoreItem);