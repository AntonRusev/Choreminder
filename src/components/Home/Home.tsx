import { useContext } from "react";

import { ChoreList } from "../ChoresList/ChoresList";
import { CreateChore } from "../CreateChore/CreateChore";

import { AuthContext } from '../../contexts/AuthContext';
import { Search } from "../Search/Search";
import { Paginator } from "../Paginator/Paginator";
import { SortChores } from "../SortChores/SortChores";

export const Home = () => {
    const { auth } = useContext(AuthContext);

    return (
        <main>
            {auth._id
                ?
                <>
                    <Search />
                    <SortChores />
                    <ChoreList />
                    <CreateChore />
                    <Paginator />
                </>
                :
                <p> Login and Regiser </p>
            }

        </main>
    );
};