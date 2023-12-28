// // import './App.css';
import Navbar from './components/Navbar.js'
import Home from './pages/Home.js'
import Groups from './pages/Groups.js'
import Profile from './pages/Profile.js'
import Notes from './pages/Notes.js'
import Settings from './pages/Settings.js'
import ProtectedRoutes from './ProtectedRoutes.js'
import AddNote from './pages/AddNote.js'
import AddSubject from './pages/AddSubject.js'
import LogIn from './pages/LogIn.js'
import Enrollments from './pages/Enrollments.js'
import RestrictedNavbar from './components/RestrictedNavbar.js'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom'
import Subjects from './pages/Subjects.js'

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
                        <Route path="/Subjects" Component={Subjects} />
                        <Route path="/Notes" Component={Notes} />
                        <Route path="/Groups" Component={Groups} />
                        <Route path="/Profile" Component={Profile} />
                        <Route path="/Settings" Component={Settings} />
                        <Route path="/AddNote" Component={AddNote} />
                        <Route path="/AddSubject" Component={AddSubject} />
                        <Route path="/Enrollments" Component={Enrollments} />
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
