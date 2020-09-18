import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import NavBar from "./component/NavBar";
import Model from "./component/Model";
import LayerForm from "./component/LayerForm";

import "./App.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/model" component={Model} />
        <Route path="/layers/:index" component={LayerForm} />
        <Route path="/" component={Model} />
        <Redirect from="/" exact to="/models" />
        <Redirect to="/not-found" />
      </Switch>
    </div>
  );
}

export default App;
