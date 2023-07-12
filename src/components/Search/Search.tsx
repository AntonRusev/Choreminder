import { useContext, useState } from "react";

import { ChoreContext } from "../../contexts/ChoreContext";

export const Search = () => {
    const [searchPhrase, setSearchPhrase] = useState('');
    
    const { setDisplayedChores, displayChores, chores} = useContext(ChoreContext);

    const searchChores = (e: any) => {
        e.preventDefault();

        setSearchPhrase(e.target.value);

        const matched = chores.filter((e: any) => {
            return e.name
                .toLowerCase()
                .includes(searchPhrase.toLowerCase())
        });

        displayChores(matched);
    };

    const clear = (e: any) => {
        e.preventDefault();

        setSearchPhrase('');
        setDisplayedChores(chores);
    };

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