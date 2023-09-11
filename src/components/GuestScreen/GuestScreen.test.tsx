import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from '../../contexts/AuthContext';

import { GuestScreen } from './GuestScreen';

describe('Testing the GuestScreen Component', () => {
    test('show Welcome and Hint messages', () => {
        render(
            <BrowserRouter>
                <AuthProvider>
                    <GuestScreen />
                </AuthProvider>
            </BrowserRouter>
        );

        expect(screen.getByText(/welcome/i)).toBeInTheDocument();
        expect(screen.getByText(/hint/i)).toBeInTheDocument();
    });

    test('About, Login and Sign Up buttons are shown', () => {
        render(
            <BrowserRouter>
                <AuthProvider>
                    <GuestScreen />
                </AuthProvider>
            </BrowserRouter>
        );
        expect(screen.getByText(/login/i)).toBeInTheDocument();
        expect(screen.getByText(/sign up/i)).toBeInTheDocument();
        expect(screen.getByText(/about/i)).toBeInTheDocument();
    });

    test('About link works', async () => {
        render(
            <BrowserRouter>
                <AuthProvider>
                    <GuestScreen />
                </AuthProvider>
            </BrowserRouter>
        );

        const aboutBtn = await screen.findByText(/about/i);
        fireEvent.click(aboutBtn);

        const currentUrlPath = global.window.location.pathname;
        expect(currentUrlPath).toContain(`/about`);
    });

    test('Login link works', async () => {
        render(
            <BrowserRouter>
                <AuthProvider>
                    <GuestScreen />
                </AuthProvider>
            </BrowserRouter>
        );
        const loginBtn = await screen.findByText(/login/i);
        fireEvent.click(loginBtn);

        const currentUrlPath = global.window.location.pathname;
        expect(currentUrlPath).toContain(`/login`);
    });

    test('Sign Up link works', async () => {
        render(
            <BrowserRouter>
                <AuthProvider>
                    <GuestScreen />
                </AuthProvider>
            </BrowserRouter>
        );
        const signUpBtn = await screen.findByText(/sign/i);
        fireEvent.click(signUpBtn);

        const currentUrlPath = global.window.location.pathname;
        expect(currentUrlPath).toContain(`/register`);
    });
});