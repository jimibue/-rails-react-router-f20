import React, { useState } from "react";
import ReviewForm from "./ReviewForm";

const Review = ({ text, id }) => {
  const [showForm, setShowForm] = useState(false);
  const getReview = () => {
    if (showForm) {
      return <ReviewForm />;
    }
    return <p>{text}</p>;
  };
  return (
    <>
      {getReview()}
      <p>
        <span onClick={() => setShowForm(!showForm)}>edit</span>
        <span>delete</span>
      </p>
    </>
  );
};

export default Review;
