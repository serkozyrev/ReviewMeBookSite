import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/auth-context";

import { useHistory } from "react-router-dom";
import ProfileDataService from "../../services/ProfileDataService";

import Title from "../style/Title";
import "./Profile.css";
const Profile = (props) => {
  const history = useHistory();

  const authCtx = useContext(AuthContext);

  const profileData = { ...props.profileItem };

  const [rowData, setRowData] = useState({ ...props.profileItem });

  useEffect(() => {
    setRowData(props.profileItem);
  }, [props.profileItem]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setRowData((prevState) => ({ ...prevState, [name]: value }));
  };

  const clearState = () => {
    setRowData(profileData);
  };

  const options = ["Male", "Female", "Other"];

  const [validateFirstName, setValidateFirstName] = useState(true);
  const [validateLastName, setValidateLastName] = useState(true);
  const [validateNickname, setValidateNickname] = useState(true);

  const validatedFirstNameHandler = () => {
    setValidateFirstName(rowData.firstname.trim().length >= 3 ? true : false);
  };

  const validatedLastNameHandler = () => {
    setValidateLastName(rowData.lastname.trim().length >= 3 ? true : false);
  };

  const validateNicknameHandler = () => {
    setValidateNickname(
      rowData.nickname.trim().length >= 3 &&
        rowData.nickname.trim().length <= 10
        ? true
        : false
    );
  };

  const onEditButtonHandler = () => {
    document.getElementById("fname").disabled = false;
    document.getElementById("lname").disabled = false;
    document.getElementById("nname").disabled = false;
    document.getElementById("edit").style.display = "none";
    document.getElementById("delete").style.display = "none";
    document.getElementById("save").style.display = "inline";
    document.getElementById("cancel").style.display = "inline";
  };

  const onDeleteButtonHandler = () => {
    ProfileDataService.deleteAccountProfile(props.userID).then((data) => {
      history.push("/homepage");
      authCtx.logout();
    });
  };

  const onSaveChangesButtonHandler = () => {
    if (
      validateFirstName === true &&
      validateLastName === true &&
      validateNickname === true
    ) {
      const params = {
        userId: props.userID,
        firstname: rowData.firstname,
        lastname: rowData.lastname,
        nickname: rowData.nickname,
      };
      ProfileDataService.editProfile(params).then((data) => {});
      document.getElementById("fname").disabled = true;
      document.getElementById("lname").disabled = true;
      document.getElementById("nname").disabled = true;
      document.getElementById("edit").style.display = "inline";
      document.getElementById("delete").style.display = "inline";
      document.getElementById("save").style.display = "none";
      document.getElementById("cancel").style.display = "none";
    }
  };

  const onCancelButtonHandler = () => {
    clearState();
    document.getElementById("fname").disabled = true;
    document.getElementById("lname").disabled = true;
    document.getElementById("nname").disabled = true;
    document.getElementById("edit").style.display = "inline";
    document.getElementById("delete").style.display = "inline";
    document.getElementById("save").style.display = "none";
    document.getElementById("cancel").style.display = "none";
  };

  return (
    <div className="container light-style mb-5">
      <h1 className="card-title mb-5 mt-5">
        <Title name="Account Settings" />
      </h1>
      <div className="card profile mt-5">
        <div className="row no-gutters row-bordered row-border-light">
          <div className="col-md-3 pt-0">
            <div className="list-group list-group-flush account-settings-links ">
              <div className="color">
                <Link
                  className="list-group-item active"
                  data-toggle="list"
                  to="/profile"
                >
                  Profile
                </Link>
              </div>

              <Link
                className="list-group-item list-group-item-action"
                data-toggle="list"
                to="/resetpassword"
              >
                Reset Password
              </Link>
            </div>
          </div>

          <div className="col-md-9 pt-2">
            <div className="tab-content">
              <div className="tab-pane fade active show" id="profile">
                <div className="card-body">
                  <form className="row g-3">
                    <div className="col-md-6">
                      <div className="form-group">
                        <div
                          className={` ${
                            validateFirstName === false ? "invalid" : ""
                          }`}
                        >
                          <label className="form-label">First Name</label>
                          <input
                            name="firstname"
                            id="fname"
                            type="text"
                            className="form-control"
                            value={rowData.firstname}
                            onBlur={validatedFirstNameHandler}
                            onChange={onChange}
                            disabled
                          />
                          {validateFirstName === false ? (
                            <p>Please enter your First Name</p>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <div
                          className={` ${
                            validateLastName === false ? "invalid" : ""
                          }`}
                        >
                          <label className="form-label">Last Name</label>
                          <input
                            name="lastname"
                            id="lname"
                            type="text"
                            className="form-control"
                            value={rowData.lastname}
                            onBlur={validatedLastNameHandler}
                            onChange={onChange}
                            disabled
                          />
                          {validateLastName === false ? (
                            <p>Please enter your Last Name</p>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <div
                          className={` ${
                            validateNickname === false ? "invalid" : ""
                          }`}
                        >
                          <label className="form-label">Nickname</label>
                          <input
                            name="nickname"
                            id="nname"
                            type="text"
                            className="form-control"
                            value={rowData.nickname}
                            onBlur={validateNicknameHandler}
                            onChange={onChange}
                            disabled
                          />
                          {validateNickname === false ? (
                            <p>Nickname must not be more than 15 characters</p>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Gender</label>
                      <select
                        className="form-select"
                        value={rowData.genderid}
                        disabled
                      >
                        <option value="1"> {options[0]} </option>
                        <option value="2"> {options[1]} </option>
                        <option value="3"> {options[2]} </option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">Date of Birth</label>
                        <input
                          type="text"
                          className="form-control"
                          value={rowData.dateofbirth}
                          disabled
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">E-mail</label>
                        <input
                          type="email"
                          className="form-control"
                          value={rowData.email}
                          disabled
                        />
                      </div>
                    </div>
                  </form>
                </div>

                <div className="text-center mt-3">
                  <button
                    type="button"
                    id="edit"
                    className="btn edit mb-4"
                    onClick={onEditButtonHandler}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    id="delete"
                    className="btn delete mb-4"
                    onClick={onDeleteButtonHandler}
                  >
                    Delete Account
                  </button>
                  <button
                    type="button"
                    id="save"
                    className="btn button2 mb-4"
                    onClick={onSaveChangesButtonHandler}
                  >
                    Save changes
                  </button>
                  <button
                    type="button"
                    id="cancel"
                    className="btn button3 mb-4"
                    onClick={onCancelButtonHandler}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
