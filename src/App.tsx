import { Routes, Route } from 'react-router-dom';

import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { Footer } from './components/Footer/Footer';

import { AuthProvider } from './contexts/AuthContext';
import { ChoreProvider } from './contexts/ChoreContext';

import './App.scss';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Logout } from './components/Logout/Logout';

function App() {

    return (
        <>
            <AuthProvider>
                <ChoreProvider>
                    <Header />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/logout' element={<Logout />} />
                    </Routes>
                    <Footer />
                </ChoreProvider>
            </AuthProvider>
        </>
    );
};

export default App;
