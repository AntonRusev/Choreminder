import { useContext } from "react";

import { ChoreList } from "../ChoresList/ChoresList";
import { CreateChore } from "../CreateChore/CreateChore";

import { AuthContext } from '../../contexts/AuthContext';
import { Search } from "../Search/Search";

export const Home = () => {
    const { auth } = useContext(AuthContext);

    return (
        <main>
            {auth._id
                ?
                <>
                    <Search />
                    <ChoreList />
                    <CreateChore />
                </>
                :
                <p> Login and Regiser </p>
            }

        </main>
    );
};