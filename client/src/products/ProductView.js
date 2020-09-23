import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Header, Segment, Form } from "semantic-ui-react";

const ProductView = ({ match, history }) => {
  const [product, setProduct] = useState({});
  const [text, setText] = useState("");
  useEffect(() => {
    axios.get(`/api/products/${match.params.id}`).then((res) => {
      setProduct(res.data);
    });
  }, []);
  function createReview() {
    axios
      .post(`/api/products/${product.id}/reviews`, { text })
      .then((res) => {
        setText("");
        setProduct({ ...product, reviews: [...product.reviews, res.data] });
      })
      .catch((e) => {
        alert("error in create");
      });
  }

  function editReview(id) {
    axios
      .put(`/api/products/${product.id}/reviews/${id}`, { text })
      .then((res) => {
        const updatedReviews = product.reviews.map((r) =>
          r.id === res.data.id ? res.data : r
        );
        setText("");
        setProduct({ ...product, reviews: updatedReviews });
      })
      .catch((e) => {
        alert("error in edit");
      });
  }

  function handleSubmit() {
    createReview();
  }
  async function deleteReview(id) {
    console.log("yo");
    try {
      let res = await axios.delete(`/api/products/${product.id}/reviews/${id}`);
      setProduct({
        ...product,
        reviews: product.reviews.filter((p) => p.id !== res.data.id),
      });
    } catch (err) {
      alert("delete failed");
    }
  }

  const { name, description, price, department, id, reviews = [] } = product;

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
          <p key={review.id}>
            {review.text}{" "}
            <span onClick={() => editReview(review.id)}>&#9998;</span>
            <span onClick={() => deleteReview(review.id)}> &#128465;</span>
          </p>
        ))}
        <h3>Add Review</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Input
            value={text}
            label="Review"
            required
            onChange={(e) => setText(e.target.value)}
          />
        </Form>
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
