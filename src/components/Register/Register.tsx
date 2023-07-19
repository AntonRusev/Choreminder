import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import { useForm } from '../../hooks/useForm';

import style from './Register.module.scss';

export const Register = () => {
    const { onAuthSubmit } = useContext(AuthContext);


    const { onSubmit, formValues, formErrors, disabled, formValueChangeHandler, validateForm } = useForm({
        email: '',
        password: '',
        rePass: '',
    }, onAuthSubmit);

    return (
        <main className={style.register}>
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
                    <p>
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
                    <p>
                        {(formErrors.password) ? `${formErrors.password}` : ''}
                    </p>
                </div>

                {/* Repeat Password */}
                <div className={style.inputGroup}>
                    <input
                        type="password"
                        id="rePass"
                        name="rePass"
                        className={
                            formValues.rePass.length > 0
                                ? `${style.active}`
                                : ''
                        }
                        value={formValues.rePass}
                        onChange={formValueChangeHandler}
                        onBlur={validateForm}
                    />
                    <label htmlFor="rePass">Repeat password:</label>

                    {/* Validation Error */}
                    <p>
                        {(formErrors.rePass) ? `${formErrors.rePass}` : ''}
                    </p>
                </div>

                {/* Submit Button */}
                <div className={style.btnHolder}>
                    <input
                        type="submit"
                        name='submit'
                        className={style.basicBtn}
                        value="Sign Up"
                        disabled={disabled}
                    />

                    <Link className={style.basicBtn} to='/'>Cancel</Link>
                </div>

                <span>Already have an account? </span>
                <Link to='/login'>Login</Link>
            </form>
        </main>
    );
};