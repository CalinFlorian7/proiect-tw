// // import './App.css';
import Navbar from './components/Navbar.js'
import Home from './pages/Home.js'
import Groups from './pages/Groups.js'
import Profile from './pages/Profile.js'
import MyStuff from './pages/MyStuff.js'
import Settings from './pages/Settings.js'
import ProtectedRoutes from './ProtectedRoutes.js'
import LogIn from './pages/LogIn.js'
import RestrictedNavbar from './components/RestrictedNavbar.js'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom'

function App() {
    return (
        <div className="App">
            <Router>
                <RestrictedNavbar>
                    <Navbar />
                </RestrictedNavbar>

                <Routes>
                    <Route path="/" Component={LogIn} />
                    {/* <Route path="/LogIn" Component={LogIn} /> */}
                    <Route element={<ProtectedRoutes />}>
                        <Route path="/Home" Component={Home} />
                        <Route path="/MyStuff" Component={MyStuff} />
                        <Route path="/Groups" Component={Groups} />
                        <Route path="/Profile" Component={Profile} />
                        <Route path="/Settings" Component={Settings} />
                    </Route>
                    <Route
                        path="*"
                        element={<Navigate to="/"></Navigate>}
                    ></Route>
                </Routes>
            </Router>
        </div>
    )
}

export default App
