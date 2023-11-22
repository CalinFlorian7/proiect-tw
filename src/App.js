// import HelloMessage from './components/helloMessage.js'
// // import './App.css';
import Navbar from './components/Navbar.js'
import Home from './pages/Home.js'
import Groups from './pages/Groups.js'
import Profile from './pages/Profile.js'
import MyStuff from './pages/MyStuff.js'
import Settings from './pages/Settings.js'
// import SignOff from './pages/SignOff.js'
import LogIn from './pages/LogIn.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
    return (
        <div className="App">
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" Component={LogIn} />
                    <Route path="/Home" Component={Home} />
                    <Route path="/MyStuff" Component={MyStuff} />
                    <Route path="/Groups" Component={Groups} />
                    <Route path="/Profile" Component={Profile} />
                    <Route path="/Settings" Component={Settings} />
                    <Route path="/LogIn" Component={LogIn} />
                </Routes>
            </Router>
        </div>
    )
}

export default App
