import './App.css';
import Sidebar from './components/views/SideNav/SideBar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Overview from './components/views/Overview';
import { Reports, ReportsOne, ReportsTwo, ReportsThree } from './components/views/Reports';
import Team from './components/views/Team';

function App() {
    return (
        <Router>
            <Sidebar />
            <div className={'content'}>
                <Switch>
                    <Route path='/overview' exact component={Overview} />
                    <Route path='/reports' exact component={Reports} />
                    <Route path='/reports/reports1' exact component={ReportsOne} />
                    <Route path='/reports/reports2' exact component={ReportsTwo} />
                    <Route path='/reports/reports3' exact component={ReportsThree} />
                    <Route path='/team' exact component={Team} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
