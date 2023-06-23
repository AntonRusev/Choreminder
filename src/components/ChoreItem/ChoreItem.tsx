export const ChoreItem = ({
    name,
    days,
    img,
    startDate,
    hoursRemaining,
    percent
}: {
    name: string,
    days: number,
    img: string,
    startDate: any,
    hoursRemaining: number,
    percent: number
}) => {
    return (
        <li>
            <article>
                <p>Name: {name}</p>
                <p>IMG: {img}</p>
                <p>Repeat Time: {days} days</p>
                <p>Start Date: : {startDate}</p>
                <p>Hours Remaining: {hoursRemaining} </p>
            </article>
            <div>
                <label htmlFor="chore">{name}-{hoursRemaining}</label>
                <progress id="chore" value={percent} max="100"></progress>
                <span>{days * 24}</span>
            </div>
        </li>
    );
};