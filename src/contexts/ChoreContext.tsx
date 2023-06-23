import { createContext, useState } from "react";

export const ChoreContext = createContext({} as any);

export const ChoreProvider = ({
    children,
}: any) => {
    const [chores, setChores] = useState([{}]);
    const [formValues, setFormValues] = useState({} as any);

    // On filling the input fields - name, days, img

    function formValueChangeHandler(e: any) {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    // On sending FORM input data

    const onChoreCreate = (e: any) => {
        e.preventDefault();
        setFormValues({});

        const startDate: String = new Date().toString();

        const hoursRemaining: number = setChoreTimer(formValues.days, startDate);

        const percent: number = calculateProgress(formValues.days, hoursRemaining);

        const newChore: {} = { ...formValues, startDate, hoursRemaining, percent };

        setChores([...chores, newChore]);
    };

    // Setting up the ChoreItem timer

    const setChoreTimer = (daysInput: number, startingTime: any) => {
        const hours: number = Number(daysInput) * 24;

        startingTime = new Date(startingTime);

        const currentTime = new Date();

        // TODO Check if the hoursRemaining are not more than the base hours!!!
        const hoursRemaining: number = hours - hoursCalculator(startingTime, currentTime);

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
        const percent = 100 - (remainingTime / (end * 100));
        return percent;
    };

    const choreContextValue: {} = {
        formValueChangeHandler,
        onChoreCreate,
        setChoreTimer,
        calculateProgress,
        chores
    };

    return (
        <>
            <ChoreContext.Provider value={choreContextValue}>
                {children}
            </ChoreContext.Provider>
        </>
    );
};
