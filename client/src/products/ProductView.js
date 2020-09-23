import Axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import Review from "./Review";
import ReviewForm from "./ReviewForm";

// get match, history from props, via react router
const ProductView = ({ match, history }) => {
  // expecting product to be an object {id: text:,...}

  // product {id:, name, ..reviews:[]}
  const [product, setProduct] = useState({});
  // const [reviews, setReviews] = useState([]);

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
    //   Axios.get(`/api/products/${match.params.id}/reviews`)
    //     .then((res) => {
    //       setReviews(res.data);
    //     })
    //     .catch((err) => {
    //       alert("get reviews failed");
    //     });
  }, []);
  function addReview(review) {
    console.log(review);
    console.log(product);
    // we need to add review to reviews in our product state
    // brain teasers coding challengings interview questions
    // review ={id, text}
    // product =
    //{id:, name,  ..reviews:[{id, text},{id, text}, need to review here]}

    // first part of solving a brain teaser is understanding what you have to do
    // understand what your data looks, what you need to return/change, etc

    setProduct({ ...product, reviews: [...product.reviews, review] });
  }

  function updateReview(review) {
    console.log(review);
    //similar to addReview, accept I don't want to add a review I want to replace updated Review
    // we will use map here

    // whats going here
    // review is the thing back from out db call
    // and r i the current iteration review
    const updatedReviews = product.reviews.map((r) =>
      r.id === review.id ? review : r
    );

    setProduct({ ...product, reviews: updatedReviews });
  }

  function renderReviews() {
    // this a safeguard on reviews being null
    if (!product.reviews) {
      return; // breaks out of function
    }
    if (product.reviews.length === 0) {
      return <p>no reviews</p>;
    }
    return product.reviews.map((r) => {
      return (
        <Review
          key={r.id}
          {...r}
          productId={product.id}
          updateReviewHandler={updateReview}
        />
      );
    });
  }

  return (
    <div>
      <Segment>
        <Header as="h1">{product.name}</Header>
        <Header as="h3">{product.department}</Header>
        <Header as="h5" color="grey">
          ${product.price}
        </Header>
        <p>{product.description}</p>

        <Header as="h3">Reviews</Header>
        <ReviewForm addReviewHandler={addReview} productId={product.id} />
        {/* this is with own axios call to get reviews */}
        {/* {reviews.map((r) => (
          <p key={r.id}>{r.text}</p>
        ))} */}

        {/* this is with  axios call to get product, where we added
         reviews to controller in product */}
        {renderReviews()}
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

// things we need to do
// update in rails review controller **
// toggle UI **
// Try to Reuse or form -> hand both create and update *
// update should have existing text by default
// figure out how to add updated review to our product
// axios call => put /api/products/:product_id/reviews/:id
