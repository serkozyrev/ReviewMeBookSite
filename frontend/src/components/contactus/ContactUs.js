import React, { useState, useContext } from "react";

import emailjs from "emailjs-com";

import Modal from "../style/Modal";
import AuthContext from "../context/auth-context";
import Title from "../style/Title";
import "./ContactUs.css";

function ContactUs() {
  const authCtx = useContext(AuthContext);
  const [dataInfo, setDataInfo] = useState("");
  const [name, setName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [message, setMessage] = useState("");

  const nameHandler = (e) => {
    setName(e.target.value);
  };
  const userEmailHandler = (e) => {
    setUserEmail(e.target.value);
  };
  const messageHandler = (e) => {
    setMessage(e.target.value);
  };
  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_qrji4yj",
        "template_cmw8m1u",
        e.target,
        "user_L4wdI7x3ofk4My6q8yZUG"
      )
      .then(
        (result) => {
          setDataInfo("Email was sent to Administrators of the Website");
          authCtx.showModal();
          setName("");
          setUserEmail("");
          setMessage("");
        },
        (error) => {}
      );
  }

  return (
    <div className="card contact mt-5">
      <div className="card-body">
        <div className="mb-4 text-center">
          <Title name="Contact Us" />
          <p className="card-subtitle">
            Please include your name, email and message and we contact you as
            soon as possible.
          </p>
        </div>
        <form className="contact-form" onSubmit={sendEmail}>
          <div className="mb-4">
            <input type="hidden" name="contact_number" />
            <label className="form-label">Name</label>
            <input
              className="form-control"
              type="text"
              autoFocus
              value={name}
              onChange={nameHandler}
              name="from_name"
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              type="email"
              value={userEmail}
              onChange={userEmailHandler}
              name="user_email"
            />
          </div>
          <label className="form-label">Message</label>
          <div className="mb-4">
            <textarea
              className="form-control"
              value={message}
              onChange={messageHandler}
              name="message"
              rows="6"
            />
          </div>
          <div className="d-flex justify-content-center mb-5">
            <button className="btn contact" type="submit">
              Send
            </button>
          </div>
        </form>
        {authCtx.popupIsShown && (
          <Modal onClose={authCtx.closeModal} info={dataInfo} />
        )}
      </div>
    </div>
  );
}

export default ContactUs;
