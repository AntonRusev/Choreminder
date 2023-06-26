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

    // Calculating remaining hours till the chore

    const setChoreTimer = (daysInput: number, startingTime: any) => {
        const hours: number = Number(daysInput) * 24;

        startingTime = new Date(startingTime);

        const currentTime = new Date();

        // TODO Check if the hoursRemaining are not more than the base hours!!!
        let hoursRemaining: number = hours - hoursCalculator(startingTime, currentTime);

        if (hoursRemaining > hours) {
            hoursRemaining %= hours;
        };

        return hoursRemaining;
    };

    const hoursCalculator = (startingTime: any, currentTime: any) => {
        return Math.round(
            Math.abs(
                (startingTime.getTime() - currentTime.getTime()) / (1000 * 3600)
            )
        );
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