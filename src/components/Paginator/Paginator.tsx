import { useContext, useEffect, useState } from "react";

import { ChoreContext } from "../../contexts/ChoreContext";

export const Paginator = () => {
    const [page, setPage] = useState({
        currentPage: 0,
        resultsShown: 5
    });
    const [pagesLimit, setPagesLimit] = useState({
        maxPages: 0,
        overallResults: 0
    });

    const { displayChores, chores } = useContext(ChoreContext);

    useEffect(() => {
        if (chores.length > 0) {
            displayChores(chores, page, pagesLimit);

            pageLimit(chores);
        };
    }, [chores]);

    useEffect(() => {
        displayChores(chores, page, pagesLimit);
    }, [page]);


    const changePage = (e: any) => {
        e.preventDefault();

        const direction = e.target.name;

        if (direction === 'next') {
            setPage({ currentPage: ++page.currentPage, resultsShown: page.resultsShown });
        } else if (direction === 'back') {
            setPage({ currentPage: --page.currentPage, resultsShown: page.resultsShown });
        }
    };

    // Set page limit

    const pageLimit = (chores: any) => {
        const overallResults = chores.length;
        const maxPages = Math.ceil(overallResults / page.resultsShown);

        setPagesLimit({ maxPages, overallResults });
    };

    return (
        <section>
            <div>
                {page.currentPage > 0
                    ? <button name="back" onClick={changePage}> -Back </button>
                    : <p></p>
                }
                <span> Page: {page?.currentPage + 1} </span>

                {page.currentPage < pagesLimit.maxPages - 1
                    ? <button name="next" onClick={changePage}> Next- </button>
                    : <p></p>
                }
            </div>
        </section>
    );
};