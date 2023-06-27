import { useContext } from "react";

import { ChoreList } from "../ChoresList/ChoresList";
import { CreateChore } from "../CreateChore/CreateChore";

import { AuthContext } from '../../contexts/AuthContext';

export const Home = () => {
    const { auth } = useContext(AuthContext);

    return (
        <main>
            {auth._id
                ?
                <>
                    <ChoreList />
                    <CreateChore />
                </>
                :
                <p> Login and Regiser </p>
            }

        </main>
    );
};