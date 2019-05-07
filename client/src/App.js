import React from 'react';
import {BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Saved from "./pages/Saved";
import Comments from "./pages/Comments";

function App() {
  return(
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/saved" component={Saved} />
        <Route exact path="/comments/:id" component={Comments} />
      </div>
    </Router>
  )
}

export default App;



