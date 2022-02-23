import React, { useState } from "react";
import "./Login.css";
import PasswordStrengthIndicator from './PasswordStrengthIndicator'
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SIGN_IN } from "../../shared/constants";
import { Spinner } from "react-bootstrap";
import {AiFillEye} from 'react-icons/ai'
import logo from "../../assets/images/login-logo.jpg";
const isNumberRegx = /\d/;
// const specialCharacterRegx = ("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
const specialCharacterRegx = /[A-Z/!@#$%^&*]/;
const Login = (props) => {

  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [emailTextError, setEmailTextError] = useState("");
  const [passwordTextError, setPasswordTextError] = useState("");
  //const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  let emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
  const [passwordShown, setPasswordShown] = useState(false);
  const pushyToken = JSON.parse(localStorage.getItem("devicetoken"));

  const [passwordFocused, setPasswordFocused] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordValidity, setPasswordValidity] = useState({
      minChar: null,
      
      number: null,
      specialChar: null
  });

  // const onChangePassword = (e) => {
      
  // };
  const [login, { loading, error, data }] = useMutation(SIGN_IN, {
    variables: {
      usersInput: {
        Username: emailText,
        Password: passwordText,
        DeviceToken: pushyToken
      },
    },
    onCompleted: (data) => {
      localStorage.setItem(
        "accessToken",
        JSON.stringify(data.signIn.accessToken)
      );
      console.log("test", data.signIn);
      localStorage.setItem("user", JSON.stringify(data.signIn));

      if (data.signIn.roles === 3) {
        // props.history.push('/tutordashboard')

        props.history.push({
          pathname: "/tutordashboard",

          state: { userId: data.signIn.id },
        });
      }
      if (data.signIn.roles === 1) {
        // props.history.push('/tutordashboard')

        props.history.push({
          pathname: "/studentdashboard",
          state: { userId: data.signIn.id },
        });
      }
      if (data.signIn.roles === 2) {
        // props.history.push('/tutordashboard')
        props.history.push({pathname: "/admindashboard", state: { userId: data.signIn.id }});
      }
    },
    onError: ({ graphQLErrors, networkError }) => {
      console.log("errors", graphQLErrors, networkError);
      graphQLErrors.map((error) => {
        // addToast(error.message.message, { appearance: "error" });
        //console.log("errors", error.networkError.result.errors);
      });
    },
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmailText(value);
      setEmailTextError("");
    }
     else if (name === "password") {
      setPasswordText(value);
      setPassword(e.target.value);

      setPasswordValidity({
          minChar: value.length >= 8 ? true : false,
          number: isNumberRegx.test(value) ? true : false,
          specialChar: specialCharacterRegx.test(value) ? true : false,
          upperCase: specialCharacterRegx.test(value) ? true : false,
      });
      setPasswordTextError("");
    }
  };
  const SubmitHandler = async (e) => {
    let pErr = false;
    e.preventDefault();
    if (!emailRegex.test(String(emailText).toLowerCase())) {
      setEmailTextError("Please enter Email");
      pErr = true;
    }
    if (passwordText === "") {
      setPasswordTextError("Please enter Password");
      pErr = true;
    }
    if (!pErr && emailText && passwordText) {
      await login();
    }
  };
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };
  return (
    <div className="background">
      <div className="container">
        <div className="row justify-content-sm-center">
          <div className="col-sm-5 login-card-container">
            <div className="text-center mt-2 mb-4">
              {/* <h2>
                <span className="text-primary">TECHIQ</span>{" "}
                <span className="text-white">PLATFORM</span>
              </h2>
              <h6 className="text-white mb-5">Welcome to TechIQ Platform!</h6> */}
              <img className="logo" alt="logo" src={logo} />
            </div>
            <form onSubmit={SubmitHandler}>
              <div class="form-group">
                <input
                  name="email"
                  type="text"
                  className={
                    emailTextError.length > 0
                      ? "form-control my-3 is-invalid"
                      : "form-control my-3"
                  }
                  onChange={changeHandler}
                  value={emailText}
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="User Name"
                />
                <small id="emailHelp" className="invalid-feedback">
                  {emailTextError}
                </small>
              </div>
              <div class="form-group">
                <input
                  name="password"
                  type={passwordShown ? "text" : "password"}
                  className={
                    passwordTextError.length > 0
                      ? "form-control my-3 is-invalid"
                      : "form-control my-3"
                  }
                  onChange={changeHandler}
                  onFocus={() => setPasswordFocused(true)}
                  
                  value={password}
                  id="exampleInputPassword"
                  aria-describedby="passwordHelp"
                  placeholder="Password"
                />
               <AiFillEye size={20} className="passwordIcon" onClick={togglePassword} />
                <small id="passwordHelp" className="invalid-feedback">
                  {passwordTextError}
                </small>
              </div>
              {passwordFocused && <PasswordStrengthIndicator validity={passwordValidity} />}
              <div class="form-group form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Remember me
                </label>
                <Link
                  className="text-left text-black ml-5 forgotbtn"
                  to="/forgotpassword"
                >
                  Forgot your password?
                </Link>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 my-3 fw-bolder fs-5 rounded-3"
              >
                Sign In
              </button>
              <div className="d-flex justify-content-sm-between">
                <Link
                  to="/signup"
                  className="text-decoration-none text-white btn btn-dark w-50 my-3 fw-bolder fs-6 rounded-3 "
                >
                  Sign Up As Student
                </Link>
                <Link
                  to="/signuptutor"
                  className="text-decoration-none text-white btn btn-dark w-50 my-3 fw-bolder fs-6 rounded-3 ms-3"
                >
                  Sign Up As Tutor
                </Link>
              </div>
              {/* Social Logins */}
              <div className="mb-5 mt-5">
                {/* <a href="/"><img id="img1"  src={google} alt="googlelogo"/></a>
                                        <a href="/"><img id="img2" src={facebook} alt="facebooklogo"/></a> */}
              </div>
            </form>
          </div>
        </div>
        {loading && (
          <div className="loading-indicator">
            <Spinner animation="border" variant="primary" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
