import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

import style from './Header.module.scss';

export const Header = () => {
    const { auth } = useContext(AuthContext);

    return (
        <header className={style.header}>
            <Link to='/'><h1>ChoreMinder</h1></Link>
            <nav className={style.nav}>
                <ul className={style.list}>
                    {auth._id ? <li><Link to='/logout'>LOGOUT</Link></li> : ''}
                </ul>
            </nav>
        </header>
    );
};