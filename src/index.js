import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
// import App from './App'
import LogIn from './pages/LogIn'
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    // <App />
    <LogIn />
)

// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import React, { useState } from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(

// const LoginPage = () => {
//     const [showApp, setShowApp] = useState(false);

//     const handleButtonClick = () => {
//         setShowApp(true);
//     };

//     return (
//         <div>
//             {showApp ? (
//                 <App />
//             ) : (
//                 <div>
//                     {/* Your login form goes here */}
//                     <button onClick={handleButtonClick}>Show App</button>
//                 </div>
//             )}
//         </div>
//     );
// };

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<LoginPage />);
//     <App />
