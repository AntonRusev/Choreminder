import { createContext, useState } from "react";

export const ChoreContext = createContext({} as any);

export const ChoreProvider = ({
    children,
}: any) => {
    const [chores, setChores] = useState([{}]);
    const [formValues, setFormValues] = useState({});

    // On filling the input fields

    function formValueChangeHandler(e: any) {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    // On sending FORM input data

    const onChoreCreate = (e: any) => {
        e.preventDefault();

        const startDate: String = new Date().toString();

        const newChore: {} = { ...formValues, startDate }

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

    const choreContextValue: {} = {
        formValueChangeHandler,
        onChoreCreate,
        setChoreTimer,
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
