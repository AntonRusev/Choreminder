import { memo, useContext, useState } from "react";

import { ConfirmContext } from "../../contexts/ConfirmContext";

import { useProgress } from "../../hooks/useProgress";

import style from './ChoreItem.module.scss';
import { dayAndHour } from "../../utils/dayAndHourExtractor";

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
    const [isSelected, setIsSelected] = useState(false);

    const { onActivateConfirm } = useContext(ConfirmContext);

    const { hoursRemaining } = useProgress(days, startDate);

    const start = dayAndHour(startDate);
    const end = dayAndHour(endDate);

    const toggleSelected = () => {
        setIsSelected(!isSelected);
    };

    return (
        <li onClick={() => toggleSelected()} className={style.chore}>
            {isActive === true
                ? <div>
                    {/* EXTRA INFO ON CLICK */}
                    {isSelected
                        ? <article>
                            {/* <p>ID: {_id}</p> */}
                            <p><span>Chore:</span> {name}</p>
                            <p><span>Repeat Time:</span> {days} days</p>
                            <p><span>Timer started:</span> {start}</p>
                            <p><span>Chore due:</span> {end}</p>
                            <p><span>Hours Remaining:</span> {hoursRemaining} </p>
                            {/* <p>Progress: {progress?.toFixed(2)} </p>
                            <p>Active: {isActive} </p> */}
                        </article>
                        :
                        <div className={style.textProgress}>
                            <label htmlFor="chore">{name}: <span>{days} days</span></label>
                        </div>
                    }

                    {/* BASIC INFO */}
                    <div className={style.progressbar}>
                        <div
                            className={+hoursRemaining <= 48
                                ? `${style.green}`
                                : +hoursRemaining >= 168
                                    ? `${style.blue}`
                                    : ''
                            }

                        >
                            <progress id="chore" value={hoursRemaining} max={days * 24}></progress>
                        </div>

                        {/* EXTRA INFO ON CLICK */}

                        {isSelected
                            ?
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
                            :
                            <div className={style.textProgress}>
                                <p>Remaining: <span>{hoursRemaining}</span> hours</p>
                            </div>
                        }
                    </div>
                </div>
                :
                <>
                    <p className={style.inactive}>The <span>{name}</span> chore is not active.</p>
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