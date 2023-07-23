import { createContext, useEffect, useState } from "react";

export const AlertContext = createContext({} as any);

export const AlertProvider = ({
    children,
}: any) => {
    const [isAlertActive, setIsAlertActive] = useState(false);
    const [alertData, setAlertData] = useState([]);

    // Showing the Alert window
    useEffect(() => {
        if (Object.keys(alertData).length > 0) {
            setIsAlertActive(true);
        } else {
            setIsAlertActive(false);
        };
    }, [alertData]);

    const onActivateAlert = (data: []) => {
        setAlertData(data);
    };

    // Closing the Alert Window
    const onCloseAlert = () => {
        setAlertData([]);
    };

    const alertContextValue: {} = {
        onActivateAlert,
        onCloseAlert,
        isAlertActive,
        alertData
    };

    return (
        <>
            <AlertContext.Provider value={alertContextValue}>
                {children}
            </AlertContext.Provider>
        </>
    );
};