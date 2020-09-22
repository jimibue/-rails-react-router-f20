import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/Navbar";
import ThingsDemo from "./things/ThingsDemo";
import { Container } from "semantic-ui-react";
import Products from "./products/Products";
import ProductForm from "./products/ProductForm";

function App() {
  return (
    <>
      <NavBar />
      <Container>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/thingsDemo" component={ThingsDemo} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/products/new" component={ProductForm} />
        </Switch>
      </Container>
    </>
  );
}

export default App;
