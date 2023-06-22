import { useContext, useEffect, useState } from "react";

import { ChoreContext } from "../../contexts/ChoreContext";

export const ChoreItem = ({
    name,
    time,
    img,
    startDate,
}: {
    name: string,
    time: number,
    img: string,
    startDate: any,
}) => {
    const [hoursRemaining, setHoursRemaining] = useState(0);
    const { setChoreTimer } = useContext(ChoreContext);

    useEffect(() => {
        if (startDate) {
            const hours: number = setChoreTimer(time, startDate)
            setHoursRemaining(hours);
        };
    }, [startDate]);

    return (
        <li>
            <article>
                <p>Name: {name}</p>
                <p>IMG: {img}</p>
                <p>Repeat Time: {time}</p>
                <p>Start Date: : {startDate}</p>
                <p>Hours Remaining: {hoursRemaining} </p>
            </article>
        </li>
    );
};