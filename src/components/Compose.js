import React, { useState, useRef } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import FormatEmail from "../utils/FormatEmail";
import axios from "axios";
import { emailActions } from "../store/email";

const Compose = () => {
  // const sentEmails = useSelector((state) => state.email.sentEmails);
  // const recievedEmails = useSelector((state) => state.email.recievedEmails);
  // console.log(sentEmails, recievedEmails);
  const dispatch = useDispatch();
  const senderEmail = useSelector((state) => state.auth.email);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const recipientEmailRef = useRef(null);
  const subjectRef = useRef(null);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const editorText = rawContentState.blocks
      .map((block) => block.text)
      .join("\n")
      .trim();

    const recipientEmail = recipientEmailRef.current.value.trim();
    const subject = subjectRef.current.value.trim();

    if (recipientEmail === "" || subject === "") {
      toast.error("Recipient email and subject are required fields.");
      return;
    }

    if (editorText === "") {
      toast.error("Please enter email content in the editor.");
      return;
    }

    let emailData = {
      to: recipientEmail,
      from: senderEmail,
      subject: subject,
      content: editorText,
    };
    console.log(emailData);

    try {
      const sendEmailResponse = await axios.post(
        `https://react-practice-9b982-default-rtdb.firebaseio.com/mails/${FormatEmail(
          senderEmail
        )}/sent.json`,
        emailData
      );
      await axios.post(
        `https://react-practice-9b982-default-rtdb.firebaseio.com/mails/${FormatEmail(
          recipientEmail
        )}/recieved.json`,
        emailData
      );
      toast.success("Email Sent Successfully");
      emailData = { ...emailData, id: sendEmailResponse.data.name };
      dispatch(emailActions.addMailtoSentMails(emailData));
    } catch (err) {
      console.log(err);
      toast.error("Unable to send mail.");
    }
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="form-group">
        <label htmlFor="recipientEmail">To</label>
        <input
          type="email"
          className="form-control"
          id="recipientEmail"
          placeholder="Enter recipient's email"
          ref={recipientEmailRef}
        />
      </div>

      <div className="form-group">
        <label htmlFor="emailSubject">Subject</label>
        <input
          type="text"
          className="form-control"
          id="emailSubject"
          placeholder="Enter subject"
          ref={subjectRef}
        />
      </div>

      <div className="form-group">
        <label>Compose</label>
        <div style={{ height: "300px" }}>
          <Editor
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={onEditorStateChange}
          />
        </div>
      </div>

      <button type="submit" className="btn btn-outline-primary">
        Send
      </button>
    </form>
  );
};

export default Compose;
