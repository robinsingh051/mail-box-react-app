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
import { emailActions } from "./store/email";
import { BsPencilSquare } from "react-icons/bs";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { getDatabase, ref, onChildAdded } from "firebase/database";
import "firebase/database";
import firebaseApp from "./utils/firebase";

function App() {
  const history = useHistory();
  const [openCompose, setOpenCompose] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userEmail = useSelector((state) => state.auth.email);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  // useffect for user validation
  useEffect(() => {
    const token = localStorage.getItem("token");

    const validateUserAndLoadData = async (token) => {
      if (token) {
        try {
          const res = await axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.REACT_APP_API_KEY}`,
            { idToken: token }
          );
          dispatch(
            authActions.login({
              token: token,
              email: res.data.users[0].email,
            })
          );
          const sentEmailResponse = await axios.get(
            `https://react-practice-9b982-default-rtdb.firebaseio.com/mails/${FormatEmail(
              res.data.users[0].email
            )}/sent.json`
          );
          const loadedSentEmails = [];
          for (const key in sentEmailResponse.data) {
            loadedSentEmails.push({
              id: key,
              content: sentEmailResponse.data[key].content,
              from: sentEmailResponse.data[key].from,
              to: sentEmailResponse.data[key].to,
              subject: sentEmailResponse.data[key].subject,
              isRead: sentEmailResponse.data[key].isRead,
            });
          }
          dispatch(emailActions.setSentEmails(loadedSentEmails));
          const recievedEmailResponse = await axios.get(
            `https://react-practice-9b982-default-rtdb.firebaseio.com/mails/${FormatEmail(
              res.data.users[0].email
            )}/recieved.json`
          );
          const loadedRecievedEmails = [];
          for (const key in recievedEmailResponse.data) {
            loadedRecievedEmails.push({
              id: key,
              content: recievedEmailResponse.data[key].content,
              from: recievedEmailResponse.data[key].from,
              to: recievedEmailResponse.data[key].to,
              subject: recievedEmailResponse.data[key].subject,
              isRead: recievedEmailResponse.data[key].isRead,
            });
          }
          dispatch(emailActions.setRecievedEmails(loadedRecievedEmails));
          setLoading(false);
        } catch (error) {
          console.log(error);
          toast.error("something went wrong");
        }
      } else {
        setLoading(false);
      }
    };
    validateUserAndLoadData(token);
  }, []);

  useEffect(() => {
    const database = getDatabase(firebaseApp); // Pass firebaseApp to getDatabase

    const newNodeRef = ref(
      database,
      `/mails/${FormatEmail(userEmail)}/recieved`
    );

    const unsubscribe = onChildAdded(newNodeRef, (snapshot) => {
      let newNodeData = snapshot.val();
      newNodeData = { ...newNodeData, id: snapshot.key };
      dispatch(emailActions.addMailtoRecievedMails(newNodeData));
    });

    return () => {
      unsubscribe();
    };
  }, [userEmail]);

  const openComposeHandler = () => {
    setOpenCompose(true);
    history.push("/compose");
  };

  const closeComposeHandler = () => {
    setOpenCompose(false);
    history.push("/inbox");
  };

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
                {isLoggedIn && <Compose onClose={closeComposeHandler} />}
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
        {isLoggedIn && !openCompose && (
          <div
            style={{
              position: "fixed",
              bottom: "40px",
              right: "30px",
            }}
          >
            <Button variant="dark" onClick={openComposeHandler}>
              <BsPencilSquare style={{ marginLeft: "5px" }} /> Compose
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
}

export default App;
