import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import { useForm } from '../../hooks/useForm';

import style from './Login.module.scss';
import { Alert } from '../Alert/Alert';
import { AlertContext } from '../../contexts/AlertContext';

export const Login = () => {
    const { onAuthSubmit } = useContext(AuthContext);
    const { isAlertActive } = useContext(AlertContext);

    const { onSubmit, formValues, formErrors, disabled, formValueChangeHandler, validateForm } = useForm({
        email: '',
        password: '',
    }, onAuthSubmit);

    return (
        <main className={style.login}>
            <form action="post" onSubmit={e => onSubmit(e)}>

                {/* Email */}
                <div className={style.inputGroup}>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        className={
                            formValues.email.length > 0
                                ? `${style.active}`
                                : ''
                        }
                        value={formValues.email}
                        onChange={formValueChangeHandler}
                        onBlur={validateForm}
                    />
                    <label htmlFor="email">Email:</label>

                    {/* Validation Error */}
                    <p className={style.validate}>
                        {(formErrors.email) ? `${formErrors.email}` : ''}
                    </p>
                </div>


                {/* Password */}
                <div className={style.inputGroup}>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className={
                            formValues.password.length > 0
                                ? `${style.active}`
                                : ''
                        }
                        value={formValues.password}
                        onChange={formValueChangeHandler}
                        onBlur={validateForm}
                    />
                    <label htmlFor="password">Password:</label>

                    {/* Validation Error */}
                    <p className={style.validate}>
                        {(formErrors.password) ? `${formErrors.password}` : ''}
                    </p>
                </div>

                {/* Submit Button */}
                <div className={style.btnHolder}>
                    <input
                        type="submit"
                        name='submit'
                        className={style.basicBtn}
                        value="Login"
                        disabled={disabled}
                    />

                    <Link className={style.basicBtn} to='/'>Cancel</Link>
                </div>

                <span>Don't have an account?</span>
                <Link to='/register'>Sign up</Link>
            </form>

            {/* Alert Window */}
            {isAlertActive && <Alert />}
        </main>
    );
};