import '@testing-library/jest-dom';
import { describe, test, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from '../../contexts/AuthContext';

import { Alert } from './Alert';
import { AlertContext } from '../../contexts/AlertContext';

describe('Testing the Alert Component', () => {
    test('show heading', () => {
        const alertData = ['custom message'];
        render(
            <BrowserRouter>
                <AlertContext.Provider value={{ alertData }}>
                    <AuthProvider>
                        <Alert />
                    </AuthProvider>
                </AlertContext.Provider>
            </BrowserRouter>
        );

        expect(screen.getByText(/custom message/i)).toBeInTheDocument();
    });

    test('Ok button works', async () => {
        const onCloseAlert = vi.fn();
        const alertData = ['custom message'];
        
        render(
            <BrowserRouter>
                <AlertContext.Provider value={{ onCloseAlert, alertData }}>
                    <AuthProvider>
                        <Alert />
                    </AuthProvider>
                </AlertContext.Provider>
            </BrowserRouter>
        );

        const okBtn = await screen.findByText(/ok/i);
        fireEvent.click(okBtn);

        expect(onCloseAlert).toHaveBeenCalledTimes(1);
    });
});