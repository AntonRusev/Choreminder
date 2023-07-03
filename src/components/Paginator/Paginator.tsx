import { useContext } from "react";

import { ChoreContext } from "../../contexts/ChoreContext";

export const Paginator = () => {
    const { changePage, page, pagesLimit } = useContext(ChoreContext);

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