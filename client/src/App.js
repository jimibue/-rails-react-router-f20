import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/Navbar";
import ThingsDemo from "./things/ThingsDemo";
import { Container } from "semantic-ui-react";
import Products from "./products/Products";
import ProductForm from "./products/ProductForm";
import ProductView from "./products/ProductView";

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
          <Route exact path="/products/:id" component={ProductView} />
          {/* <ProductForm /> would not have access to react router props -history params, etc need a hook, or in class withRouter HOC */}
        </Switch>
      </Container>
    </>
  );
}

export default App;
