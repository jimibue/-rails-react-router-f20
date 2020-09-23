import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import Axios from "axios";
// import { useParams } from "react-router-dom"; with hooks from react-router-dom

const ReviewForm = ({ productId, match }) => {
  const [text, setText] = useState("");
  // const { id } = useParams(); //using hook
  // console.log("from hook", id);
  function handleSubmit() {
    console.log("here");

    console.log("match:", match);
    console.log(productId);

    // what info do I need to create a review -> productid and text
    Axios.post(`/api/products/${productId}/reviews`, { text })
      .then((res) => {
        debugger;
        // filling out your model/controller and routes via rails
        // doing your UI in react
        // axios/api calls to connect the two

        // checking to see if I can create to db *DONE* res.data is the review
        // worry about UI
      })
      .catch((err) => {
        debugger;
      });
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
