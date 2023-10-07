import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const NoEmailFound = (props) => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <Card className="mt-4">
            <Card.Body>
              <Card.Title>No Emails Found</Card.Title>
              <Card.Text>There are currently no emails to display.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NoEmailFound;
