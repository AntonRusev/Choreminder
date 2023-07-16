import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

import { useForm } from '../../hooks/useForm';

export const Login = () => {
    const { onAuthSubmit } = useContext(AuthContext);

    const { onSubmit, formValues, formErrors, disabled, formValueChangeHandler, validateForm } = useForm({
        email: '',
        password: '',
    }, onAuthSubmit);

    return (
        <main>
            <form action="post" onSubmit={e => onSubmit(e)}>

                {/* Email */}
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Test"
                        value={formValues.email}
                        onChange={formValueChangeHandler}
                        onBlur={validateForm}
                    />

                    {/* Validation Error */}
                    <p>
                        {(formErrors.email) ? `${formErrors.email}` : ''}
                    </p>
                </div>


                {/* Password */}
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Test"
                        value={formValues.password}
                        onChange={formValueChangeHandler}
                        onBlur={validateForm}
                    />

                    {/* Validation Error */}
                    <p>
                        {(formErrors.password) ? `${formErrors.password}` : ''}
                    </p>
                </div>

                {/* Submit Button */}
                <div>
                    <input type="submit" name='submit' value="Login" disabled={disabled} />
                    <li><Link to='/'>Back</Link></li>
                </div>
            </form>
        </main>
    );
};