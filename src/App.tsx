import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { CreateChore } from './components/CreateChore/CreateChore';
import { Footer } from './components/Footer/Footer';

import { ChoreProvider } from './contexts/ChoreContext';

import './App.scss';

function App() {

    return (
        <>
            <ChoreProvider>
                <Header />
                <Home />
                <CreateChore />
                <Footer />
            </ChoreProvider>
        </>
    );
};

export default App;
