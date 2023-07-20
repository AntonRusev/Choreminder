import { memo, useContext } from "react";

import { AuthContext } from '../../contexts/AuthContext';

import ChoreList from "../ChoresList/ChoresList";
import CreateChore from "../CreateChore/CreateChore";
import Search from "../Search/Search";
import Paginator from "../Paginator/Paginator";
import SortChores from "../SortChores/SortChores";

import style from './Home.module.scss';
import { GuestScreen } from "../GuestScreen/GuestScreen";

const Home = () => {
    const { auth } = useContext(AuthContext);

    return (
        <main className={style.home}>
            {auth._id
                ?
                <section className={style.holder}>
                    <div className={style.sorting}>
                        <Search />
                        <SortChores />
                    </div>
                    <CreateChore />
                    <ChoreList />
                    <Paginator />
                </section>
                :
                <GuestScreen />
            }

        </main>
    );
};

export default memo(Home);