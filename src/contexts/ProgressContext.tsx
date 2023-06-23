import { createContext } from "react";

export const ProgressContext = createContext({});

export const ProgressProvider = ({
    children,
}: any) => {

    const progressContextValue: {} = {

    };

    return (
        <>
            <ProgressContext.Provider value={progressContextValue}>
                {children}
            </ProgressContext.Provider>
        </>
    );
};