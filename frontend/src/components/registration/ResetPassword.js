import React, { useState } from "react";

import Title from "../style/Title";
import "./ResetPassword.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [validatePassword, setValidatePassword] = useState();
  const [validateConfirmedPassword, setValidateConfirmedPassword] = useState();

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const confirmedPasswordHandler = (event) => {
    setConfirmedPassword(event.target.value);
  };

  const validatePasswordHandler = () => {
    setValidatePassword(password.trim().length > 8 ? true : false);
  };

  const validateConfirmedPasswordHandler = () => {
    setValidateConfirmedPassword(confirmedPassword === password ? true : false);
  };

  const submitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <div className="forgotpw mt-5">
      <div className="text-center">
        <div className="card-title ">
          <Title name="Reset Password" />
        </div>
      </div>

      <form onSubmit={submitHandler}>
        <div className="d-flex justify-content-center">
          <div className="col mb-4 mt-4">
            <div className="form-group">
              <div className="form-group">
                <div
                  className={` ${validatePassword === false ? "invalid" : ""}`}
                >
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    onChange={passwordHandler}
                    onBlur={validatePasswordHandler}
                  />
                  {validatePassword === false ? (
                    <p>Password length should be greater than 8</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="form-group">
                <div
                  className={` ${
                    validateConfirmedPassword === false ? "invalid" : ""
                  }`}
                >
                  <label className="form-label">Confirm password</label>
                  <input
                    type="password"
                    className="form-control"
                    onChange={confirmedPasswordHandler}
                    onBlur={validateConfirmedPasswordHandler}
                  />
                  {validateConfirmedPassword === false ? (
                    <p>Passwords don't match. Re-enter the password</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mb-3">
          <button type="submit" className="btn forgotpw">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
