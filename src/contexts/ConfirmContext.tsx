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
        if (confirmData.action === 'delete') {

            // Removing the chore
            onDelete(confirmData._id);

        } else if (confirmData.action === 'reset') {

            // Reseting the timer of the chore
            onEdit(confirmData._id, confirmData);

        } else if (confirmData.action === 'stop') {

            // Setting the chore inactive
            onEdit(confirmData._id, { ...confirmData, isActive: false });

        } else if (confirmData.action === 'activate') {

            // Setting the chore active
            onEdit(confirmData._id, { ...confirmData, isActive: true });
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