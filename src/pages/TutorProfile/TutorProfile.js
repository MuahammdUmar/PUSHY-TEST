import React, { useState, useEffect, useMemo } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Header from "../Header/Header";
import "./TutorProfile.css";
import { Button, Modal } from "react-bootstrap";
import profilepic from "../../assets/images/profilePic.jpg";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_ALL_COURSES,
  GET_TUTOR_BY_ID,
  GET_USER_ID,
  UPDATE_USER,
} from "../../shared/constants";
import { useToasts } from "react-toast-notifications";
import { Link, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ImagePicker from "../../shared/file-stack/image-picker";
import ChangePassword from "../ChangePassword/ChangePassword";
import countryList from "react-select-country-list";
import Select from "react-select";

const TutorProfile = (props) => {
  const { prevPath } = props.history.location.state;

  const user = JSON.parse(localStorage.getItem("user"));

  const { addToast } = useToasts();
  const history = useHistory();
  const [show, setShow] = useState(false);
  // console.log(finalUserId)
  const [attachment, setAttachment] = useState({});
  const [attachmentError, setAttachmentError] = useState("");
  const [emailText, setEmailText] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [selectedCountry, setSelectedCountry] = useState({});
  const [selectedCountryError, setSelectedCountryError] = useState("");

  const [allCourses, setAllCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);

  const [addressText, setAddressText] = useState("");
  const [addressTextError, setAddressTextError] = useState("");
  const [idCard, setIdCard] = useState("");
  const [idCardError, setIdCardError] = useState("");

  // const [dob, setDob] = useState(new Date());
  // const [dobISO, setDobISO] = useState('');
  const [addressOne, setAddressOne] = useState("");
  const [gender, setGender] = useState("");
  // const [idCard, setIdCard] = useState('')

  const options = useMemo(() => countryList().getData(), []);

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailTextError, setEmailTextError] = useState("");
  const [dobError, setDobError] = useState("");
  const [addressOneError, setAddressOneError] = useState("");
  const [genderError, setGenderError] = useState("");

  const {
    loading: loadingStudent,
    data: dataStudent,
    error: errorStudent,
  } = useQuery(GET_TUTOR_BY_ID, {
    variables: { id: user && user.id },
    skip: user && user.id === undefined,
    onError: () => {
      // props.onHide();
    },
  });

  const {
    loading: loadingCourses,
    data: dataCourses,
    error: errorCourse,
  } = useQuery(GET_ALL_COURSES, {
    onError: () => {},
    onCompleted: () => {},
  });

  const [update, { loading, error, data }] = useMutation(UPDATE_USER, {
    variables: {
      updateUserInput: {
        Firstname: firstName,
        Lastname: lastName,
        Email: emailText,
        Country: selectedCountry.value,
        CourseIds: selectedCourses.map((c) => c.value),
        Attachment: attachment,
      },
      id: user && user.id,
    },
    onCompleted: (data) => {
      addToast("User saved Successfully", { appearance: "success" });
      // props.onHide()
      // window.location.reload()
      props.history.push(prevPath)

    },
    onError: () => {
      //Do nothing
    },
    update: (cache) => {
      cache.evict({
        id: "ROOT_QUERY",
        field: "id",
      });
    },
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    //console.log(finalUserId)

    if (name === "firstname") {
      console.log("fname");

      setFirstName(value);
      setFirstNameError("");
      // } else if (name === "dob") {
      //   setDob(value)
      //   if(value !== '' && value !== null){
      //     setDobISO(new Date(value).toISOString())
      //   }
      //   setDobError("")
      // }
    } else if (name === "email") {
      setEmailText(value);
      setEmailTextError("");
    } else if (name === "lastname") {
      setLastName(value);
      setLastNameError("");
    } else if (name === "idCard") {
      setIdCard(value);
      setIdCardError("");
    } else if (name === "addressText") {
      setAddressText(value);
      setAddressTextError("");
    }
  };
  const submitHandler = async (e) => {
    let pErr = false;
    e.preventDefault();

    if (firstName === "") {
      setFirstNameError("Please enter first name");
      pErr = true;
    }
    if (lastName === "") {
      setLastNameError("Please enter last name");
      pErr = true;
    }

    if (Object.keys(selectedCountry) == 0) {
      setSelectedCountryError("Please select country");
      pErr = true;
    }
    // if(attachment !== null){
    //   Object.keys(attachment).length === 0
    // }
    if (attachment === null) {
      setAttachmentError("Please upload attatchement");
      pErr = true;
    }
    // if(attachment !== null && Object.keys(attachment).length === 0){
    //   setAttachmentError("Please upload attatchement")
    //   pErr = true;
    // }
    if (!pErr && emailText && firstName) {
      await update();
    }
  };

  useEffect(() => {
    if (dataStudent) {
      console.log("dataStudent", dataStudent.TutorById);
      setFirstName(dataStudent.TutorById.Firstname);
      setLastName(dataStudent.TutorById.Lastname);
      setEmailText(dataStudent.TutorById.Email);
      // if(dataStudent.TutorById.DOB !== null){
      //   setDob(dataStudent.TutorById.DOB.substr(0, 10));
      //   setDobISO(dataStudent.TutorById.DOB)
      // }
      setAddressText(dataStudent.TutorById.Address1);
      setIdCard(dataStudent.TutorById.CardNo);
      setSelectedCountry({
        value: dataStudent.TutorById.Country,
        label: options.filter(
          (coun) => coun.value === dataStudent.TutorById.Country
        )[0].label,
      });
      if (dataStudent.TutorById.Courses !== null) {
        setSelectedCourses(
          dataStudent.TutorById.Courses.map((int) => ({
            value: int.id,
            label: int.CourseName,
          }))
        );
      }
      setAttachment(dataStudent.TutorById.Attachment);
      //setGender()
      //setIdCard()
    }
  }, [dataStudent]);

  useEffect(() => {
    if (dataCourses) {
      setAllCourses(dataCourses.getAllCourses);
    }
  }, [dataCourses]);

  const uploadImageHandler = (files) => {
    console.log("hello", files);
    //setProjectFile(files);
    setAttachment(files);
    setAttachmentError("");
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSelectCountry = (selecopt) => {
    const value = selecopt === null ? "" : selecopt;
    setSelectedCountry(selecopt);
    setSelectedCountryError("");
  };

  const handleSelectCourse = (selecopt) => {
    const value = selecopt === null ? "" : selecopt;
    setSelectedCourses(selecopt);
  };
  return (
    <>
      <Header />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ChangePassword  onHide={handleClose} />
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save 
          </Button>
        </Modal.Footer> */}
      </Modal>
      <div className="tutornav py-5">
        <div className="container">
          <h4 className="text-white mb-0">Tutor Profile</h4>
        </div>
      </div>

      <div className="container">
        <div class="card card-primary mt-5 custom-card">
          <div class="card-header">
            <h4 className="mb-0">Edit Profile</h4>
          </div>

          <form className="needs-validation" novalidate>
            <div className="card-body">
              <div className="row">
                <div className="col-md-9">
                  <div className="row row-cols-2">
                    <div className="col mb-3">
                      <lable>
                        First Name
                        <span className="text-danger required-text">*</span>
                      </lable>
                      <input
                        type="text"
                        name="firstname"
                        placeholder="First Name"
                        className={
                          firstNameError.length > 0
                            ? "form-control  is-invalid"
                            : "form-control "
                        }
                        maxLength={"50"}
                        id="validationCustom01"
                        onChange={changeHandler}
                        value={firstName}
                        required
                      />
                      <div className="text-danger">{firstNameError}</div>

                      {/* <div className="valid-feedback">
                        Please choose a first name.
                      </div> */}
                    </div>

                    <div className="col mb-3">
                      <lable>Email Address</lable>
                      <input
                        type="text"
                        name="email"
                        placeholder="Email Address"
                        className="form-control"
                        id="validationCustom01"
                        onChange={changeHandler}
                        value={emailText}
                        readOnly
                        required
                      />
                      <div className="valid-feedback">
                        Please choose a Email name.
                      </div>
                    </div>

                    <div className="col mb-3">
                      <lable>
                        Last Name
                        <span className="text-danger required-text">*</span>
                      </lable>
                      <input
                        type="text"
                        name="lastname"
                        placeholder="Last Name"
                        className={
                          lastNameError.length > 0
                            ? "form-control  is-invalid"
                            : "form-control "
                        }
                        maxLength={"50"}
                        id="validationCustom02"
                        onChange={changeHandler}
                        value={lastName}
                        required
                      />
                      <div className="text-danger">{lastNameError}</div>
                      {/* <div className="valid-feedback">
                        Please choose a last name.
                      </div> */}
                    </div>

                    <div className="col mb-3">
                      <lable>ID Card</lable>
                      <input
                        type="number"
                        placeholder="ID Card Number"
                        className="form-control"
                        name="idCard"
                        maxLength={"50"}
                        value={idCard}
                        onChange={changeHandler}
                      />
                      <div className="valid-feedback">
                        Please choose a Phone no.
                      </div>
                    </div>

                    <div className="col mb-3">
                      <lable>Gender</lable>

                      <div className="input-group has-validation">
                        <select
                          name="gender"
                          className="form-select"
                          aria-label="Gender"
                        >
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

                    <div className="col mb-3">
                      <lable>Address</lable>
                      <div className="input-group has-validation">
                        <input
                          type="text"
                          placeholder="Address"
                          className="form-control"
                          name="addressText"
                          maxLength={"300"}
                          onChange={changeHandler}
                          value={addressText}
                        />
                        <div className="invalid-feedback">
                          Please choose gender.
                        </div>
                      </div>
                    </div>

                    <div className="col mb-3">
                      <label>Country</label>
                      <Select
                        options={options}
                        value={selectedCountry}
                        placeholder="Select Country"
                        onChange={handleSelectCountry}
                      />
                      {/* <input type="text" placeholder="Qualification" className="form-control" required /> */}
                      <div className="text-danger">{selectedCountryError}</div>
                    </div>

                    <div className="col mb-3">
                      <label>Courses</label>
                      <Select
                        options={
                          allCourses !== null
                            ? allCourses.map((c) => ({
                                value: c.id,
                                label: c.CourseName,
                              }))
                            : []
                        }
                        value={selectedCourses}
                        placeholder="Select Course"
                        onChange={handleSelectCourse}
                        isMulti
                      />
                      {/* <input type="text" placeholder="Qualification" className="form-control" required /> */}
                      <div className="text-danger">{selectedCountryError}</div>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <ImagePicker
                    data={attachment}
                    afterUpload={uploadImageHandler}
                    label={"Upload Image"}
                    avatar={true}
                  />
                  <div className="text-danger">{attachmentError}</div>
                </div>
              </div>
            </div>

            <div className="card-footer justify-content-end d-flex">
              <button
                className="btn btn-primary ms-2"
                type="submit"
                onClick={submitHandler}
              >
                Save
              </button>

              <button
                className="btn btn-primary ms-2"
                onClick={() => props.history.push(prevPath)}
              >
                {/* <Link
                      to="/"
                      className="text-white text-decoration-none"
                    >
                      Cancel
                    </Link> */}
                Cancel
              </button>

              <button
                type="button"
                className="btn btn-primary ms-2"
                onClick={handleShow}
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default TutorProfile;
