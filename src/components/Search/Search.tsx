import { useContext, useEffect, useState } from "react";

import { ChoreContext } from "../../contexts/ChoreContext";

export const Search = () => {
    const [searchPhrase, setSearchPhrase] = useState('');

    const { displayChores, chores } = useContext(ChoreContext);

    useEffect(() => {
        if (chores.length > 1) {
            searchChores(searchPhrase);
        }
    }, [searchPhrase, chores]);

    const onSearchInput = (e: any) => {
        setSearchPhrase(e.target.value);
    };

    const searchChores = (searchPhrase: string) => {
        const matched = chores.filter((chore: any) => {
            return chore.name
                .toLowerCase()
                .includes(searchPhrase.toLowerCase())
        });

        displayChores(matched);
    };

    const clear = (e: any) => {
        e.preventDefault();

        setSearchPhrase('');
    };

    return (
        <section>
            <div>
                <form action="post">
                    <input
                        type="text"
                        placeholder="Search by chore name"
                        value={searchPhrase}
                        onChange={onSearchInput}
                    />

                    <button onClick={clear}>Clear</button>
                </form>
            </div>
        </section>
    );
};