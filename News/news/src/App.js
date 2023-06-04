import { Routes, Route } from 'react-router-dom';
import DefautLayout from './component/DefautLayout';
import LayoutHome from './component/LayoutHome';
import Home from './page/Home';
import Contact from './page/Contact';
import Register from './page/UserAction/component/Register';
import LayoutTopic from './component/LayoutTopic';
import TopicNews from  '~/page/TopicNews'
import NewsDetail from './page/NewsDetail';
import UserAction from './page/UserAction';
import Admin from './page/Admin';
import AccManager from './page/UserAction/component/AccManager';
import SearchResult from '~/page/SearchResult'
import Update from '~/page/Admin/component/FormEdit'
import user from '~/untils/getUserInfo'

function App() {
    console.log(user);
    return (
        <div className="App">
            <Routes>
                {/* home */}
                <Route
                    path="/"
                    element={
                        <LayoutHome>
                            <Home />
                        </LayoutHome>
                    }
                ></Route>

                {/* topic news */}
                <Route
                    path="/topicNews/:name/:page/:id"
                    element={
                        <LayoutTopic>
                            <TopicNews />
                        </LayoutTopic>
                    }
                ></Route>
                {/* search */}
                <Route
                    path="/news/search/q=:q"
                    element={
                        <LayoutTopic>
                            <SearchResult />
                        </LayoutTopic>
                    }
                ></Route>

                {/* news detail */}
                <Route
                    path="/newsDetail/:id"
                    element={
                        <LayoutTopic>
                            <NewsDetail />
                        </LayoutTopic>
                    }
                ></Route>

                {/* contact */}
                <Route
                    path="/contact"
                    element={
                        <DefautLayout>
                            <Contact />
                        </DefautLayout>
                    }
                ></Route>

                {/* login */}
                <Route
                    path="/admin"
                    element={
                        <DefautLayout>
                            <Admin />
                        </DefautLayout>
                    }
                ></Route>

                <Route
                    path="/update/:id"
                    element={
                        <DefautLayout>
                            <Update />
                        </DefautLayout>
                    }
                ></Route>

                {/* register */}
                <Route
                    path="/register"
                    element={
                        <DefautLayout>
                            <Register />
                        </DefautLayout>
                    }
                ></Route>
                
                {/* login-register */}
                <Route
                    path="/userAction/:name"
                    element={
                        <LayoutTopic>
                            <UserAction />
                        </LayoutTopic>
                    }
                ></Route>
                {/* acc manager */}
                <Route
                    path="/accManager/:name"
                    element={
                        <LayoutTopic>
                            <AccManager />
                        </LayoutTopic>
                    }
                ></Route>

            </Routes>
        </div>
    );
}

export default App;
