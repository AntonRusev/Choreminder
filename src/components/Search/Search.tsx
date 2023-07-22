import { memo, useContext, useEffect, useState } from "react";

import { useClickOutside } from "../../hooks/useClickOutside";
import * as choreService from '../../services/choreService';
import { AuthContext } from "../../contexts/AuthContext";
import { ChoreContext } from "../../contexts/ChoreContext";

import style from './Search.module.scss';

const Search = () => {
    const [searchPhrase, setSearchPhrase] = useState('');
    const [showSearchbar, setShowSearchbar] = useState(false);

    const { chores, setChores } = useContext(ChoreContext);
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        if (chores.length > 1) {
            searchChores(searchPhrase);
        }
    }, [searchPhrase]);

    useEffect(() => {
        if (searchPhrase === '') {
            resetSearch();
        }
    }, [searchPhrase]);

    

    const resetSearch = () => {
        choreService.getAll(auth._id)
            .then(result => {
                setChores([...result]);
            })
            .catch(error => console.log(error));
    };

    // Toggle the searchbar
    const toggleSearch = () => {
        setShowSearchbar(!showSearchbar);
    };

    // Close on click outside the menu
    const domNode = useClickOutside(() => {
        setShowSearchbar(false);
    });

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
        setChores(matched);
    };

    // Clearing the search param
    const clear = (e: any) => {
        e.preventDefault();

        setSearchPhrase('');
        resetSearch();
    };

    return (
        <div ref={domNode} className={style.search}>
            <div
                onClick={() => toggleSearch()}
                className={style.crudBtn}
            >
                <span className={style.tooltip}>Search</span>
                <span>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </span>
            </div>

            {showSearchbar
                ?
                <div>
                    <form className={style.searchForm} action="post">
                        <input
                            type="text"
                            className={style.searchbar}
                            placeholder="Enter name..."
                            value={searchPhrase}
                            onChange={onSearchInput}
                        />

                        <button
                            className={style.searchBtn}
                            onClick={clear}
                        >
                            Clear
                        </button>
                    </form>
                </div>
                :
                ''
            }

        </div>
    );
};

export default memo(Search);