import { useContext } from 'react';

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
                    <input type="text" id="email" name="email" value={formValues.email} onChange={formValueChangeHandler} onBlur={validateForm} />

                    <p>
                        {(formErrors.email) ? `${formErrors.email}` : ''}
                    </p>
                </div>


                {/* Password */}
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={formValues.password} onChange={formValueChangeHandler} onBlur={validateForm} />

                    <p>
                        {(formErrors.password) ? `${formErrors.password}` : ''}
                    </p>
                </div>

                {/* Submit Button */}

                <div>
                    <input type="submit" name='submit' value="Login" disabled={disabled} />
                </div>

            </form>
        </main>
    );
};