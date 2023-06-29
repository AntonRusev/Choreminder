import { useContext } from "react";

import { ChoreContext } from "../../contexts/ChoreContext";

import { useForm } from '../../hooks/useForm';

export const CreateChore = () => {
    const { onChoreCreate } = useContext(ChoreContext);

    const { onSubmit, formValues, formErrors, disabled, formValueChangeHandler, validateForm } = useForm({
        name: '',
        days: '',
    }, onChoreCreate);

    return (
        <main>
            <form action="post" onSubmit={e => onSubmit(e)}>

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

                {/* IMG link for picture @OPTIONAL */}
                {/* <div>
                    <label htmlFor="img">Image URL (Optional)</label>
                    <input type="text" id="img" name="img" onChange={formValueChangeHandler} />
                </div> */}

                {/* Submit Button */}
                <div>
                    <input type="submit" name='submit' value="Create" disabled={disabled} />
                </div>
            </form>
        </main>
    );
};