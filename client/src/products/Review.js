import React, { useState } from "react";
import ReviewForm from "./ReviewForm";
import Axios from "axios";

const Review = ({ text, id, productId, updateReviewHandler }) => {
  const [showForm, setShowForm] = useState(false);
  const getReview = () => {
    if (showForm) {
      // rember we have product_id and review.id
      // the id here is review.id
      return (
        <ReviewForm
          updateReviewHandler={updateReviewHandler}
          productId={productId}
          text={text}
          id={id}
        />
      );
    }
    return <p>{text}</p>;
  };
  const deleteReview = async () => {
    // DELETE	/api/products/:product_id/reviews/:id
    try {
      const res = await Axios.delete(
        `/api/products/${productId}/reviews/${id}`
      );
      console.log(res);
    } catch (err) {
      alert("error occured in delete");
    }
  };
  return (
    <>
      {getReview()}
      <p>
        <span onClick={() => setShowForm(!showForm)}>&#9998;</span>
        <span onClick={deleteReview}> &#128465;</span>
      </p>
    </>
  );
};

export default Review;
