import { useProgress } from "../../hooks/useProgress";

import * as css from './ChoreItem.module.scss';

export const ChoreItem = ({
    name,
    days,
    img,
    startDate,
    isActive
}: {
    name: string,
    days: number,
    img: string,
    startDate: any,
    isActive: boolean
}) => {

    const { hoursRemaining, progress } = useProgress(days, startDate);

    return (
        <li className={css.chore}>
            {isActive
                ? <>
                    <article>
                        <p>Name: {name}</p>
                        <p>IMG: {img}</p>
                        <p>Repeat Time: {days} days</p>
                        <p>Start Date: : {startDate}</p>
                        <p>Hours Remaining: {hoursRemaining} </p>
                        <p>Progress: {progress.toFixed(2)} </p>
                    </article>
                    <div>
                        <p>this is a progressbar</p>
                        <label htmlFor="chore">{name}-{hoursRemaining}</label>
                        <progress id="chore" className={css.progressbar} value={hoursRemaining} max={days * 24}></progress>
                    </div>
                </>
                : <p>The "{name}" chore is not active.</p>}
        </li>
    );
};