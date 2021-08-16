import logo from './logo.svg';
import './App.css';
import SideNav from "./components/views/SideNav/SideNav";
import {useState} from "react";

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="App">
            <div className="flex h-screen overflow-hidden">
                <SideNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            </div>
        </div>
    );
}

export default App;
