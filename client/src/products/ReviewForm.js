import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import Axios from "axios";
// import { useParams } from "react-router-dom"; with hooks from react-router-dom

const ReviewForm = ({
  productId,
  match,
  addReviewHandler,
  updateReviewHandler,
  id,
  text: textProps, // had to rename this to textProps becuase I was already us text from userState
}) => {
  const [text, setText] = useState(textProps ? textProps : "");
  // const { id } = useParams(); //using hook
  // console.log("from hook", id);

  function addReview() {
    Axios.post(`/api/products/${productId}/reviews`, { text })
      .then((res) => {
        // filling out your model/controller and routes via rails
        // doing your UI in react
        // axios/api calls to connect the two

        // checking to see if I can create to db *DONE* res.data is the review
        // worry about UI
        addReviewHandler(res.data);
        setText("");
      })
      .catch((err) => {
        debugger;
      });
  }
  function updateReview() {
    // lets see if we have productId and id here
    Axios.put(`/api/products/${productId}/reviews/${id}`, { text })
      .then((res) => {
        //res.data is  the updated object
        // now focus on updating ui but reviews stat lives in productView
        updateReviewHandler(res.data);
      })
      .catch((err) => {
        alert("update broken");
      });
  }

  function handleSubmit() {
    // if there is an id that means it has already been create so do update things
    if (id) {
      // update logic
      updateReview();
    } else {
      addReview();
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Input
        value={text}
        placeholder="enter review"
        required
        onChange={(e) => setText(e.target.value)}
      />
    </Form>
  );
};

// withRouter is an example of HOC or a higher order component
// HOC-> is component that wraps another and can give it props/ ie a way to share props, reuse code/logic

// suggest don't as now try to understand completly just now it is a thing a google from there
export default withRouter(ReviewForm);
