import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from '../../contexts/AuthContext';

import Header from './Header';

describe('Testing the Contact Component', () => {
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
});