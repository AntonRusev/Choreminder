import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from '../../contexts/AuthContext';
import { ChoreContext } from '../../contexts/ChoreContext';

import Search from './Search';
import userEvent from '@testing-library/user-event';

describe('Testing the Search Component', () => {
    test('show Search button', async () => {
        const chores = ['chores'];

        render(
            <BrowserRouter>
                <AuthProvider>
                    <ChoreContext.Provider value={{ chores }}>
                        <Search />
                    </ChoreContext.Provider>
                </AuthProvider>
            </BrowserRouter>
        );

        expect(screen.getByText(/search/i)).toBeInTheDocument();
    });

    test('show text input form after clicking the Search button', async () => {
        const chores = ['chores'];

        render(
            <BrowserRouter>
                <AuthProvider>
                    <ChoreContext.Provider value={{ chores }}>
                        <Search />
                    </ChoreContext.Provider>
                </AuthProvider>
            </BrowserRouter>
        );

        const searchBtn = await screen.findByText(/search/i);
        fireEvent.click(searchBtn);

        expect(screen.getByText(/search/i)).toBeInTheDocument();
        expect(screen.getByText(/clear/i)).toBeInTheDocument();
    });

    test('input form has proper field', async () => {
        const chores = ['chores'];

        render(
            <BrowserRouter>
                <AuthProvider>
                    <ChoreContext.Provider value={{ chores }}>
                        <Search />
                    </ChoreContext.Provider>
                </AuthProvider>
            </BrowserRouter>
        );

        const searchBtn = await screen.findByText(/search/i);
        fireEvent.click(searchBtn);

        const serchInput = screen.getByRole("textbox");

        expect(serchInput).toBeInTheDocument();
        expect(serchInput).toHaveAttribute("placeholder", "Enter name...");
    });

    test('search input form field accepts data', async () => {
        const user = userEvent.setup();
        const chores = ['chores'];

        render(
            <BrowserRouter>
                <AuthProvider>
                    <ChoreContext.Provider value={{ chores }}>
                        <Search />
                    </ChoreContext.Provider>
                </AuthProvider>
            </BrowserRouter>
        );

        const searchBtn = await screen.findByText(/search/i);
        fireEvent.click(searchBtn);

        const serchInput = screen.getByRole("textbox");

        await user.type(serchInput, "search params");
        expect(serchInput).toHaveValue("search params");
    });

    test('Clear button works', async () => {
        const chores = ['chores'];

        render(
            <BrowserRouter>
                <AuthProvider>
                    <ChoreContext.Provider value={{ chores }}>
                        <Search />
                    </ChoreContext.Provider>
                </AuthProvider>
            </BrowserRouter>
        );

        const searchBtn = await screen.findByText(/search/i);
        fireEvent.click(searchBtn);

        const clearBtn = await screen.findByText(/clear/i);
        fireEvent.click(clearBtn);

        const serchInput = screen.getByRole("textbox");
        expect(serchInput).toHaveValue("");
    });
});