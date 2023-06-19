import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import ProductPage from "./components/productpage/ProductPage";

class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/product/:prodId" children={<ProductPage />} />
        </Switch>
      </Router>
    );
  }
}

export default App;
