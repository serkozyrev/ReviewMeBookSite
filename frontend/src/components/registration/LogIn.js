import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../context/auth-context";
import Modal from "../style/Modal";

import Title from "../style/Title";

import "./LogIn.css";

const LogIn = (props) => {
  const authCtx = useContext(AuthContext);
  const [providedEmail, setProvidedEmail] = useState("");
  const [providedPassword, setProvidedPassword] = useState("");
  const [validatedEmail, setValidEmail] = useState();
  const [validatedPassword, setValidPassword] = useState();
  const [dataInfo, setDataInfo] = useState("");

  const emailHandler = (event) => {
    setProvidedEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setProvidedPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    setValidEmail(providedEmail.includes("@"));
  };

  const validatePasswordHandler = () => {
    setValidPassword(providedPassword.trim().length >= 8);
  };

  const forgotPasswordHandler = () => {
    setDataInfo(
      "Please navigate to Contact Us page by going down of page and click on the link. Include your real email by which we will contact you with your reset password. Also, please include your email, full name and username that you have in the account for security purposes."
    );
    authCtx.showModal();
  };
  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: providedEmail,
          password: providedPassword,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          if (typeof data === "string") {
            setDataInfo(data);

            authCtx.showModal();
          } else {
            let pass = data.password;
            let token = data.tokenInfo;
            let userId;
            let active;
            let userType;
            const detailsInfo = data.details;

            data.users[0].map((dataDetails) => {
              return (userId = dataDetails.userid);
            });
            data.users[0].map((dataDetails) => {
              return (userType = dataDetails.usertypeid);
            });
            data.users[0].map((dataDetail) => {
              return (active = dataDetail.isactive);
            });

            const expirationTime = new Date(
              new Date().getTime() + 60 * 60 * 1000
            );

            if (pass === true && active === true) {
              authCtx.login(
                token,
                pass,
                userType,
                userId,
                detailsInfo,
                expirationTime
              );
            } else if (pass === true && active === false) {
              setDataInfo("Login failed. User is inactive");
              authCtx.showModal();
            } else {
              setDataInfo("Login failed. email/password is incorrect");
              authCtx.showModal();
            }
          }
        });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="login mt-5">
      <div className="mt-5 text-center">
        <Title name="Welcome" />
        <p className="card-subtitle">
          Don't have an account? Join us{" "}
          <Link to="/signup" className="card-link">
            Here
          </Link>
        </p>
      </div>
      <form onSubmit={submitHandler}>
        <div className="d-flex justify-content-center">
          <div className="col-8 mb-4 mt-3">
            <div
              className={`control ${validatedEmail === false ? "invalid" : ""}`}
            >
              <label className="form-label" htmlFor="email">
                Email{" "}
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={providedEmail}
                onChange={emailHandler}
                onBlur={validateEmailHandler}
                autoFocus
                required
              />
              {validatedEmail === false && <p>Please provide correct email</p>}
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div className="col-8 mb-4">
            <div
              className={`control ${
                validatedPassword === false ? "invalid" : ""
              }`}
            >
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={providedPassword}
                onChange={passwordHandler}
                onBlur={validatePasswordHandler}
                required
              />
              {validatedPassword === false && (
                <p>Password should contain at least 8 characters</p>
              )}
            </div>
          </div>
        </div>

        <div className="row mb-2">
          <div
            type="button"
            className="forgot_pass d-flex justify-content-end col-10"
            onClick={forgotPasswordHandler}
          >
            Forgot password?
          </div>
        </div>
        <div className="mb-5 d-flex justify-content-center">
          <button type="submit" className="btn login mb-4">
            Log in
          </button>
        </div>
      </form>
      {authCtx.popupIsShown && (
        <Modal onClose={authCtx.closeModal} info={dataInfo} />
      )}
    </div>
  );
};

export default LogIn;
