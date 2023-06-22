import { createContext, useState } from "react";

export const ChoreContext = createContext({} as any);

export const ChoreProvider = ({
    children,
} : any) => {
    const [chores, setChores] = useState([] as any);
    const [formValues, setFormValues] = useState({} as any);

    // On filling the input fields

    function formValueChangeHandler(e: any) {
        setFormValues({...formValues, [e.target.name] : e.target.value});
    };

    // On sending FORM input data

    const onChoreCreate = (e: any) => {
        e.preventDefault();

        const startDate: Date = new Date();

        const newChore: {} = {...formValues, startDate}

        setChores([...chores, newChore]);
    };

    const choreContextValue: {} = {
        formValueChangeHandler,
        onChoreCreate,
    };

    return (
        <>
            <ChoreContext.Provider value={choreContextValue}>
                {children}
            </ChoreContext.Provider>
        </>
    );
};
