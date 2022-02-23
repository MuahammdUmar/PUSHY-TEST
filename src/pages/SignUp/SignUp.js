import React, { useState, useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import StudentSignUp from "../../components/StudentSignUp/StudentSignUp";
import logo from "../../assets/images/login-logo.jpg";

const SignUp = () => {
  return (
    <div>
      <div className="container">
        <div className="text-center mt-2 mb-4">
          {/* <h2>
            <span className="text-primary">TECHIQ</span> PLATFORM
          </h2>
          <h6 className="text-muted mb-5">Welcome to TechIQ Platform!</h6>
           */}

          <img className="logo" alt="logo" src={logo} />
        </div>
        {/* <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="home" title="Student">
                        

                    </Tab>
                </Tabs> */}
        {/* <StudentSignUp /> */}
      </div>
    </div>
  );
};
export default SignUp;
