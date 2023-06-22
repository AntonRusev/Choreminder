import { useContext } from "react";

import { ChoreContext } from "../../contexts/ChoreContext";

export const CreateChore = () => {
    const { formValueChangeHandler, onChoreCreate } = useContext(ChoreContext);

    return (
        <main>
            <form action="post" onSubmit={e => onChoreCreate(e)}>

                {/* Chore Name */}
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" onChange={formValueChangeHandler} />
                </div>

                {/* Chore cycle timer */}
                <div>
                    <label htmlFor="time">Days:</label>
                    <input type="number" id="time" name="time" onChange={formValueChangeHandler} />
                </div>

                {/* IMG link for picture @OPTIONAL */}
                <div>
                    <label htmlFor="img">Image URL (Optional)</label>
                    <input type="text" id="img" name="img" onChange={formValueChangeHandler} />
                </div>

                {/* Submit Button */}

                <div>
                    <input type="submit" value="Create" />
                </div>

            </form>
        </main>
    );
};