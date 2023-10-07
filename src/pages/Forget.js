import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { Card, Form, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Forget = () => {
  const history = useHistory();

  const emailInputRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;

    setIsLoading(true);
    const userDetails = {
      requestType: "PASSWORD_RESET",
      email: enteredEmail,
    };

    console.log(userDetails);
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.REACT_APP_API_KEY}`,
        userDetails
      );
      console.log(response.data);
      toast.success("Password reset link is sent in email");
      history.push("/login");
    } catch (err) {
      let errorMessage = "Something Went wrong";
      if (err.response.data.error && err.response.data.error.message)
        errorMessage = err.response.data.error.message;
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Container
        className="shadow"
        style={{
          width: "25rem",
          padding: ".5rem",
        }}
      >
        <Card>
          <Card.Body className="text-center">
            <h5 style={{ marginBottom: 9 }}>Forget Password</h5>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  required
                  ref={emailInputRef}
                />
              </Form.Group>

              {isLoading && <p>Sending Request</p>}
              {!isLoading && (
                <Button variant="primary" type="submit">
                  Send Email
                </Button>
              )}
            </Form>
          </Card.Body>
        </Card>
        <Button
          variant="Link"
          as={Link}
          to="/login"
          style={{
            display: "block",
            width: "100%",
            textAlign: "center",
            marginTop: "10px",
            backgroundColor: "#e8f7f0",
          }}
        >
          Back to Login?
        </Button>
      </Container>
    </Container>
  );
};

export default Forget;
