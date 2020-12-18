import React from "react";
import "./App.css";
import PayrollForm from "./components/payroll_form/payroll_form";
import PayrollHome from "./components/payroll_home/payroll_home";
import { BrowserRouter, Route, Switch } from "react-router-dom";

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/form">
              <PayrollForm />
            </Route>
            <Route exact path="/home">
              <PayrollHome />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
