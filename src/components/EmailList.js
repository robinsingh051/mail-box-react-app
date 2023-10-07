import React from "react";
import EmailItem from "./EmailItem";

const EmailList = (props) => {
  const { emails, onOpen, onDelete } = props;

  return (
    <div className="email-list">
      {emails.map((email) => (
        <EmailItem
          key={email.id}
          email={email}
          onOpen={onOpen}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default EmailList;
