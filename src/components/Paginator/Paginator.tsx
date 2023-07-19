import { memo, useContext, useEffect, useState } from "react";

import { ChoreContext } from "../../contexts/ChoreContext";

import style from './Paginator.module.scss';

const Paginator = () => {
    const [page, setPage] = useState({
        currentPage: 0,
        resultsShown: 5,
        maxPages: 0
    });

    const { displayChores, chores } = useContext(ChoreContext);

    useEffect(() => {
        if (chores.length > 0) {
            displayChores(chores, page);
            pageLimit(chores);
        };
    }, [chores]);

    useEffect(() => {
        displayChores(chores, page);
    }, [page]);

    // On changing page
    const changePage = (e: any) => {
        e.preventDefault();

        const direction = e.target.id;

        if (direction === 'next') {
            setPage({ ...page, currentPage: ++page.currentPage, resultsShown: page.resultsShown });
        } else if (direction === 'back') {
            setPage({ ...page, currentPage: --page.currentPage, resultsShown: page.resultsShown });
        }
    };

    // Setting page limit
    const pageLimit = (chores: any) => {
        const overallResults = chores.length;
        const maxPages = Math.ceil(overallResults / page.resultsShown);

        setPage({ ...page, maxPages });
    };

    return (
        <section className={style.paginator}>
            <div className={style.btnHolder}>
                {page.currentPage > 0

                    ?
                    <div
                        onClick={changePage}
                        className={style.crudBtn}
                    >
                        <span className={style.tooltip}>Previous</span>
                        <span>
                            <i id="back" className="fa-solid fa-chevron-left"></i>
                        </span>
                    </div>
                    :
                    <p></p>
                }

                <span className={style.pageNumber}> Page: {page?.currentPage + 1} </span>

                {page.currentPage < page.maxPages - 1
                    ?
                    <div
                        onClick={changePage}
                        className={style.crudBtn}
                    >
                        <span className={style.tooltip}>Next</span>
                        <span>
                            <i id="next" className="fa-solid fa-chevron-right"></i>
                        </span>
                    </div>
                    :
                    <p></p>
                }
            </div>
        </section >
    );
};

export default memo(Paginator);