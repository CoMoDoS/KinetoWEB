import React from 'react';
import {Route,BrowserRouter as  Router} from "react-router-dom";
import './App.css';
import MyNavbar from "./components/MyNavbar";

function App() {
  return (
      <Router>
        <MyNavbar />
        {/*<Route exact path="/login" render={props => <Login {...props} />}/>*/}
        {/*<Route exact path="/" render={props => <Profile {...props} />}/>*/}
        {/*<Route exact path="/medic" component={props => <Medic {...props}/>}/>*/}
      </Router>
  );
}

export default App;
