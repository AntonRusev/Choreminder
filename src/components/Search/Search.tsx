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
                ?
                <div>
                    <div
                        onClick={() => toggleSearch()}
                        className={style.crudBtn}
                    >
                        <span className={style.tooltip}>Close</span>
                        <span>
                            <i className="fa-regular fa-circle-xmark"></i>
                        </span>
                    </div>

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
                :
                <div
                    onClick={() => toggleSearch()}
                    className={style.crudBtn}
                >
                    <span className={style.tooltip}>Search</span>
                    <span>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </span>
                </div>
            }

        </div>
    );
};

export default memo(Search);