import axios from "axios";
import React, { useState } from "react";
import { Form, Header } from "semantic-ui-react";

const ProductForm = ({ history }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");

  function handleSubmit(e) {
    console.log(name);
    axios
      .post("/api/products", { name, price, description, department })
      .then((res) => {
        //what do you think I want to do here?
        // history we get from react router and our component be
        //defined in a Route component *IMPORTANT*
        history.push("/products"); // useHook from react-router
        // go back to products page
      })
      .catch((err) => {
        alert("create product broke");
      });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <p onClick={history.goBack}>back</p>
      <Header as="h1">New Product</Header>
      <Form.Group widths="equal">
        <Form.Input
          label="Name"
          placeholder="enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Form.Input
          label="Price"
          placeholder="enter price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <Form.Input
          label="Description"
          placeholder="enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Form.Input
          label="Department"
          placeholder="enter department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Button color="blue">Submit</Form.Button>
    </Form>
  );
};

export default ProductForm;
