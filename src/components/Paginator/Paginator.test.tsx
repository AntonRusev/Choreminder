import '@testing-library/jest-dom';
import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from '../../contexts/AuthContext';
import { ChoreContext } from '../../contexts/ChoreContext';

import Paginator from './Paginator';

describe('Testing the Paginator Component', () => {
    test('show Page 1', () => {
        const chores = ['chores'];
        const displayChores = vi.fn();

        render(
            <BrowserRouter>
                <AuthProvider>
                    <ChoreContext.Provider value={{ chores, displayChores }}>
                        <Paginator />
                    </ChoreContext.Provider>
                </AuthProvider>
            </BrowserRouter>
        );

        expect(screen.getByText(/page/i)).toBeInTheDocument();
        expect(screen.getByText(/1/i)).toBeInTheDocument();
        expect(screen.queryByText(/next/i)).toBeNull();
        expect(screen.queryByText(/previous/i)).toBeNull();
    });

    test('show Next Page button', () => {
        const chores = ['chores', 'chores', 'chores', 'chores', 'chores', 'chores'];
        const displayChores = vi.fn();

        render(
            <BrowserRouter>
                <AuthProvider>
                    <ChoreContext.Provider value={{ chores, displayChores }}>
                        <Paginator />
                    </ChoreContext.Provider>
                </AuthProvider>
            </BrowserRouter>
        );

        const nextBtn = screen.getByText(/next/i);
        expect(nextBtn).toBeInTheDocument();
    });
});