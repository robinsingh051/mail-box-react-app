import React, { useState } from "react";
import EmailList from "./EmailList";
import OpenEmail from "./OpenEmail"; // You should import your openEmail component as needed
import { useSelector, useDispatch } from "react-redux";
import { emailActions } from "../store/email";
import axios from "axios";
import FormatEmail from "../utils/FormatEmail";
import toast from "react-hot-toast";
import NoEmailFound from "./NoEmailFound";

const Inbox = (props) => {
  const userEmail = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();
  const recievedEmails = useSelector((state) => state.email.recievedEmails);

  const [openEmailState, setOpenEmailState] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);

  const deleteEmailHandler = async (id) => {
    try {
      await axios.delete(
        `https://react-practice-9b982-default-rtdb.firebaseio.com/mails/${FormatEmail(
          userEmail
        )}/recieved/${id}.json`
      );
      toast.success("Mail delete successfully");
      dispatch(emailActions.deleteMailfromRecievedMails(id));
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
      dispatch(emailActions.deleteMailfromRecievedMails(id));
      backHandler();
    }
  };

  const emailOpenHandler = async (id) => {
    setSelectedEmail(recievedEmails.find((email) => email.id === id));
    setOpenEmailState(true);
    dispatch(emailActions.setRecievedEmailsRead(id));
    try {
      await axios.patch(
        `https://react-practice-9b982-default-rtdb.firebaseio.com/mails/${FormatEmail(
          userEmail
        )}/recieved/${id}.json`,
        {
          isRead: true,
        }
      );
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  const backHandler = () => {
    setSelectedEmail(null);
    setOpenEmailState(false);
  };

  if (recievedEmails.length === 0) {
    return <NoEmailFound />;
  }

  return (
    <>
      {openEmailState && (
        <OpenEmail
          onBack={backHandler}
          onDelete={deleteEmailHandler}
          email={selectedEmail}
        />
      )}
      {!openEmailState && (
        <EmailList
          emails={recievedEmails}
          onOpen={emailOpenHandler}
          onDelete={deleteEmailHandler}
        />
      )}
    </>
  );
};

export default Inbox;
