import React, { useState, useRef } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import FormatEmail from "../utils/FormatEmail";
import axios from "axios";
import { emailActions } from "../store/email";
import { useHistory } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { Button } from "react-bootstrap";

const Compose = (props) => {
  const history = useHistory();
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
      isRead: false,
    };
    let recievedEmail = {
      to: recipientEmail,
      from: senderEmail,
      subject: subject,
      content: editorText,
      isRead: true,
    };

    try {
      const sendEmailResponse = await axios.post(
        `https://react-practice-9b982-default-rtdb.firebaseio.com/mails/${FormatEmail(
          senderEmail
        )}/sent.json`,
        recievedEmail
      );
      await axios.post(
        `https://react-practice-9b982-default-rtdb.firebaseio.com/mails/${FormatEmail(
          recipientEmail
        )}/recieved.json`,
        emailData
      );
      toast.success("Email Sent Successfully");
      recievedEmail = { ...recievedEmail, id: sendEmailResponse.data.name };
      dispatch(emailActions.addMailtoSentMails(recievedEmail));
      history.replace("/inbox");
    } catch (err) {
      console.log(err);
      toast.error("Unable to send mail.");
    }
  };

  return (
    <div className="mt-4">
      <Button
        variant="link"
        onClick={props.onClose}
        style={{
          position: "absolute",
          top: "60px",
          right: "20px",
        }}
      >
        <BsArrowLeft style={{ marginRight: "5px" }} /> Back
      </Button>
      <form onSubmit={formSubmitHandler}>
        <div className="form-group mb-2">
          <label htmlFor="recipientEmail">To</label>
          <input
            type="email"
            className="form-control"
            id="recipientEmail"
            placeholder="Enter recipient's email"
            ref={recipientEmailRef}
          />
        </div>

        <div className="form-group mb-2">
          <label htmlFor="emailSubject">Subject</label>
          <input
            type="text"
            className="form-control"
            id="emailSubject"
            placeholder="Enter subject"
            ref={subjectRef}
          />
        </div>

        <div className="form-group mb-2">
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
    </div>
  );
};

export default Compose;
