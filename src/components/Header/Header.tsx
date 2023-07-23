import { memo, useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

import style from './Header.module.scss';
import { Profile } from '../Profile/Profile';

const Header = () => {
    const { auth } = useContext(AuthContext);

    return (
        <header className={style.header}>
            <Link to='/'><h1>ChoreMinder</h1></Link>

            <nav className={style.nav}>
                <ul className={style.list}>
                    <li><Link to='/about'>ABOUT</Link></li>
                    {auth._id
                        ?
                        // Logged in user
                        <Profile />
                        :
                        // Guest
                        <li>
                            <Link to='/login'>LOGIN</Link>
                            <span>/</span>
                            <Link to='/register'>SIGN UP</Link>
                        </li>
                    }
                </ul>
            </nav>
        </header>
    );
};

export default memo(Header);