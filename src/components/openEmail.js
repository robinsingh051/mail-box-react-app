import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { BsTrash, BsArrowLeft } from "react-icons/bs"; // Import the delete and back icons

const OpenEmail = (props) => {
  const { email, onDelete, onBack } = props;

  const deleteHandler = () => {
    onDelete(email.id); // Call the onDelete function with the email ID
  };
  const backHandler = () => {
    onBack();
  };

  return (
    <Container className="mt-2">
      <Button
        variant="link"
        onClick={backHandler}
        style={{ position: "absolute", top: "60px", right: "20px" }}
      >
        <BsArrowLeft /> Back
      </Button>
      <Row>
        <Col>
          <Card className="mt-4">
            <Card.Header>
              <Row>
                <Col xs={11}>
                  <strong>From:</strong> {email.from}
                </Col>
              </Row>
              <Row>
                <Col xs={12} className="text-end">
                  <strong>To:</strong> {email.to}
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <strong>Subject:</strong> {email.subject}
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Card.Text>{email.content}</Card.Text>
              <div className="text-end">
                {/* Delete button with icon */}
                <Button variant="outline-danger" onClick={deleteHandler}>
                  <BsTrash style={{ cursor: "pointer" }} />
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OpenEmail;
