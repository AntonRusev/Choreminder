import { createContext, useState } from "react";

export const ChoreContext = createContext({});

export const ChoreProvider = ({
    children,
} : any) => {
    const [chores, setChores] = useState([] as any);

    const onChoreCreate = (e: any, chore: {}) => {
        e.preventDefault();

        setChores([...chores, chore]);

    }

    const choreContextValue: {} = {
        onChoreCreate,
    }

    return (
        <>
            <ChoreContext.Provider value={choreContextValue}>
                {children}
            </ChoreContext.Provider>
        </>
    );
};
