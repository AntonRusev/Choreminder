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
                        className={`${style.form} ${style.animate}`}
                        onSubmit={e => onSubmit(e)}
                    >

                        {/* Chore Name */}
                        <div>
                            <label htmlFor="name">Name:</label>
                            <input type="text"
                                id="name"
                                name="name"
                                placeholder="Test"
                                value={formValues.name}
                                onChange={formValueChangeHandler}
                                onBlur={validateForm}
                            />
                        </div>

                        {/* Validation Error */}
                        <p>
                            {(formErrors.name) ? `${formErrors.name}` : ''}
                        </p>

                        {/* Chore cycle timer */}
                        <div>
                            <label htmlFor="days">Days:</label>
                            <input type="number"
                                id="days"
                                name="days"
                                placeholder="2"
                                value={formValues.days}
                                onChange={formValueChangeHandler}
                                onBlur={validateForm}
                            />

                            {/* Validation Error */}
                            <p>
                                {(formErrors.days) ? `${formErrors.days}` : ''}
                            </p>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <input type="submit" name='submit' value="Create" disabled={disabled} />
                            <button onClick={() => toggleCreate()}>Cancel</button>
                        </div>
                    </form>
                    :
                    <button className={`${style.addBtn} ${style.animate}`} onClick={() => toggleCreate()}>Add new chore.</button>
            }
        </main>
    );
};

export default memo(CreateChore);