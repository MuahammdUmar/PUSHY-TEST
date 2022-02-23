import React, { useState } from "react";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";
import { FORGOT_PASSWORD } from "../../shared/constants";
import { useMutation, useQuery } from "@apollo/client";
import { useToasts } from "react-toast-notifications";
import logo from "../../assets/images/login-logo.jpg";

const ForgotPassword = (props) => {
  const { addToast } = useToasts();

  const [emailText, setEmailText] = useState("");
  const [emailTextError, setEmailTextError] = useState("");
  let emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

  const [forgot, { loading, error, data }] = useMutation(FORGOT_PASSWORD, {
    variables: {
      forgetPasswordInput: {
        Email: emailText,

        //CourseGuidelines: CourseGuidelines
      },
    },
    onError: () => {
      //Do nothing
    },
    onCompleted: () => {
      addToast("Email Sent Successfully", { appearance: "success" });
      props.history.push("/login");
      //history.push("/welcomepage")
      //props.onHide()
    },
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmailText(value);
      setEmailTextError("");
    }
  };
  const SubmitHandler = async (e) => {
    let pErr = false;
    e.preventDefault();
    if (!emailRegex.test(String(emailText).toLowerCase())) {
      setEmailTextError("Please enter Email");
      pErr = true;
    }

    if (!pErr && emailText) {
      await forgot();
    }
  };

  return (
    <>
      {/* <Header/> */}
      <div className="background">
        <div className="container mt-3">
          <div className="row justify-content-sm-center">
            <div className="col-md-4">
              <div className="login-card-container pt-3 pb-3">
                <div className="text-center mt-2 mb-4">
                  <img className="logo" alt="logo" src={logo} />
                </div>

                <div className="row">
                  <div className="col">
                    <lable>
                      <b className="fs-5 text-black">Registered Email</b>
                    </lable>
                    <input
                      className="form-control mt-3"
                      name="email"
                      type="email"
                      placeholder=" Email Address"
                      onChange={changeHandler}
                    />
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-4">
                    <Link className="btn btn-dark w-100" to="/login">
                      Back
                    </Link>
                    {/* <Link to="/login"><button className='btn btn-dark w-25 ms-2'>Done</button></Link>
                     */}
                    {/* <button type="submit" className="btn btn-dark  w-25 my-3 fw-bolder fs-5 rounded-3" onClick={SubmitHandler}>Done</button> */}
                  </div>

                  <div className="col-4">
                    <button
                      type="submit"
                      className="btn btn-dark w-100"
                      onClick={SubmitHandler}
                    >
                      Done
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
