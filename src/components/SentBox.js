import React, { useState } from "react";
import EmailList from "./EmailList";
import OpenEmail from "./OpenEmail";
import { useSelector, useDispatch } from "react-redux";
import { emailActions } from "../store/email";
import axios from "axios";
import FormatEmail from "../utils/FormatEmail";
import toast from "react-hot-toast";
import NoEmailFound from "./NoEmailFound";

const SentBox = (props) => {
  const userEmail = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();
  const sentEmails = useSelector((state) => state.email.sentEmails);
  console.log(sentEmails);

  const [openEmailState, setOpenEmailState] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);

  const deleteEmailHandler = (id) => {
    dispatch(emailActions.deleteMailfromSentMails(id));
    backHandler();
  };

  const emailOpenHandler = async (id) => {
    setSelectedEmail(sentEmails.find((email) => email.id === id));
    setOpenEmailState(true);
    dispatch(emailActions.setSentEmailsRead(id));
    try {
      const res = axios.patch(
        `https://react-practice-9b982-default-rtdb.firebaseio.com/mails/${FormatEmail(
          userEmail
        )}/sent/${id}.json`,
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

  if (sentEmails.length === 0) {
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
          emails={sentEmails}
          onOpen={emailOpenHandler}
          onDelete={deleteEmailHandler}
        />
      )}
    </>
  );
};

export default SentBox;
