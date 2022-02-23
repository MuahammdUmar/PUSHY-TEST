import React, { useState, useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import StudentSignUp from "../../components/StudentSignUp/StudentSignUp";
import TutorSignUp from "../../components/TutorSignUp/TutorSignUp";
import logo from "../../assets/images/login-logo.jpg";

const SignUpTutor = (props) => {
  return (
    <div>
      <div className="container">
        <div className="text-center mt-2 mb-4">
          {/* <h2>
            <span className="text-primary">TECHIQ</span> PLATFORM
          </h2> */}

          <img className="logo" alt="logo" src={logo} />
        </div>
        {/* <Tabs id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="profile" title="Tutor">
                    </Tab>
                </Tabs> */}
        {/* <TutorSignUp /> */}
      </div>
    </div>
  );
};
export default SignUpTutor;
