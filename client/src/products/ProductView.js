import Axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Header, Segment } from "semantic-ui-react";

// get match, history from props, via react router
const ProductView = ({ match, history }) => {
  // expecting product to be an object {id: text:,...}
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);

  // want to load product on mount
  useEffect(() => {
    // trying to access a variable in debugger
    // and it is undefined, throw it in your function
    // and try again (example of a closure)
    // we want to hit our show method in products

    // match.params.id => coming react router and is id of the product
    // res.data.id => coming from server
    // but they should be the same or else you messed up
    // when we do this call get /api/products/${match.params.id}
    Axios.get(`/api/products/${match.params.id}`)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data); // this is the product no review info

        // if we need something from res.data in our next axios call
        // pretend we need res.data.id

        // this can get messy. should use async await
        // Axios.get(`/api/products/${res.data.id}/reviews`)
        // .then((res) => {
        //   setReviews(res.data);
        // })
        // .catch((err) => {
        //   alert("get reviews failed");
        // });
        // }, []);
      })
      .catch((err) => {
        alert("get single product failed");
      });

    // this get the review for a give product
    Axios.get(`/api/products/${match.params.id}/reviews`)
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => {
        alert("get reviews failed");
      });
  }, []);

  return (
    <div>
      <Segment>
        <Header as="h1">{product.name}</Header>
        <Header as="h3">{product.department}</Header>
        <Header as="h5" color="grey">
          ${product.price}
        </Header>
        <p>{product.description}</p>

        {/* this is with own axios call to get reviews */}
        {/* {reviews.map((r) => (
          <p key={r.id}>{r.text}</p>
        ))} */}

        {/* this is with  axios call to get product, where we added
         reviews to controller in product */}
        {product.reviews &&
          product.reviews.map((r) => <p key={r.id}>{r.text}</p>)}
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
