import { Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { ChoreProvider } from './contexts/ChoreContext';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import { Footer } from './components/Footer/Footer';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Logout } from './components/Logout/Logout';
import { ConfirmProvider } from './contexts/ConfirmContext';
import { About } from './components/About/About';
import { GuestRouteGuard, UserRouteGuard } from './components/common/RouteGuard';

import './App.scss';

function App() {
    return (
        <>
            <AuthProvider>
                <ChoreProvider>
                    <ConfirmProvider>
                        <Header />
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/about' element={<About />} />

                            <Route element={<UserRouteGuard />}>
                                <Route path='/login' element={<Login />} />
                                <Route path='/register' element={<Register />} />
                            </Route>

                            <Route element={<GuestRouteGuard />}>
                                <Route path='/logout' element={<Logout />} />
                            </ Route>

                            <Route path='*' element={<Navigate to="/" replace />} />
                        </Routes>
                        <Footer />
                    </ConfirmProvider>
                </ChoreProvider>
            </AuthProvider>
        </>
    );
};

export default App;
