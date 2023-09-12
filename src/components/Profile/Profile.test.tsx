import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";

import { AuthContext, AuthProvider } from '../../contexts/AuthContext';

import { Profile } from './Profile';

describe('Testing the Profile Component', () => {
    test('show user email', async () => {
        const auth = { email: 'email@abv.bg' };

        render(
            <BrowserRouter>
                <AuthContext.Provider value={{ auth }}>
                    <Profile />
                </AuthContext.Provider>
            </BrowserRouter>
        );

        const profileBtn = await screen.findByText(/profile/i);
        fireEvent.click(profileBtn);

        expect(screen.getByText(/email@abv.bg/i)).toBeInTheDocument();
    });

    test('Logout link works', async () => {
        render(
            <BrowserRouter>
                <AuthProvider>
                    <Profile />
                </AuthProvider>
            </BrowserRouter>
        );

        const profileBtn = await screen.findByText(/profile/i);
        fireEvent.click(profileBtn);

        const logoutBtn = await screen.findByText(/logout/i);
        expect(logoutBtn).toBeInTheDocument();

        fireEvent.click(logoutBtn);

        const currentUrlPath = global.window.location.pathname;
        expect(currentUrlPath).toContain(`/`);
    });
});