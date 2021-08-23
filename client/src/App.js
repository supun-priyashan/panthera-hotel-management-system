import './App.css';
import Sidebar from './components/views/SideNav/SideBar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import {Halls} from "./components/views/Halls/Halls";
import {AddHall} from "./components/views/Halls/AddHall";
import {Rooms} from "./components/views/Rooms/Rooms";
import {AddRoom} from "./components/views/Rooms/AddRoom";
import {Employees} from "./components/views/Employees/Employees";
import {RoomReservation} from "./components/views/Reservations/RoomReservations";
import {HallReservation} from "./components/views/Reservations/HallReservations";
import {Menus} from "./components/views/Restaurant/Menus";
import {Restaurants} from "./components/views/Restaurant/Restaurants";

function App() {
    return (
        <Router>
            <Sidebar />
            <div>
                <Switch>
                    <Route path='/halls' exact component={Halls} />
                    <Route path='/halls/add-hall' exact component={AddHall} />
                    <Route path='/rooms' exact component={Rooms} />
                    <Route path='/rooms/add-room' exact component={AddRoom} />
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
