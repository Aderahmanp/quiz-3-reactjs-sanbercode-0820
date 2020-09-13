import React from 'react';
import logo from '../img/logo.png'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import Home from '../pages/Home';
import About from '../pages/About';
import Login from '../pages/Login';
import MovieListEditor from '../pages/MovieListEditor'

function Index() {
    return (
        <>
        <body>
            <Router>
                <Router>
                <header>
                <img id="logo" src={logo} width="200px" />
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/About">About</Link>
                            </li>
                            <li>
                                <Link to="/MovieListEditor">Movie list Editor</Link>
                            </li>
                            <li>
                                <Link to="/Login">Login</Link>
                            </li>
                        </ul>
                    </nav>
                 </header> 
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/About" component={About}/>
                        <Route exact path="/Login" component={Login}/>
                        <Route exact path="/MovieListEditor" component={MovieListEditor}/>
                    </Switch>
                </Router>
                
            </Router>
        </body>
        <footer>
            <h5>copyright &copy; 2020 by Sanbercode</h5>
        </footer>
        </>
    )
}

export default Index