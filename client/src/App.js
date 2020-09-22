import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/Navbar";
import ThingsDemo from "./things/ThingsDemo";
import { Container } from "semantic-ui-react";
import Products from "./products/Products";

function App() {
  return (
    <>
      <NavBar />
      <Container>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/thingsDemo" component={ThingsDemo} />
          <Route exact path="/products" component={Products} />
        </Switch>
      </Container>
    </>
  );
}

export default App;
