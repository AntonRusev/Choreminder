import '@testing-library/jest-dom';
import { describe, test, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from '../../contexts/AuthContext';
import { ConfirmContext } from '../../contexts/ConfirmContext';

import { Confirm } from './Confirm';

describe('Testing the Confirm Component', () => {
    test('show confirm message', () => {
        const confirmData = { action: 'some action'};

        render(
            <BrowserRouter>
                <AuthProvider>
                    <ConfirmContext.Provider value={{ confirmData }}>
                        <Confirm />
                    </ConfirmContext.Provider>
                </AuthProvider>
            </BrowserRouter>
        );

        expect(screen.getByText(/are you sure/i)).toBeInTheDocument();
        expect(screen.getByText(/some action/i)).toBeInTheDocument();
    });

    test('Confirm button works', async () => {
        const confirmData = { action: 'some action'};
        const onConfirm = vi.fn();

        render(
            <BrowserRouter>
                <AuthProvider>
                    <ConfirmContext.Provider value={{ onConfirm, confirmData }}>
                        <Confirm />
                    </ConfirmContext.Provider>
                </AuthProvider>
            </BrowserRouter>
        );

        const confirmBtn = await screen.findByText(/I'm Sure/i);
        fireEvent.click(confirmBtn);

        expect(onConfirm).toHaveBeenCalledTimes(1);
    });

    test('Cancel button works', async () => {
        const confirmData = { action: 'some action'};
        const onCloseConfirm = vi.fn();

        render(
            <BrowserRouter>
                <AuthProvider>
                    <ConfirmContext.Provider value={{ onCloseConfirm, confirmData }}>
                        <Confirm />
                    </ConfirmContext.Provider>
                </AuthProvider>
            </BrowserRouter>
        );

        const cancelBtn = await screen.findByText(/cancel/i);
        fireEvent.click(cancelBtn);

        expect(onCloseConfirm).toHaveBeenCalledTimes(1);
    });
});