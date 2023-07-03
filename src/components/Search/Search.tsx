import { useContext } from "react";

import { ChoreContext } from "../../contexts/ChoreContext";

export const Search = () => {
    const { searchChores, searchPhrase, clear } = useContext(ChoreContext);

    return (
        <section>
            <div>
                <form action="post">
                    <input
                        type="text"
                        placeholder="Search by chore name"
                        value={searchPhrase}
                        onChange={searchChores}
                    />

                    <button onClick={clear}>Clear</button>
                </form>
            </div>
        </section>
    );
};