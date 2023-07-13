import { useEffect, useState } from "react";

export const useProgress = (days: number, startDate: any) => {
    const [hoursRemaining, setHoursRemaining] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (days && startDate) {
            setHoursRemaining(setChoreTimer(days, startDate));
            setProgress(calculateProgress(days, hoursRemaining))
        };
    }, [days, startDate]);

    useEffect(() => {
        if (days && hoursRemaining) {
            setProgress(calculateProgress(days, hoursRemaining))
        };
    }, [days, hoursRemaining]);

    // Calculating remaining hours till the chore has to be done

    const setChoreTimer = (daysInput: number, startingTime: any) => {
        const hours: number = Number(daysInput) * 24;

        startingTime = new Date(startingTime);

        const currentTime = new Date();

        let hoursRemaining: number = hours - hoursCalculator(startingTime, currentTime);

        if (hoursRemaining < 0) {
            hoursRemaining = 0;
        };

        return hoursRemaining;
    };

    const hoursCalculator = (startingTime: any, currentTime: any) => {
        let result: number = Math.round((currentTime.getTime() - startingTime.getTime()) / (1000 * 3600));

        return result;
    };

    // Calculating Progress % 

    const calculateProgress = (setTime: any, remainingTime: any) => {
        const end: number = Number(setTime * 24);
        const percent = (remainingTime / end) * 100;
        return percent;
    };

    return {
        hoursRemaining,
        progress
    };
};