import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from '../../contexts/AuthContext';

import  SortChores  from './SortChores';

describe('Testing the SortChores Component', () => {
    test('show Sort By button', async () => {
        render(
            <BrowserRouter>
                <AuthProvider>
                    <SortChores />
                </AuthProvider>
            </BrowserRouter>
        );

        expect(screen.getByText(/sort/i)).toBeInTheDocument();
    });

    test('show sorting options after clicking Sort By button', async () => {
        render(
            <BrowserRouter>
                <AuthProvider>
                    <SortChores />
                </AuthProvider>
            </BrowserRouter>
        );

        const sortBy = await screen.findByText(/sort/i);
        fireEvent.click(sortBy);

        expect(screen.getByText(/sort by name/i)).toBeInTheDocument();
        expect(screen.getByText(/sort by days/i)).toBeInTheDocument();
        expect(screen.getByText(/sort by start of timer/i)).toBeInTheDocument();
        expect(screen.getByText(/sort by remaining time/i)).toBeInTheDocument();
    });
});