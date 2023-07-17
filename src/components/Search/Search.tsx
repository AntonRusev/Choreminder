import { memo, useContext, useEffect, useState } from "react";

import { ChoreContext } from "../../contexts/ChoreContext";

import style from './Search.module.scss';

const Search = () => {
    const [searchPhrase, setSearchPhrase] = useState('');
    const [showSearchbar, setShowSearchbar] = useState(false);

    const { displayChores, chores } = useContext(ChoreContext);

    useEffect(() => {
        if (chores.length > 1) {
            searchChores(searchPhrase);
        }
    }, [searchPhrase, chores]);

    // Toggle the searchbar
    const toggleSearch = () => {
        setShowSearchbar(!showSearchbar);
    };

    // On entering search param
    const onSearchInput = (e: any) => {
        setSearchPhrase(e.target.value);
    };

    // Comparing the search param to existing chores
    const searchChores = (searchPhrase: string) => {
        const matched = chores.filter((chore: any) => {
            return chore.name
                .toLowerCase()
                .includes(searchPhrase.toLowerCase())
        });

        displayChores(matched);
    };

    // Clearing the search param
    const clear = (e: any) => {
        e.preventDefault();

        setSearchPhrase('');
    };

    return (
        <div className={style.search}>

            {showSearchbar
                ? <div>
                    <button onClick={() => toggleSearch()}>Close</button>
                    <form className={style.searchbar} action="post">
                        <input
                            type="text"
                            placeholder="Search by chore name"
                            value={searchPhrase}
                            onChange={onSearchInput}
                        />

                        <button onClick={clear}>Clear</button>
                    </form>
                </div>
                : <button className={`${style.addBtn} ${style.animate}`} onClick={() => toggleSearch()}>Search</button>
            }

        </div>
    );
};

export default memo(Search);