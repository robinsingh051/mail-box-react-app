import React, { useEffect, useState } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Forget from "./pages/Forget";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Header from "./components/Header";
import SideNavBar from "./components/SideNavBar";
import Inbox from "./components/Inbox";
import SentBox from "./components/SentBox";
import Compose from "./components/Compose";
import { Container, Row, Col } from "react-bootstrap";
import Loading from "./UI/Loading";
import FormatEmail from "./utils/FormatEmail";
import axios from "axios";
import { authActions } from "./store/auth";
import toast from "react-hot-toast";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  // useffect for user validation
  useEffect(() => {
    const token = localStorage.getItem("token");

    const validateUser = async (token) => {
      if (token) {
        try {
          const res = await axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.REACT_APP_API_KEY}`,
            { idToken: token }
          );
          dispatch(
            authActions.login({
              token: token,
              email: FormatEmail(res.data.users[0].email),
            })
          );
          setLoading(false);
        } catch (error) {
          console.log(error);
          toast.error("something went wrong");
        }
      } else {
        setLoading(false);
      }
    };
    validateUser(token);
  }, []);

  if (loading) return <Loading />;

  return (
    <div>
      <Header />
      <Container fluid>
        <Row>
          {isLoggedIn && (
            <Col sm={3}>
              <SideNavBar />
            </Col>
          )}
          <Col sm={isLoggedIn ? 9 : 0}>
            <Switch>
              <Route path="/" exact>
                {isLoggedIn && <Redirect to="/inbox" />}
                {!isLoggedIn && <Redirect to="/login" />}
              </Route>
              <Route path="/home">
                {isLoggedIn && <Home />}
                {!isLoggedIn && <Redirect to="/login" />}
              </Route>
              <Route path="/inbox">
                {isLoggedIn && <Inbox />}
                {!isLoggedIn && <Redirect to="/login" />}
              </Route>
              <Route path="/sent">
                {isLoggedIn && <SentBox />}
                {!isLoggedIn && <Redirect to="/login" />}
              </Route>
              <Route path="/compose">
                {isLoggedIn && <Compose />}
                {!isLoggedIn && <Redirect to="/login" />}
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              {!isLoggedIn && (
                <Route path="/forget">
                  <Forget />
                </Route>
              )}
            </Switch>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
