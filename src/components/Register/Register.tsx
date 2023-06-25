import { useContext } from 'react';

import { AuthContext } from '../../contexts/AuthContext';

export const Register = () => {
    const { authFormValueChangeHandler, onAuthSubmit } = useContext(AuthContext);

    return (
        <main>
            <form action="post" onSubmit={e => onAuthSubmit(e)}>

                {/* Email */}
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" name="email" onChange={authFormValueChangeHandler} />
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" onChange={authFormValueChangeHandler} />
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="rePass">Repeat password:</label>
                    <input type="password" id="rePass" name="rePass" onChange={authFormValueChangeHandler} />
                </div>

                {/* Submit Button */}

                <div>
                    <input type="submit" value="Register" />
                </div>

            </form>
        </main>
    );
};