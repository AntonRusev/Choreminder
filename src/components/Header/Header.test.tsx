import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";

import { AuthContext, AuthProvider } from '../../contexts/AuthContext';

import Header from './Header';

describe('Testing the Header Component', () => {
    test('show heading', () => {
        render(
            <BrowserRouter>
                <AuthProvider>
                    <Header />
                </AuthProvider>
            </BrowserRouter>
        );

        expect(screen.getByText(/choreminder/i)).toBeInTheDocument();
    });

    test('About link works', async () => {
        render(
            <BrowserRouter>
                <AuthProvider>
                    <Header />
                </AuthProvider>
            </BrowserRouter>
        );

        const aboutBtn = await screen.findByText(/about/i);
        fireEvent.click(aboutBtn);

        const currentUrlPath = global.window.location.pathname;
        expect(currentUrlPath).toContain(`/about`);
    });

    test('works properly with logged in user', () => {
        const auth = { _id: 'id' };
        render(
            <BrowserRouter>
                <AuthContext.Provider value={{ auth }}>
                    <Header />
                </AuthContext.Provider>
            </BrowserRouter>
        );

        expect(screen.getByText(/profile/i)).toBeInTheDocument();

        expect(screen.queryByText(/login/i)).toBeNull();
        expect(screen.queryByText(/sign up/i)).toBeNull();
    });

    test('works properly with guest', () => {
        render(
            <BrowserRouter>
                <AuthProvider>
                    <Header />
                </AuthProvider>
            </BrowserRouter>
        );
        expect(screen.queryByText(/profile/i)).toBeNull();

        expect(screen.getByText(/login/i)).toBeInTheDocument();
        expect(screen.getByText(/sign up/i)).toBeInTheDocument();
    });

    test('Login link works', async () => {
        render(
            <BrowserRouter>
                <AuthProvider>
                    <Header />
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
                    <Header />
                </AuthProvider>
            </BrowserRouter>
        );
        const signUpBtn = await screen.findByText(/sign/i);
        fireEvent.click(signUpBtn);

        const currentUrlPath = global.window.location.pathname;
        expect(currentUrlPath).toContain(`/register`);
    });

    test('Logo link to home page works', async () => {
        render(
            <BrowserRouter>
                <AuthProvider>
                    <Header />
                </AuthProvider>
            </BrowserRouter>
        );
        const homeBtn = await screen.findByText(/choreminder/i);
        fireEvent.click(homeBtn);

        const currentUrlPath = global.window.location.pathname;
        expect(currentUrlPath).toContain(`/`);
        console.log(currentUrlPath)
    });
});