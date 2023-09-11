import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import { AuthProvider } from '../../contexts/AuthContext';

import { Register } from './Register';

describe('Testing the Register Component', () => {
    test('show Sign Up button and Cancel + Login links', () => {
        render(
            <BrowserRouter>
                <AuthProvider>
                    <Register />
                </AuthProvider>
            </BrowserRouter>
        );

        const signUpBtn = screen.getByRole("button", { name: /sign/i });
        expect(signUpBtn).toBeInTheDocument();

        const cancelLink = screen.getByText(/cancel/i);
        expect(cancelLink).toBeInTheDocument();

        const loginLink = screen.getByText(/login/i);
        expect(loginLink).toBeInTheDocument();
    });

    test('Cancel link works', async () => {
        render(
            <BrowserRouter>
                <AuthProvider>
                    <Register />
                </AuthProvider>
            </BrowserRouter>
        );

        const cancelLink = await screen.findByText(/cancel/i);
        fireEvent.click(cancelLink);

        const currentUrlPath = global.window.location.pathname;
        expect(currentUrlPath).toContain(`/`);
    });

    test('Login link works', async () => {
        render(
            <BrowserRouter>
                <AuthProvider>
                    <Register />
                </AuthProvider>
            </BrowserRouter>
        );

        const loginLink = await screen.findByText(/login/i);
        fireEvent.click(loginLink);

        const currentUrlPath = global.window.location.pathname;
        expect(currentUrlPath).toContain(`/login`);
    });

    test('Sign Up button is disabled', async () => {
        render(
            <BrowserRouter>
                <AuthProvider>
                    <Register />
                </AuthProvider>
            </BrowserRouter>
        );

        const signUpBtn = await screen.findByText(/sign/i);
        expect(signUpBtn).toBeDisabled();
    });

    test('component has proper input fields', () => {
        render(
            <BrowserRouter>
                <AuthProvider>
                    <Register />
                </AuthProvider>
            </BrowserRouter>
        );

        const emailInput = screen.getByRole("textbox");
        const [passwordInput, rePassInput] = screen.getAllByLabelText(/Password/i);

        expect(emailInput).toBeInTheDocument();
        expect(emailInput).toHaveAttribute("name", "email");

        expect(passwordInput).toBeInTheDocument();
        expect(passwordInput).toHaveAttribute("name", "password");

        expect(rePassInput).toBeInTheDocument();
        expect(rePassInput).toHaveAttribute("name", "rePass");
    });

    test('input fields accept data', async () => {
        const user = userEvent.setup();

        render(
            <BrowserRouter>
                <AuthProvider>
                    <Register />
                </AuthProvider>
            </BrowserRouter>
        );

        const emailInput = screen.getByRole("textbox");
        const [passwordInput, rePassInput] = screen.getAllByLabelText(/Password/i);

        await user.type(emailInput, "test@mail.com");
        expect(emailInput).toHaveValue("test@mail.com");

        await user.type(passwordInput, "user's password");
        expect(passwordInput).toHaveValue("user's password");

        await user.type(rePassInput, "repeat password");
        expect(rePassInput).toHaveValue("repeat password");
    });
});