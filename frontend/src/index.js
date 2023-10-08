// import React from "react";
// import ReactDOM from "react-dom";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import "./index.css";
// import { createRoot } from "react-dom/client";
// import Home from "./Home";
// import Buy from "./Buy";
// import PlayMe from "./PlayMe";

// createRoot(document.getElementById("root")).render(
//   <Router>
    
//     <Switch>
//       <Route path="/buy">
//         <Buy />
//       </Route>
//       <Route path="/play-me">
//         <PlayMe />
//       </Route>
//       <Route path="/">
//         <Home />
//       </Route>
//     </Switch>
    
    
//   </Router>
// );


// index.js


import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <React.StrictMode>
    <BrowserRouter>
       <App />
    </BrowserRouter>
 </React.StrictMode>
);