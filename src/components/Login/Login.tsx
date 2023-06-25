import { useContext } from 'react';

import { AuthContext } from '../../contexts/AuthContext';

export const Login = () => {
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

                {/* Submit Button */}

                <div>
                    <input type="submit" value="Login" />
                </div>

            </form>
        </main>
    );
};