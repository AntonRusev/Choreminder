import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from '../../contexts/AuthContext';

import  CreateChore  from './CreateChore';
import userEvent from '@testing-library/user-event';

describe('Testing the CreateChore Component', () => {
    test('show Add button', async () => {
        render(
            <BrowserRouter>
                <AuthProvider>
                    <CreateChore />
                </AuthProvider>
            </BrowserRouter>
        );

        expect(screen.getByText(/add/i)).toBeInTheDocument();
    });

    test('show input form after clicking Add button', async () => {
        render(
            <BrowserRouter>
                <AuthProvider>
                    <CreateChore />
                </AuthProvider>
            </BrowserRouter>
        );

        const addBtn = await screen.findByText(/add/i);
        fireEvent.click(addBtn);

        expect(screen.getByText(/name/i)).toBeInTheDocument();
        expect(screen.getByText(/days/i)).toBeInTheDocument();
        expect(screen.getByText(/create/i)).toBeInTheDocument();
        expect(screen.getByText(/cancel/i)).toBeInTheDocument();

        expect(screen.queryByText(/add/i)).toBeNull();
    });

    test('input form has proper fields', async () => {
        render(
            <BrowserRouter>
                <AuthProvider>
                    <CreateChore />
                </AuthProvider>
            </BrowserRouter>
        );

        const addBtn = await screen.findByText(/add/i);
        fireEvent.click(addBtn);

        const nameInput = screen.getByRole("textbox");
        const daysInput = screen.getByRole("spinbutton");

        expect(nameInput).toBeInTheDocument();
        expect(nameInput).toHaveAttribute("name", "name");

        expect(daysInput).toBeInTheDocument();
        expect(daysInput).toHaveAttribute("name", "days");
    });

    test('input form fields accept data', async () => {
        const user = userEvent.setup();
        
        render(
            <BrowserRouter>
                <AuthProvider>
                    <CreateChore />
                </AuthProvider>
            </BrowserRouter>
        );

        const addBtn = await screen.findByText(/add/i);
        fireEvent.click(addBtn);

        const nameInput = screen.getByRole("textbox");
        const daysInput = screen.getByRole("spinbutton");

        await user.type(nameInput, "name of chore");
        expect(nameInput).toHaveValue("name of chore");

        await user.type(daysInput, '5');
        expect(daysInput).toHaveValue(5);
    });

    test('Create button is disabled', async () => {
        render(
            <BrowserRouter>
                <AuthProvider>
                    <CreateChore />
                </AuthProvider>
            </BrowserRouter>
        );

        const addBtn = await screen.findByText(/add/i);
        fireEvent.click(addBtn);

        const createBtn = await screen.findByText(/create/i);
        expect(createBtn).toBeDisabled();
    });
});