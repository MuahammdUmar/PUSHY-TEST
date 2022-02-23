import React, { useState, useEffect, useMemo } from "react";
import "./TutorSignUp.css";
// import { AiFillEdit } from 'react-icons/ai'
import { CUSTOMER_SIGN_UP, GET_ALL_COURSES } from "../../shared/constants";
import { useMutation, useQuery } from "@apollo/client";
import { useToasts } from "react-toast-notifications";
import { FaCamera } from "react-icons/fa";
import Select from "react-select";
import ImagePicker from "../../shared/file-stack/image-picker";
import countryList from "react-select-country-list";
import logo from "../../assets/images/login-logo.jpg";

const TutorSignUp = (props) => {
  const { addToast } = useToasts();
  let onlyText = /^[A-Za-z]+$/;

  let emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
  // const passwordRegex = new RegExp(
  //   "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  // );

  const [emailText, setEmailText] = useState("");
  // const [passwordText, setPasswordText] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [Dob, setDob] = useState(new Date());
  const [Address, setAddress] = useState("");
  const [CardNo, setCardNo] = useState("");
  const [attachment, setAttachment] = useState("");
  const [workExperience, setWorkExperience] = useState("");
  const [workExperienceError, setWorkExperienceError] = useState("");
  const [Qualification, setQualification] = useState("");
  const [QualificationError, setQualificationError] = useState("");
  const [firstNameError, setfirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailTextError, setEmailTextError] = useState("");
  // const [passwordTextError, setPasswordTextError] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [CardNoError, setCardNoError] = useState("");
  const [AddressError, setAddressError] = useState("");
  const [selectedCoursesError, setSelectedCoursesError] = useState("");
  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);
  const [allCourses, setAllCourses] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({});
  const [selectedCountryError, setSelectedCountryError] = useState("");

  const {
    loading: loadingCourses,
    data: dataCourses,
    error: errorCourse,
  } = useQuery(GET_ALL_COURSES);

  useEffect(() => {
    if (dataCourses) {
      console.log("all courses", dataCourses.getAllCourses);
      setAllCourses(dataCourses.getAllCourses);
    }
  }, [dataCourses]);

  const [custumer_Signup, { loading, error, data }] = useMutation(
    CUSTOMER_SIGN_UP,
    {
      variables: {
        createUsersInput: {
          Firstname: firstName,
          Lastname: lastName,
          Email: emailText,
          // Password: passwordText,
          roles: 3,
          Username: emailText,
          DOB: Dob,
          WorkExperience: workExperience,
          Address1: Address,
          CardNo: CardNo,
          Qualification: Qualification,
          CourseIds: selectedCourses.map((course) => course.value),
          Country: selectedCountry.value,
          Attachment: Object.keys(attachment).length > 0 ? attachment : null,
          //CourseGuidelines: CourseGuidelines
        },
      },
      onError: () => {
        //Do nothing
      },
      onCompleted: () => {
        addToast("Tutor Added Successfully", { appearance: "success" });
        props.history.push("/login");
        //history.push("/welcomepage")
        //props.onHide()
      },
    }
  );

  const uploadImageHandler = (files) => {
    console.log("hello", files);
    //setProjectFile(files);
    setAttachment(files);
  };

  const handleMulSelect = (selecopt) => {
    const coursIds = selecopt.map((item) => item.value);
    setSelectedCourses(selecopt);
    setSelectedCoursesError("");
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;

    // if (name === "email")
    // {
    //   setEmailText(value);
    //   setEmailTextError("");
    // }
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
   

    if (name === "workexperience") {
      if (value.toString().length <= 300) {
        setWorkExperience(value);
        setWorkExperienceError("");
      } else {
        setWorkExperienceError("Characters Limit Exceed");
      }
    }
    if (name === "qualification") {
      if (value.toString().length <= 50) {
        setQualification(value);
        setQualificationError("");
      } else {
        setQualificationError("Characters Limit Exceed");
      }
    }
    // if (name === "password") {
    //   setPasswordText(value);
    //   setPasswordTextError("");
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
        setAddressError("Characters Limit Exceed");
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
    if (name === "country") {
      setValue(value);
      //setLastNameError('')
    }
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
    //   console.log("assdd");
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
    if (selectedCourses.length === 0) {
      setSelectedCoursesError("Please Select Courses");
      pErr = true;
    }
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
                  {/* <img src="https://cdn-icons-png.flaticon.com/512/1177/1177568.png" /> */}
                  {/* <img src="https://img.icons8.com/ios-filled/100/000000/edit-administrator.png"/> */}
                </div>

                <form className="needs-validation" onSubmit={SubmitHandler}>
                  <div className="row g-3">
                    <div className="col-md-4">
                      <div className="d-inline-flex">
                        <label className="form-label fs-6 text-black">
                          First Name
                          <span className="text-danger required-text">*</span>
                        </label>
                      </div>
                      <input
                        type="text"
                        placeholder="First Name"
                        maxLength={50}
                        className={
                          firstNameError.length > 0
                            ? "form-control  is-invalid"
                            : "form-control "
                        }
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
                          aria-describedby="inputGroupPrepend"
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
                        required
                        onChange={changeHandler}
                      />
                      <div className="text-danger">{passwordTextError}</div>
                      <div className="valid-feedback">
              Please choose a password.
            </div>
                    </div>

                    <div className="col-md-4">
                      <input
                        type="password"
                        placeholder="Confirm Password"
                        className="form-control"
                        required
                      />
                      <div className="valid-feedback">Password must match</div>
                    </div> */}

                    <div className="col-md-4">
                      <div className="d-inline-flex">
                        <label className="form-label fs-6 text-black">
                          Gender
                          <span className="text-danger fs-5 required-text"></span>
                        </label>
                      </div>
                      <div className="input-group has-validation">
                        <select
                          className="form-select"
                          aria-label="Gender"
                          defaultValue={"1"}
                        >
                          {/* <option disabled>Gender</option> */}
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
                          Date
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
                          aria-describedby="inputGroupPrepend"
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
                          ID Card Number
                          <span className="text-danger fs-5 required-text"></span>
                        </label>
                      </div>
                      <div className="input-group has-validation">
                        <input
                          type="number"
                          name="cardno"
                          placeholder="ID Card Number"
                          className={
                            CardNoError.length > 0
                              ? "form-control  is-invalid"
                              : "form-control "
                          }
                          aria-describedby="inputGroupPrepend"
                          onChange={changeHandler}
                        />
                        {/* <div className="invalid-feedback">
                          Please choose a id card number
                        </div> */}
                      </div>
                      <div className="text-danger">{CardNoError}</div>
                    </div>

                    <div className="col-md-4">
                      <div className="d-inline-flex">
                        <label className="form-label fs-6 text-black">
                          Qualification
                          <span className="text-danger fs-5 required-text"></span>
                        </label>
                      </div>
                      <div className="input-group has-validation">
                        <input
                          type="text"
                          name="qualification"
                          placeholder="Qualification"
                          className={
                            QualificationError.length > 0
                              ? "form-control  is-invalid"
                              : "form-control "
                          }
                          onChange={changeHandler}
                          aria-describedby="inputGroupPrepend"
                        />
                        {/* <div className="valid-feedback">
                        Please choose a Qualification.
                      </div> */}
                      </div>
                      <div className="text-danger">{QualificationError}</div>
                    </div>

                    <div className="col-md-4">
                      <div className="d-inline-flex">
                        <label className="form-label fs-6 text-black">
                          Work Experience
                          <span className="text-danger fs-5 required-text"></span>
                        </label>
                      </div>
                      <div className="input-group has-validation">
                        <input
                          type="number"
                          name="workexperience"
                          placeholder="Work Experience"
                          className="form-control"
                          className={
                            workExperienceError.length > 0
                              ? "form-control  is-invalid"
                              : "form-control "
                          }
                          onChange={changeHandler}
                          aria-describedby="inputGroupPrepend"
                        />
                        {/* <div className="valid-feedback">Password must match</div> */}
                      </div>
                      <div className="text-danger">{workExperienceError}</div>
                    </div>

                    <div className="col-md-4">
                      <div className="d-inline-flex">
                        <label className="form-label fs-6 text-black">
                          Select Courses
                          <span className="text-danger required-text">*</span>
                        </label>
                      </div>
                      <Select
                        value={selectedCourses}
                        onChange={handleMulSelect}
                        className={
                          selectedCoursesError.length > 0
                            ? "form-control  is-invalid"
                            : " "
                        }
                        options={allCourses.map((course) => ({
                          value: course.id,
                          label: course.CourseName,
                        }))}
                        placeholder="Select Courses"
                        isClearable
                        isMulti
                      />
                      <div className="text-danger">{selectedCoursesError}</div>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label fs-6 text-black">
                        Select Country
                        <span className="text-danger fs-5 required-text"></span>
                      </label>

                      <Select
                        value={
                          Object.keys(selectedCountry).length === 0
                            ? undefined
                            : selectedCountry
                        }
                        onChange={handleSelectCountry}
                        options={options}
                        placeholder="Select Country"
                      />
                      {/* <input type="text" placeholder="Qualification" className="form-control" required /> */}
                      <div className="text-danger">{selectedCountryError}</div>
                    </div>
                  </div>

                  <div className="row mb-3 mt-3 justify-content-center">
                    <div className="col-4">
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
export default TutorSignUp;
