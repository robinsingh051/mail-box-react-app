import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import axios from "axios";
import Loading from "../UI/Loading";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const Home = (props) => {
  // const [loading, setLoading] = useState(true);
  // const email = useSelector((state) => state.auth.email);
  // const dispatch = useDispatch();

  // if (loading) return <Loading />;

  return (
    <>
      <Container className="d-flex justify-content-center align-items-center mt-5">
        <h1>Home</h1>
      </Container>
    </>
  );
};

export default Home;
