import { createContext, useContext, useEffect, useState } from "react";

import { ChoreContext } from "./ChoreContext";

export const ConfirmContext = createContext({} as any);

export const ConfirmProvider = ({
    children,
}: any) => {
    const [isConfirmActive, setIsConfirmActive] = useState(false);
    const [confirmData, setConfirmData] = useState({} as any);

    const { onEdit, onDelete } = useContext(ChoreContext);

    // Showing the Confirm window
    useEffect(() => {
        if (Object.keys(confirmData).length > 0) {
            setIsConfirmActive(true);
        } else {
            setIsConfirmActive(false);
        };
    }, [confirmData]);

    const onActivateConfirm = (data: {}) => {
        setConfirmData(data);
    };

    // Closing the Confirm Window
    const onCloseConfirm = () => {
        setConfirmData({});
    };

    // On confirming the action
    const onConfirm = () => {
        const { action, ...data } = confirmData;

        if (action === 'delete') {

            // Removing the chore
            onDelete(data._id);

        } else if (action === 'reset') {

            // Reseting the timer of the chore
            onEdit(data._id, data);

        } else if (action === 'stop') {

            // Setting the chore inactive
            onEdit(data._id, { ...data, isActive: false });

        } else if (action === 'activate') {

            // Setting the chore active
            onEdit(data._id, { ...data, isActive: true });
        };

        onCloseConfirm();
    };

    const confirmContextValue: {} = {
        onActivateConfirm,
        onCloseConfirm,
        onConfirm,
        isConfirmActive,
        confirmData
    };

    return (
        <>
            <ConfirmContext.Provider value={confirmContextValue}>
                {children}
            </ConfirmContext.Provider>
        </>
    );
};