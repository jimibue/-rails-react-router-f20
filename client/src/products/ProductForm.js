import React, { useState } from "react";
import { Form, Header } from "semantic-ui-react";
import Products from "./Products";

const ProductForm = () => {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    console.log(name);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Header as="h1">New Product</Header>
      <Form.Group widths="equal">
        <Form.Input
          label="Name"
          placeholder="enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Button color="blue">Submit</Form.Button>
    </Form>
  );
};

export default ProductForm;
