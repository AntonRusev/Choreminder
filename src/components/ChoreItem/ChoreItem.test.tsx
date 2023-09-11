import '@testing-library/jest-dom';
import { describe, test, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from '../../contexts/AuthContext';
import { ConfirmContext } from '../../contexts/ConfirmContext';

import ChoreItem from './ChoreItem';

describe('Testing the ChoreItem Component', () => {
    test('show props', () => {
        const chore = {
            _id: 'id',
            name: 'chorename',
            days: 14,
            img: 'image',
            startDate: 'start',
            endDate: 'end',
            isActive: true,
        };

        render(
            <BrowserRouter>
                <AuthProvider>
                    <ChoreItem {... { ...chore }} />
                </AuthProvider>
            </BrowserRouter>
        );

        expect(screen.getByText(/chorename/i)).toBeInTheDocument();
        expect(screen.getByText(/14/i)).toBeInTheDocument();
    });

    test('show CRUD buttons if ChoreItem is clicked', () => {
        const chore = {
            _id: 'id',
            name: 'chorename',
            days: 14,
            img: 'image',
            startDate: 'start',
            endDate: 'end',
            isActive: true,
        };

        render(
            <BrowserRouter>
                <AuthProvider>
                    <ChoreItem {... { ...chore }} />
                </AuthProvider>
            </BrowserRouter>
        );

        const choreItem = screen.getByRole("listitem");
        fireEvent.click(choreItem);

        expect(screen.getByText(/reset/i)).toBeInTheDocument();
        expect(screen.getByText(/stop/i)).toBeInTheDocument();
        expect(screen.getByText(/delete/i)).toBeInTheDocument();

        expect(screen.queryByText(/activate/i)).toBeNull();
    });

    test('doesn\'t show CRUD buttons if ChoreItem is not clicked', () => {
        const chore = {
            _id: 'id',
            name: 'chorename',
            days: 14,
            img: 'image',
            startDate: 'start',
            endDate: 'end',
            isActive: true,
        };

        render(
            <BrowserRouter>
                <AuthProvider>
                    <ChoreItem {... { ...chore }} />
                </AuthProvider>
            </BrowserRouter>
        );

        expect(screen.queryByText(/reset/i)).toBeNull();
        expect(screen.queryByText(/stop/i)).toBeNull();
        expect(screen.queryByText(/delete/i)).toBeNull();
        expect(screen.queryByText(/activate/i)).toBeNull();
    });

    test('Reset button works', () => {
        const chore = {
            _id: 'id',
            name: 'chorename',
            days: 14,
            img: 'image',
            startDate: 'start',
            endDate: 'end',
            isActive: true,
        };
        const confirmData = { action: 'some action'};
        const onActivateConfirm = vi.fn();

        render(
            <BrowserRouter>
                <AuthProvider>
                    <ConfirmContext.Provider value={{ onActivateConfirm, confirmData }}>
                        <ChoreItem {... { ...chore }} />
                    </ConfirmContext.Provider>
                </AuthProvider>
            </BrowserRouter>
        );

        const choreItem = screen.getByRole("listitem");
        fireEvent.click(choreItem);

        const resetBtn = screen.getByText(/reset/i);
        fireEvent.click(resetBtn);

        expect(onActivateConfirm).toHaveBeenCalledTimes(1);
    });

    test('Stop button works', () => {
        const chore = {
            _id: 'id',
            name: 'chorename',
            days: 14,
            img: 'image',
            startDate: 'start',
            endDate: 'end',
            isActive: true,
        };
        const confirmData = { action: 'some action'};
        const onActivateConfirm = vi.fn();

        render(
            <BrowserRouter>
                <AuthProvider>
                    <ConfirmContext.Provider value={{ onActivateConfirm, confirmData }}>
                        <ChoreItem {... { ...chore }} />
                    </ConfirmContext.Provider>
                </AuthProvider>
            </BrowserRouter>
        );

        const choreItem = screen.getByRole("listitem");
        fireEvent.click(choreItem);

        const stopBtn = screen.getByText(/stop/i);
        fireEvent.click(stopBtn);

        expect(onActivateConfirm).toHaveBeenCalledTimes(1);
    });

    test('Delete button works', () => {
        const chore = {
            _id: 'id',
            name: 'chorename',
            days: 14,
            img: 'image',
            startDate: 'start',
            endDate: 'end',
            isActive: true,
        };
        const confirmData = { action: 'some action'};
        const onActivateConfirm = vi.fn();

        render(
            <BrowserRouter>
                <AuthProvider>
                    <ConfirmContext.Provider value={{ onActivateConfirm, confirmData }}>
                        <ChoreItem {... { ...chore }} />
                    </ConfirmContext.Provider>
                </AuthProvider>
            </BrowserRouter>
        );

        const choreItem = screen.getByRole("listitem");
        fireEvent.click(choreItem);

        const deleteBtn = screen.getByText(/delete/i);
        fireEvent.click(deleteBtn);

        expect(onActivateConfirm).toHaveBeenCalledTimes(1);
    });

    test('Activate button is rendered and works properly', () => {
        const chore = {
            _id: 'id',
            name: 'chorename',
            days: 14,
            img: 'image',
            startDate: 'start',
            endDate: 'end',
            isActive: false,
        };
        const confirmData = { action: 'some action'};
        const onActivateConfirm = vi.fn();

        render(
            <BrowserRouter>
                <AuthProvider>
                    <ConfirmContext.Provider value={{ onActivateConfirm, confirmData }}>
                        <ChoreItem {... { ...chore }} />
                    </ConfirmContext.Provider>
                </AuthProvider>
            </BrowserRouter>
        );

        const deleteBtn = screen.getByText(/activate/i);
        fireEvent.click(deleteBtn);

        expect(onActivateConfirm).toHaveBeenCalledTimes(1);
    });
});