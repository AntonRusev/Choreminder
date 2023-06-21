import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';

import './App.scss';
import { Home } from './components/Home/Home';
import { CreateChore } from './components/CreateChore/CreateChore';

function App() {

    return (
        <>
            <Header />
            <Home />
            <CreateChore />
            <Footer />
        </>
    );
};

export default App;
