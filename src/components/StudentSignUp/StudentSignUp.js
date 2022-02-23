import React, { useState, useEffect, useMemo } from "react";
import "./StudentSignUp.css";
// import { AiFillEdit } from 'react-icons/ai'
import { allTags, CUSTOMER_SIGN_UP } from "../../shared/constants";
import { useMutation, useQuery } from "@apollo/client";
import { useToasts } from "react-toast-notifications";
import { FaCamera } from "react-icons/fa";
import ImagePicker from "../../shared/file-stack/image-picker";
import Select from "react-select";
import countryList from "react-select-country-list";
import logo from "../../assets/images/login-logo.jpg";

const StudentSignUp = (props) => {
  const { addToast } = useToasts();

  let emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
  let onlyText = /^[A-Za-z]+$/;
  // const passwordRegex = new RegExp(
  //   "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  // );
  const [CardNoError, setCardNoError] = useState("");

  const [emailText, setEmailText] = useState("");
  // const [passwordText, setPasswordText] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [Dob, setDob] = useState(new Date());
  const [Address, setAddress] = useState("");
  const [CardNo, setCardNo] = useState("");
  const [attachment, setAttachment] = useState("");

  const options = useMemo(() => countryList().getData(), []);
  const [selectedCountry, setSelectedCountry] = useState({});
  const [selectedCountryError, setSelectedCountryError] = useState("");

  const [firstNameError, setfirstNameError] = useState("");
  const [AddressError, setAddressError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailTextError, setEmailTextError] = useState("");
  // const [passwordTextError, setPasswordTextError] = useState("");
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedInterestsError, setSelectedInterestsError] = useState("");

  const [custumer_Signup, { loading:Signup, error, data }] = useMutation(
    CUSTOMER_SIGN_UP,
    {
      variables: {
        createUsersInput: {
          Firstname: firstName,
          Lastname: lastName,
          Email: emailText,
          // Password: passwordText,
          roles: 1,
          Username: emailText,
          DOB: Dob,
          Address1: Address,
          CardNo: CardNo,
          Interests: selectedInterests.map((i) => i.value),
          Country: selectedCountry.value,
          Attachment: Object.keys(attachment).length > 0 ? attachment : null,

          //CourseGuidelines: CourseGuidelines
        },
      },
      onError: () => {
        //Do nothing
      },
      onCompleted: () => {
        addToast("Student Added Successfully", { appearance: "success" });
        setTimeout(() => props.history.push("/login"), 5000);

        //history.push("/welcomepage")
        //props.onHide()
      },
    }
  );

  const uploadImageHandler = (files) => {
    setAttachment(files);
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      if (value.toString().length <= 50) {
        setEmailText(value);
        setEmailTextError("");
      } else {
        setEmailTextError("Characters Limit Exceed");
      }
    }
    if (name === "firstname") {

      if(value.match(onlyText)){
        setfirstName(value);
        setfirstNameError("");
      }
      if(!value.match(onlyText)){
        setfirstNameError('Please enter only text');
      }
     
    }
    if (name === "lastname") {

      if(value.match(onlyText)){
        setLastName(value);
        setLastNameError("");
      }
      if(!value.match(onlyText)){
        setLastNameError('Please enter only text');
      }
     
    }
    // if (name === "lastname") {
    //   if (value.toString().length <= 50) {
    //     setLastName(value);
    //     setLastNameError("");
    //   } else {
    //     setLastNameError("Characters Limit Exceed");
    //   }
    // }
    if (name === "dob") {
      setDob(value);
      //setLastNameError('')
    }
    if (name === "address") {
      if (value.toString().length <= 300) {
        setAddress(value);
        setAddressError("");
      } else {
      }
    }
    if (name === "cardno") {
      if (value.toString().length <= 50) {
        setCardNo(value);
        setCardNoError("");
      } else {
        setCardNoError("Number Limit Exceed");
      }
    }
  };

  const handleInterestsSelect = (selecopt) => {
    const value = selecopt === null ? "" : selecopt;
    setSelectedInterests(value);
    setSelectedInterestsError("");
  };

  const SubmitHandler = async (e) => {
    console.log("hello");

    let pErr = false;
    e.preventDefault();
    if (!emailRegex.test(String(emailText).toLowerCase())) {
      setEmailTextError("Please enter valid Email");
      pErr = true;
    }
    if (emailTextError != "") {
      pErr = true;
    }
    if (AddressError != "") {
      // setAddressError("Please enter minimum characters");
      pErr = true;
    }
    // if (!passwordRegex.test(String(passwordText))) {
    //   setPasswordTextError(
    //     "a password must be eight characters including one uppercase letter, one special character and alphanumeric characters"
    //   );
    //   pErr = true;
    // }
    if (firstName === "") {
      setfirstNameError("Please enter Firstname");
      pErr = true;
    }
    if (firstNameError != "") {
      // setfirstNameError("Please enter minimum characters");
      pErr = true;
    }

    if (lastName === "") {
      setLastNameError("Please enter Lastname");
      pErr = true;
    }
    if (lastNameError != "") {
      // setLastNameError("Please enter minimum characters");
      pErr = true;
    }

    if (selectedInterests.length === 0) {
      setSelectedInterestsError("Please select interests, it's required");
      pErr = true;
    }

    // if (Object.keys(selectedCountry) == 0) {
    //   setSelectedCountryError("Please select country");
    // }
    console.log("error", selectedCountry);
    if (!pErr && emailText && firstName) {
      console.log("hello inside");
      await custumer_Signup();
    }
  };

  const handleSelectCountry = (selecopt) => {
    const value = selecopt === null ? "" : selecopt;
    setSelectedCountry(selecopt);
    setSelectedCountryError("");
  };

  return (
    <>
      <div className="background">
        <div className="container mt-3">
          <div className="row justify-content-sm-center">
            <div className="col-md-8">
              <div className="login-card-container">
                <div className="text-center mt-2 mb-4">
                  {/* <h2>
                    <span className="text-primary">TECHIQ</span>
                    <span class="text-black"> PLATFORM</span>
                  </h2>
                  <h6 className="text-black mb-5">
                    Welcome to TechIQ Platform!
                  </h6> */}

                  <img className="logo" alt="logo" src={logo} />
                </div>

                <div className="avaterimage">
                  <ImagePicker
                    data={attachment}
                    afterUpload={uploadImageHandler}
                    label={<FaCamera size={25} />}
                  />
                  {/* <img src="https://mui.com/static/images/avatar/2.jpg" alt="image" /> */}
                  {/* <img src="https://cdn-icons-png.flaticon.com/512/1177/1177568.png" />
          <FaCamera size={25} /> */}
                  {/* <img src="https://img.icons8.com/ios-filled/100/000000/edit-administrator.png"/> */}
                </div>

                <form
                  className="needs-validation"
                  onSubmit={SubmitHandler}
                  novalidate
                >
                  <div className="row g-3">
                    <div className="col-md-4">
                      <div className="d-inline-flex">
                        <label className="form-label fs-6 text-black">
                          First Name
                          <span className="text-danger  required-text">*</span>
                        </label>
                      </div>
                      <input
                        type="text"
                        maxLength={50}
                        placeholder="First Name"
                        className={
                          firstNameError.length > 0
                            ? "form-control  is-invalid"
                            : "form-control "
                        }
                        id="validationCustom01"
                        maxLength={50}
                        name="firstname"
                        // value={firstName}
                        onChange={changeHandler}
                      />
                      <div className="text-danger">{firstNameError}</div>
                    </div>

                    <div className="col-md-4">
                      <div className="d-inline-flex">
                        <label className="form-label fs-6 text-black">
                          Last Name
                          <span className="text-danger required-text">*</span>
                        </label>
                      </div>
                      <input
                        type="text"
                        name="lastname"
                        maxLength={50}

                        placeholder="Last Name"
                        className={
                          lastNameError.length > 0
                            ? "form-control  is-invalid"
                            : "form-control "
                        }
                        onChange={changeHandler}
                      />
                      <div className="text-danger">{lastNameError}</div>
                      {/* <div className="valid-feedback">
              Please choose a last name.
            </div> */}
                    </div>

                    <div className="col-md-4">
                      <div className="d-inline-flex">
                        <label className="form-label fs-6 text-black">
                          Email Address
                          <span className="text-danger required-text">*</span>
                        </label>
                      </div>
                      <div className="input-group has-validation">
                        <input
                          type="text"
                          name="email"
                          placeholder="Email"
                          className={
                            emailTextError.length > 0
                              ? "form-control  is-invalid"
                              : "form-control "
                          }
                          onChange={changeHandler}
                        />

                        {/* <div className="invalid-feedback">
                Please choose a username.
              </div> */}
                      </div>
                      <div className="text-danger">{emailTextError}</div>
                    </div>

                    {/* <div className="col-md-4">
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="form-control"
                        onChange={changeHandler}
                      />
                      <div className="text-danger">{passwordTextError}</div>
                      <div className="valid-feedback">
              Please choose a password.
            </div>
                    </div> */}

                    {/* <div className="col-md-4">
                      <input
                        type="password"
                        placeholder="Confirm Password"
                        className="form-control"
                        onChange={changeHandler}
                      />
                      <div className="valid-feedback">Password must match</div>
                    </div> */}

                    <div className="col-md-4">
                      <div className="d-inline-flex">
                        <label className="form-label fs-6 text-black">
                          Gender
                          <span className="text-danger fs-5 required-text">
                            {" "}
                          </span>
                        </label>
                      </div>
                      <div className="input-group has-validation">
                        <select className="form-select" aria-label="Gender">
                          <option selected disabled>
                            Gender
                          </option>
                          <option value="1">Male</option>
                          <option value="2">Female</option>
                        </select>
                        <div className="invalid-feedback">
                          Please choose gender.
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="d-inline-flex">
                        <label className="form-label fs-6 text-black">
                          Date of Birth
                          <span className="text-danger fs-5 required-text"></span>
                        </label>
                      </div>
                      <input
                        type="date"
                        name="dob"
                        placeholder="Date Of Birth"
                        className="form-control"
                        onChange={changeHandler}
                      />
                      <div className="valid-feedback">
                        Please choose a dat of birth.
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="d-inline-flex">
                        <label className="form-label fs-6 text-black">
                          Address
                          <span className="text-danger fs-5 required-text"></span>
                        </label>
                      </div>
                      <div className="input-group has-validation">
                        <input
                          type="text"
                          name="address"
                          placeholder="Address"
                          className={
                            AddressError.length > 0
                              ? "form-control  is-invalid"
                              : "form-control "
                          }
                          onChange={changeHandler}
                        />
                        {/* <div className="invalid-feedback">
                          Please choose a Address
                        </div> */}
                      </div>
                      <div className="text-danger">{AddressError}</div>
                    </div>

                    <div className="col-md-4">
                      <div className="d-inline-flex">
                        <label className="form-label fs-6 text-black">
                          Interset
                          <span className="text-danger required-text">*</span>
                        </label>
                      </div>
                      <Select
                        value={selectedInterests}
                        onChange={handleInterestsSelect}
                        className={
                          selectedInterestsError.length > 0
                            ? "form-control  is-invalid"
                            : " "
                        }
                        options={allTags}
                        placeholder={`Select interests`}
                        isClearable
                        isMulti
                      />
                      <div className="text-danger">
                        {selectedInterestsError}
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="d-inline-flex">
                        <label className="form-label fs-6 text-black">
                          ID Card Number
                          <span className="text-danger fs-5 required-text"></span>
                        </label>
                      </div>
                        <input
                          type="number"
                          name="cardno"
                          placeholder="ID Card Number"
                          className="form-control"
                          onChange={changeHandler}
                        />
                         <div className="text-danger">{CardNoError}</div>

                    </div>

                    <div className="col-md-4">
                      <div className="d-inline-flex">
                        <label className="form-label fs-6 text-black">
                          Country
                          <span className="text-danger fs-5 required-text"></span>
                        </label>
                      </div>
                      <Select
                        options={options}
                        value={selectedCountry}
                        // value={Object.keys(selectedCountry).length === 0 ? undefined : selectedCountry}
                        placeholder="Select Country"
                        onChange={handleSelectCountry}
                      />
                      {/* <input type="text" placeholder="Qualification" className="form-control" required /> */}
                      <div className="text-danger">{selectedCountryError}</div>
                    </div>
                  </div>

                  <div className="row mb-3 mt-3 justify-content-center">
                    <div className="col-md-4">
                      <button className="btn btn-primary w-100" type="submit">
                        Register
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default StudentSignUp;
