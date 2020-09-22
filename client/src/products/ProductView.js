import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Header, Segment } from "semantic-ui-react";

const ProductView = ({ match, history }) => {
  const [product, setProduct] = useState({});
  useEffect(() => {
    axios.get(`/api/products/${match.params.id}`).then((res) => {
      debugger;
      setProduct(res.data);
    });
  }, []);

  const { name, description, price, department, reviews = [] } = product;

  return (
    <div>
      <Segment>
        <Header as="h1">{name}</Header>
        <Header as="h3">{department}</Header>
        <Header as="h5" color="grey">
          ${price}
        </Header>
        <p>{description}</p>
        <Header as="h3">Reviews</Header>
        {reviews.map((review) => (
          <p key={review.id}>{review.text}</p>
        ))}
      </Segment>
      <br />
      <br />
      <Button color="black" onClick={history.goBack}>
        Back
      </Button>
    </div>
  );
};

export default ProductView;
