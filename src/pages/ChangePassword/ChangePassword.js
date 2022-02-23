import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CHANGE_PASSWORD } from "../../shared/constants";
import { useMutation, useQuery } from "@apollo/client";
import { useToasts } from "react-toast-notifications";
import logo from "../../assets/images/login-logo.jpg";
import {AiFillEye} from 'react-icons/ai'

const ChangePassword = (props) => {
  const { addToast } = useToasts();
  const [passwordShown, setPasswordShown] = useState(false);

  const [passwordTextError, setPasswordTextError] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [newPasswordText, setNewPasswordText] = useState("");
  const [ConfirmPasswordText, setConfirmPasswordText] = useState("");
  const [newPasswordTextError, setNewPasswordTextError] = useState("");
  const [ConfirmPasswordTextError, setConfirmPasswordTextError] = useState("");
  // const token = props.match.params.token

  const [changePasswordMutation, { loading, error, data }] = useMutation(
    CHANGE_PASSWORD,
    {
      variables: {
        changePasswordInput: {
          OldPassword: passwordText,
          Password: newPasswordText,
        },
      },
      onError: () => {
        //Do nothing
      },
      onCompleted: () => {
        addToast("Password changed Successfully", { appearance: "success" });
        //  props.history.push('/login')
        //history.push("/welcomepage")
        props.onHide()

      },
    }
  );
  const changeHandler = (e) => {
    const { name, value } = e.target;

    if (name === "password") {
      setPasswordText(value);
      setPasswordTextError("");
    }

    if (name === "newpassword") {
      setNewPasswordText(value);
      setNewPasswordTextError("");
    }
    if (name === "confirmpassword") {
      setConfirmPasswordText(value);
      setConfirmPasswordTextError("");
    }
  };
  const SubmitHandler = async (e) => {
    let pErr = false;
    e.preventDefault();

    if (passwordText === "") {
      setPasswordTextError("Please enter old Password");
      pErr = true;
    }
    if (setNewPasswordTextError === "") {
      setNewPasswordTextError("Please enter new Password");
      pErr = true;
    }
    if (setConfirmPasswordTextError === "") {
      setNewPasswordTextError("Please enter confirm Password");
      pErr = true;
    }
    if (!pErr && passwordText && newPasswordText) {
      await changePasswordMutation();
    }
  };
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };
  return (
    <>
      <form onSubmit={SubmitHandler}>
        <div className="text-center mt-2 mb-4">
          <img className="logo" alt="logo" src={logo} />
        </div>

        <div className="form-group">
          <input
            name="password"
            type={passwordShown ? "text" : "password"}
            className={
              passwordTextError.length > 0
                ? "form-control my-3 is-invalid"
                : "form-control my-3"
            }
            onChange={changeHandler}
            value={passwordText}
            id="exampleInputPassword"
            aria-describedby="passwordHelp"
            placeholder="Old Password"
          />
               <AiFillEye size={20} className="passwordIcon" onClick={togglePassword} />

          <small id="passwordHelp" className="invalid-feedback">
            {passwordTextError}
          </small>
        </div>

        <div className="form-group">
          <input
            name="newpassword"
            type={passwordShown ? "text" : "password"}
            className={
              passwordTextError.length > 0
                ? "form-control my-3 is-invalid"
                : "form-control my-3"
            }
            onChange={changeHandler}
            value={newPasswordText}
            id="exampleInputPassword"
            aria-describedby="passwordHelp"
            placeholder="New Password"
          />
               <AiFillEye size={20} className="passwordIcon" onClick={togglePassword} />

          <small id="passwordHelp" className="invalid-feedback">
            {newPasswordTextError}
          </small>
        </div>

        <div className="form-group">
          <input
            name="confirmpassword"
            type={passwordShown ? "text" : "password"}
            className={
              passwordTextError.length > 0
                ? "form-control my-3 is-invalid"
                : "form-control my-3"
            }
            onChange={changeHandler}
            value={ConfirmPasswordText}
            id="exampleInputPassword"
            aria-describedby="passwordHelp"
            placeholder="Confirm Password"
          />
               <AiFillEye size={20} className="passwordIcon" onClick={togglePassword} />

          <small id="passwordHelp" className="invalid-feedback">
            {ConfirmPasswordTextError}
          </small>
        </div>

        <button
          type="submit"
          className="btn btn-light text-dark w-100 my-3 fw-bolder fs-5 rounded-3"
          onClick={SubmitHandler}
        >
          Save{" "}
        </button>

        <div className="d-flex justify-content-sm-between"></div>
      </form>
      {/* <div className="background">
        <div className="container">
          <div className="row justify-content-sm-center">
            <div className="col-sm-5 login-card-container">
              <div className="text-center mt-5">
                <h2>
                  <span className="text-light">
                    <b>TECHIQ</b>
                  </span>{" "}
                  <span className="text-white">PLATFORM</span>
                </h2>
                <h6 className="text-white mb-2">Welcome to TechIQ Platform!</h6>
                <h1 className="text-white">Change Password</h1>
              </div>
            
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default ChangePassword;
