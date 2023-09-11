import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from '../../contexts/AuthContext';

import { About } from './About';

describe('Testing the About Component', () => {
    test('show heading', () => {
        render(
            <BrowserRouter>
                <AuthProvider>
                    <About />
                </AuthProvider>
            </BrowserRouter>
        );
        const heading = screen.getByRole("heading", { name: "About" });

        expect(heading).toBeInTheDocument();
    });

    test('Back To Choreminder link works', async () => {
        render(
            <BrowserRouter>
                <AuthProvider>
                    <About />
                </AuthProvider>
            </BrowserRouter>
        );

        const backBtn = await screen.findByText(/back/i);
        fireEvent.click(backBtn);

        const currentUrlPath = global.window.location.pathname;
        expect(currentUrlPath).toContain(`/`);
    });
});