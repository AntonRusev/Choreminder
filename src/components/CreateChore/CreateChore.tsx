import { memo, useContext, useState } from "react";

import { ChoreContext } from "../../contexts/ChoreContext";

import { useForm } from '../../hooks/useForm';

import style from './CreateChore.module.scss';

const CreateChore = () => {
    const { onChoreCreate } = useContext(ChoreContext);
    const [showCreate, setShowCreate] = useState(false);

    const { onSubmit, formValues, formErrors, disabled, formValueChangeHandler, validateForm } = useForm({
        name: '',
        days: '',
    }, onChoreCreate);

    // Toggle the create chore form
    const toggleCreate = () => {
        setShowCreate(!showCreate);
    };

    return (
        <main className={style.create}>
            {
                showCreate
                    ?
                    <form
                        action="post"
                        onSubmit={e => onSubmit(e)}
                    >

                        {/* Chore Name */}
                        <div className={style.inputGroup}>
                            <input type="text"
                                id="name"
                                name="name"
                                className={
                                    formValues.name.length > 0
                                        ? `${style.active}`
                                        : ''
                                }
                                value={formValues.name}
                                onChange={formValueChangeHandler}
                                onBlur={validateForm}
                            />
                            <label htmlFor="name">Name:</label>

                            {/* Validation Error */}
                            <p className={style.validate}>
                                {(formErrors.name) ? `${formErrors.name}` : ''}
                            </p>
                        </div>



                        {/* Chore cycle timer */}
                        <div className={style.inputGroup}>
                            <input type="number"
                                id="days"
                                name="days"
                                className={
                                    formValues.days.length > 0
                                        ? `${style.active}`
                                        : `${style.inputBig}`
                                }
                                value={formValues.days}
                                onChange={formValueChangeHandler}
                                onBlur={validateForm}
                            />
                            <label htmlFor="days">Days:</label>

                            {/* Validation Error */}
                            <p className={style.validate}>
                                {(formErrors.days) ? `${formErrors.days}` : ''}
                            </p>
                        </div>

                        {/* Submit Button */}
                        <div className={style.btnHolder}>
                            <input
                                type="submit"
                                name='submit'
                                className={style.basicBtn}
                                value="Create"
                                disabled={disabled}
                            />

                            <button
                                className={style.basicBtn}
                                onClick={() => toggleCreate()}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                    :
                    <div
                        onClick={() => toggleCreate()}
                        className={style.crudBtn}
                    >
                        <span className={style.tooltip}>New Chore</span>
                        <span>
                            <i className="fa-solid fa-plus"></i>
                            Add
                        </span>
                    </div>
            }
        </main>
    );
};

export default memo(CreateChore);