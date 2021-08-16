import './App.css';
import Sidebar from './components/views/SideNav/SideBar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import {Halls} from "./components/views/Halls/Halls";
import {Rooms} from "./components/views/Rooms/Rooms";
import {Employees} from "./components/views/Employees/Employees";
import {RoomReservation} from "./components/views/Reservations/RoomReservations";
import {HallReservation} from "./components/views/Reservations/HallReservations";
import {Menus} from "./components/views/Restaurant/Menus";
import {Restaurants} from "./components/views/Restaurant/Restaurants";

function App() {
    return (
        <Router>
            <Sidebar />
            <div className={'content'}>
                <Switch>
                    <Route path='/halls' exact component={Halls} />
                    <Route path='/rooms' exact component={Rooms} />
                    <Route path='/reservations/rooms' exact component={RoomReservation} />
                    <Route path='/reservations/halls' exact component={HallReservation} />
                    <Route path='/restaurant/menus' exact component={Menus} />
                    <Route path='/restaurant/restaurants' exact component={Restaurants} />
                    <Route path='/employees' exact component={Employees} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
