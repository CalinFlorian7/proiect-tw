// import HelloMessage from './components/helloMessage.js'
// // import './App.css';
import Navbar from './components/Navbar.js'
// import { BrowserRouter as Router } from 'react-router-dom'
// import { Switch } from 'react-router-dom'
// import { Route } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
    return (
        <div className="App">
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" />
                </Routes>
            </Router>
            {/* <HelloMessage /> */}
            {/* <HelloMessage /> */}
        </div>
    )
}

export default App
