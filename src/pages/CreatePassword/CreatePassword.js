import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NEW_PASSWORD } from "../../shared/constants";
import { useMutation, useQuery } from "@apollo/client";
import { useToasts } from "react-toast-notifications";
import logo from "../../assets/images/login-logo.jpg";
import {AiFillEye} from 'react-icons/ai'

const CreatePassword = (props) => {
  const { addToast } = useToasts();

  const [passwordTextError, setPasswordTextError] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [confirmPasswordText, setConfirmPasswordText] = useState("");
  const [confirmPasswordTextError, setConfirmPasswordTextError] = useState("");
  const token = props.match.params.token;
  const [passwordShown, setPasswordShown] = useState(false);

  const [resetPasswordMutation, { loading, error, data }] = useMutation(
    NEW_PASSWORD,
    {
      variables: {
        resetPasswordInput: {
          Password: passwordText,
          Token: token,
        },
      },
      onError: () => {
        //Do nothing
      },
      onCompleted: () => {
        addToast("Password Saved Successfully", { appearance: "success" });
        props.history.push("/login");
        //history.push("/welcomepage")
        //props.onHide()
      },
    }
  );
  const changeHandler = (e) => {
    const { name, value } = e.target;

    if (name === "password") {
      setPasswordText(value);
      setPasswordTextError("");
    }

    if (name === "confirmpassword") {
      setConfirmPasswordText(value);
      setPasswordTextError("");
    }
  };
  const SubmitHandler = async (e) => {
    let pErr = false;
    e.preventDefault();

    if (passwordText === "") {
      setPasswordTextError("Please enter Password");
      pErr = true;
    }
    if (setConfirmPasswordTextError === "") {
      setPasswordTextError("Please enter Confirm Password");
      pErr = true;
    }
    if (!pErr && passwordText && passwordText) {
      await resetPasswordMutation();
    }
  };
  const togglePassword = () => {
    console.log("testing. . . .  .")
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };
  return (
    <>
      <div className="background">
        <div className="container">
          <div className="row justify-content-sm-center">
            <div className="col-sm-5 login-card-container">
              <div className="text-center mt-3">
                {/* <h2>
                  <span className="text-light">
                    <b>TECHIQ</b>
                  </span>
                  <span className="text-white">PLATFORM</span>
                </h2>
                <h6 className="text-white mb-2">Welcome to TechIQ Platform!</h6> */}

                <img className="logo" alt="logo" src={logo} />
              </div>
              <form onSubmit={SubmitHandler}>
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
                    placeholder=" Password"
                  />
               <AiFillEye size={20} className="passwordIcon" onClick={togglePassword} />

                  <small id="passwordHelp" className="invalid-feedback">
                    {passwordTextError}
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
                    value={confirmPasswordText}
                    id="exampleInputPassword"
                    aria-describedby="passwordHelp"
                    placeholder="Confirm Password"
                  />
               <AiFillEye size={20} className="passwordIcon" onClick={togglePassword} />

                  <small id="passwordHelp" className="invalid-feedback">
                    {confirmPasswordTextError}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePassword;
