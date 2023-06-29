import { useContext } from 'react';

import { AuthContext } from '../../contexts/AuthContext';

import { useForm } from '../../hooks/useForm';

export const Register = () => {
    const { onAuthSubmit } = useContext(AuthContext);


    const { onSubmit, formValues, formErrors, disabled, formValueChangeHandler, validateForm } = useForm({
        email: '',
        password: '',
        rePass: '',
    }, onAuthSubmit);

    return (
        <main>
            <pre>{JSON.stringify(formValues, undefined, 2)}</pre>

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
                        onBlur={validateForm} />

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
                        onBlur={validateForm} />

                    <p>
                        {(formErrors.password) ? `${formErrors.password}` : ''}
                    </p>
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="rePass">Repeat password:</label>
                    <input
                        type="password"
                        id="rePass"
                        name="rePass"
                        placeholder="Test"
                        value={formValues.rePass}
                        onChange={formValueChangeHandler}
                        onBlur={validateForm} />

                    <p>
                        {(formErrors.rePass) ? `${formErrors.rePass}` : ''}
                    </p>
                </div>

                {/* Submit Button */}

                <div>
                    <input type="submit" name='submit' value="Register" disabled={disabled} />
                </div>

            </form>
        </main>
    );
};