import { Link } from "react-router-dom";

import style from './GuestScreen.module.scss';

export const GuestScreen = () => {

    return (
        <div className={style.guest}>
            <h1>
                Welcome!
            </h1>
            <p>
                In order to view your chores, <Link to='/login'>Login</Link> with your account.
            </p>
            <p>
                If you don't have an account yet, you can <Link to='/register'>Sign up</Link> here.
            </p>

            <p className={style.hint}>
                <h3>HINT:</h3>
                <p>
                    If you want to see some prepopulated chores, you can use one of the following accounts:
                </p>
                <div className={style.prepopulated}>
                    <div>
                        <p>
                            Email: <span>peter@abv.bg</span>
                        </p>
                        <p>
                            Password: <span>123456</span>
                        </p>
                    </div>
                    <div>
                        <p>
                            Email: <span>john@abv.bg</span>
                        </p>
                        <p>
                            Password:<span>123456</span>
                        </p>
                    </div>
                </div>

            </p>
        </div>
    );
};