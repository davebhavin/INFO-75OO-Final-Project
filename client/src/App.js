import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import LPage from './LPage';
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends Component {
  
 
 
  render() {
    return (
      <Router>
      <div>
        <hr />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/audit">
            <Audit />
          </Route>
        </Switch>
      </div>
    </Router>
    );
  }
  
}

function Home() {
  return (
    
    <div class="card-group">
    <div class="card">
        <div class="card-body">
            <h4 class="card-title">Title</h4>
            <p class="card-text">Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus.</p><button class="btn btn-primary" type="button">Button</button></div>
    </div>
    <div class="card">
        <div class="card-body">
            <h4 class="card-title">Title</h4>
            <p class="card-text">Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus.</p><Link to="/about">About</Link></div>
    </div>
</div>
    

  );
}

function About() {
  return (
    <div><LPage></LPage></div>
  );
}
function Audit() {
  return (
    <div><Audit></Audit></div>
  );
}

export default App;
