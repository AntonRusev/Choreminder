import { Link } from 'react-router-dom';

import style from './About.module.scss';

export const About = () => {
    return (
        <main className={style.about}>
            <h2>About</h2>

            <div className={style.info}>
                <p>
                    With CHOREMINDER you can keep track of various chores.
                </p>
                <p>
                    Because chores are personal for each individual user, in order to be able to add chores, you have to make an account, or if you already have one, to login.
                </p>
                <p>
                    Once logged in, you can add chores and set a countdown timer indicating when is every individual chore supposed to be completed next time.
                </p>
                <p>
                    For instance, if you clean your fish tank every couple of weeks, you can set the timer to 14 days. This way you no longer need to remember when was the last time you cleaned it, or when is the next cleaning due. The application will show you when you started the chore timer, when it is about to complete, and how long till then.
                </p>
                <p>
                    You can reset your chores at any time, deactivate and later activate them again, or completely delete them.
                </p>
                <p>
                    Give it a try, it's easy!</p>
            </div>

            <Link className={style.basicBtn} to='/'>Back to CHOREMINDER</Link>
        </main>
    );
};