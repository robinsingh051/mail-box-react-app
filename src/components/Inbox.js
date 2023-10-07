import React, { useState } from "react";
import EmailList from "./EmailList";
import openEmail from "./openEmail"; // You should import your openEmail component as needed
import { useSelector } from "react-redux";

const Inbox = (props) => {
  // const sentEmails = useSelector((state) => state.email.sentEmails);
  const recievedEmails = useSelector((state) => state.email.recievedEmails);
  // console.log("re", recievedEmails);
  // console.log("se", sentEmails);

  const [openEmailState, setOpenEmailState] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);

  const deleteEmailHandler = (id) => {
    // Implement the logic to delete an email with the given id
    // Update the receivedEmails state accordingly
    console.log("Deleted email with ID:", id);
  };

  const emailOpenHandler = (id) => {
    console.log(id);
    setSelectedEmail(recievedEmails.find((email) => email.id === id));
    // setOpenEmailState(true);
  };

  return (
    <>
      {openEmailState && <openEmail email={selectedEmail} />}
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
