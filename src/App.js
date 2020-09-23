import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import NavBar from "./components/NavBar";
import Models from "./components/Models";
import Model from "./components/Model";
import LayerForm from "./components/LayerForm";

import "./App.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/models/:name/layers/:index" component={LayerForm} />
        <Route path="/models/:name" component={Model} />
        <Route path="/models" component={Models} />

        <Redirect from="/" exact to="/models" />
        <Redirect to="/not-found" />
      </Switch>
    </div>
  );
}

export default App;
