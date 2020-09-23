import React, { useState, useEffect } from "react";
import { Button, Card, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // we need to do api/axios call to get products
    axios
      .get("/api/products")
      .then((response) => {
        //once we get products need to update state
        setProducts(response.data);
      })
      .catch((err) => {
        alert("error occurred getting products");
      });
  }, []);
  const renderProducts = () => {
    if (products.length <= 0) return <h2>No Products</h2>;

    return products.map((product) => (
      <Card key={product.id}>
        <Card.Content>
          <Card.Header>{product.name}</Card.Header>
          <Card.Meta>{product.department}</Card.Meta>
          <Card.Description>{product.description}</Card.Description>
        </Card.Content>
        <Card.Content>
          <Button color="blue" as={Link} to={`/products/${product.id}`}>
            View
          </Button>
        </Card.Content>
      </Card>
    ));
  };
  return (
    <div>
      <Header as="h1">Products</Header>
      <Button as={Link} color="blue" to="/products/new">
        Add Product
      </Button>
      <Card.Group>{renderProducts()}</Card.Group>
    </div>
  );
};

export default Products;
