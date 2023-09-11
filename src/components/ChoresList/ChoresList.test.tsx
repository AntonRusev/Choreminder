import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from '../../contexts/AuthContext';
import { ChoreContext } from '../../contexts/ChoreContext';

import ChoresList from './ChoresList';

describe('Testing the ChoresList Component', () => {
    test('doesn\'t show "No Chores" message if chores are provided', async () => {
        const chores = ['chores'];
        const displayedChores = ['chore'];

        render(
            <BrowserRouter>
                <AuthProvider>
                    <ChoreContext.Provider value={{ chores, displayedChores }}>
                        <ChoresList />
                    </ChoreContext.Provider>
                </AuthProvider>
            </BrowserRouter>
        );

        expect(screen.queryByText(/no chores/i)).toBeNull();
    });

    test('renders proper list of chores', async () => {
        const chores = ['chores'];
        const displayedChores = ['chore', 'two', 'three'];

        render(
            <BrowserRouter>
                <AuthProvider>
                    <ChoreContext.Provider value={{ chores, displayedChores }}>
                        <ChoresList />
                    </ChoreContext.Provider>
                </AuthProvider>
            </BrowserRouter>
        );

        const choreItems = screen.getAllByRole("listitem");
        expect(choreItems.length).toBe(3);
    });

    test('shows "No Chores" message if no chores are provided', async () => {
        const chores = [] as any;

        render(
            <BrowserRouter>
                <AuthProvider>
                    <ChoreContext.Provider value={{ chores }}>
                        <ChoresList />
                    </ChoreContext.Provider>
                </AuthProvider>
            </BrowserRouter>
        );

        expect(screen.queryByText(/no chores/i)).toBeInTheDocument();
    });
});