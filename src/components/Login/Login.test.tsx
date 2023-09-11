import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import { AuthProvider } from '../../contexts/AuthContext';

import { Login } from './Login';

describe('Testing the Login Component', () => {
    test('show Login button and Cancel + Sign Up links', () => {
        render(
            <BrowserRouter>
                <AuthProvider>
                    <Login />
                </AuthProvider>
            </BrowserRouter>
        );

        const loginBtn = screen.getByRole("button", { name: /login/i });
        expect(loginBtn).toBeInTheDocument();

        const cancelLink = screen.getByText(/cancel/i);
        expect(cancelLink).toBeInTheDocument();

        const signUpLink = screen.getByText(/sign/i);
        expect(signUpLink).toBeInTheDocument();
    });

    test('Cancel link works', async () => {
        render(
            <BrowserRouter>
                <AuthProvider>
                    <Login />
                </AuthProvider>
            </BrowserRouter>
        );

        const cancelLink = await screen.findByText(/cancel/i);
        fireEvent.click(cancelLink);

        const currentUrlPath = global.window.location.pathname;
        expect(currentUrlPath).toContain(`/`);
    });

    test('Login button is disabled', async () => {
        render(
            <BrowserRouter>
                <AuthProvider>
                    <Login />
                </AuthProvider>
            </BrowserRouter>
        );

        const loginBtn = await screen.findByText(/login/i);
        expect(loginBtn).toBeDisabled();
    });

    test('component has proper input fields', () => {
        render(
            <BrowserRouter>
                <AuthProvider>
                    <Login />
                </AuthProvider>
            </BrowserRouter>
        );

        const emailInput = screen.getByRole("textbox");
        const passwordInput = screen.getByLabelText(/Password/i);

        console.log(passwordInput)

        expect(emailInput).toBeInTheDocument();
        expect(emailInput).toHaveAttribute("name", "email");

        expect(passwordInput).toBeInTheDocument();
        expect(passwordInput).toHaveAttribute("name", "password");
    });

    test('input fields accept data', async () => {
        const user = userEvent.setup();

        render(
            <BrowserRouter>
                <AuthProvider>
                    <Login />
                </AuthProvider>
            </BrowserRouter>
        );

        const emailInput = screen.getByRole("textbox");
        const passwordInput = screen.getByLabelText(/Password/i);

        await user.type(emailInput, "test@mail.com");
        expect(emailInput).toHaveValue("test@mail.com");

        await user.type(passwordInput, "user's password");
        expect(passwordInput).toHaveValue("user's password");
    });
});