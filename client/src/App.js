import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Home from './pages/Home'


function App() {
  return (
    <div className="app">
      <div className="app__body">
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch> 
        </BrowserRouter>
      </div>
    </div>
  );
}


export default App;
