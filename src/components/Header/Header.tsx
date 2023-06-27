import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <header>
            <h1>ChoreMinder</h1>
            <nav>
                <ul>
                    <li><Link to='/'>HOME</Link></li>
                    <li><Link to='/login'>LOGIN</Link></li>
                    <li><Link to='/register'>REGISTER</Link></li>
                    <li><Link to='/logout'>LOGOUT</Link></li>
                </ul>
            </nav>
        </header>
    );
};