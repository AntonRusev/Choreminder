import { Link } from 'react-router-dom';
import style from './About.module.scss';

export const About = () => {
    return (
        <main className={style.about}>
            <h2>About Page</h2>
            <Link to='/'>Return</Link>
        </main>
    );
};