import { ChoreList } from "../ChoresList/ChoresList";
import { CreateChore } from "../CreateChore/CreateChore";

export const Home = () => {
    return (
        <main>
            <p>This will serve as both catalog for existing chores, if the user is logged in, and landing page with login and register links, for guest users</p>
            <ChoreList />
            <CreateChore />
        </main>
    );
};