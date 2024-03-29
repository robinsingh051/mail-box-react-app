import React from "react";
import { Card, Button } from "react-bootstrap";

const EmailItem = (props) => {
  const { email, onOpen, onDelete } = props;

  const openHandler = (e) => {
    e.preventDefault();
    onOpen(email.id);
  };
  const deleteHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(email.id);
  };

  const cardStyle = {
    backgroundColor: email.isRead ? "" : "#fde2e2",
  };

  return (
    <Card onClick={openHandler} className="mb-2" style={cardStyle}>
      <Card.Body className="d-flex justify-content-between align-items-center">
        <div>
          <Card.Title>{email.subject}</Card.Title>
          <Card.Text>
            From: {email.from}
            <div style={{ marginBottom: ".4rem" }}></div>
            {email.content.slice(0, 100)}
          </Card.Text>
        </div>
        <div>
          <Button
            variant="outline-danger"
            className="mx-1"
            onClick={deleteHandler}
          >
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default EmailItem;
