import React, { useState, useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Header from "../Header/Header";
import "./AdminProfile.css";
import { Button, Modal } from "react-bootstrap";
import profilepic from "../../assets/images/profilePic.jpg";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER_ID, UPDATE_USER } from "../../shared/constants";
import { useToasts } from "react-toast-notifications";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ImagePicker from "../../shared/file-stack/image-picker";
import ChangePassword from "../ChangePassword/ChangePassword";

const AdminProfile = (props) => {
  const { addToast } = useToasts();

  const history = useHistory();
  const { prevPath } = props.history.location.state;
  const user = JSON.parse(localStorage.getItem("user"));

  // console.log(finalUserId)
  const [show, setShow] = useState(false);
  const [emailText, setEmailText] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [dob, setDob] = useState(new Date());
  // const [dobISO, setDobISO] = useState('');
  // const [addressOne, setAddressOne] = useState("")
  const [gender, setGender] = useState("");
  // const [idCard, setIdCard] = useState('')
  const [attachment, setAttachment] = useState("");

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailTextError, setEmailTextError] = useState("");
  const [dobError, setDobError] = useState("");
  const [addressOneError, setAddressOneError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [attachmentError, setAttachmentError] = useState("");
  const [addressText, setAddressText] = useState("");
  const [addressTextError, setAddressTextError] = useState("");
  const [idCard, setIdCard] = useState("");
  const [idCardError, setIdCardError] = useState("");

  const {
    loading: loadingStudent,
    data: dataStudent,
    error: errorStudent,
  } = useQuery(GET_USER_ID, {
    variables: { id: user && user.id },
    //skip: props && finalUserId === 0,
    onError: () => {
      props.onHide();
    },
  });

  const [update, { loading, error, data }] = useMutation(UPDATE_USER, {
    variables: {
      updateUserInput: {
        Firstname: firstName,
        Lastname: lastName,
        Email: emailText,
        Address1: addressText,
        CardNo: idCard,
        Attachment: attachment,
        // Gender: gender
        // DOB: dobISO
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
    // if (dob === "") {
    //   setDobError("Please enter d.o.b");
    //   pErr = true
    // }
    // if (addressOne === "" || addressOne === null) {
    //   setAddressOneError("Please enter Address")
    //   pErr = true
    // }
    // if (idCard == "") {
    //   setIdCardError("Please enter id card number")
    //   pErr = true
    // }
    // if (gender == "") {
    //   setGenderError("Please enter Country")
    //   pErr = true
    // }
    //console.log('address', addressOne)
    if (attachment === null) {
      // setAttachmentError("Please upload attatchement")
      // pErr = true;
    }
    if (!pErr && emailText && firstName) {
      await update();
    }
  };

  useEffect(() => {
    if (dataStudent) {
      console.log("dataStudent", dataStudent.UsersById);
      setFirstName(dataStudent.UsersById.Firstname);
      setLastName(dataStudent.UsersById.Lastname);
      setEmailText(dataStudent.UsersById.Email);
      setAddressText(dataStudent.UsersById.Address1);
      setIdCard(dataStudent.UsersById.CardNo);
      setAttachment(dataStudent.UsersById.Attachment);
      // if(dataStudent.UsersById.DOB !== null){
      //   setDob(dataStudent.UsersById.DOB.substr(0, 10));
      //   setDobISO(dataStudent.UsersById.DOB)
      // }
      // setAddressOne(dataStudent.UsersById.Address1)
      //setGender()
      //setIdCard()
    }
  }, [dataStudent]);
  const uploadImageHandler = (files) => {
    console.log("hello", files);
    //setProjectFile(files);
    setAttachment(files);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
          <h4 className="text-white mb-0">Admin Profile</h4>
        </div>
      </div>

      <div className="container">
        <div class="card card-primary mt-5 custom-card">
          <div class="card-header">
            <h4 className="mb-0">
              <b>Edit Profile</b>
            </h4>
          </div>

          <form className="g-3 needs-validation" novalidate>
            <div className="card-body">
              <div className="row">
                <div className="col-md-9">
                  <div className="row row-cols-2">
                    <div className="col mb-3">
                      <div className="form-group">
                        <lable>Enter First Name</lable>
                        <input
                          type="text"
                          name="firstname"
                          placeholder="First Name"
                          className="form-control"
                          id="validationCustom01"
                          onChange={changeHandler}
                          value={firstName}
                          required
                        />
                        <div className="valid-feedback">
                          Please choose a first name.
                        </div>
                      </div>
                    </div>

                    <div className="col mb-3">
                      <div className="form-group">
                        <lable>Enter Email Address</lable>
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
                    </div>

                    <div className="col mb-3">
                      <div className="form-group">
                        <lable>Enter Last Name</lable>
                        <input
                          type="text"
                          name="lastname"
                          placeholder="Last Name"
                          className="form-control"
                          id="validationCustom02"
                          onChange={changeHandler}
                          value={lastName}
                          required
                        />
                        <div className="valid-feedback">
                          Please choose a last name.
                        </div>
                      </div>
                    </div>

                    <div className="col mb-3">
                      <div className="form-group">
                        <lable>ID Card</lable>
                        <input
                          type="number"
                          placeholder="ID Card Number"
                          className="form-control"
                          name="idCard"
                          value={idCard}
                          onChange={changeHandler}
                        />
                        <div className="valid-feedback">
                          Please choose a Phone no.
                        </div>
                      </div>
                    </div>

                    <div className="col mb-3">
                      <div className="form-group">
                        <lable>Select Gender</lable>

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
                    </div>

                    <div className="col mb-3">
                      <div className="form-group">
                        <lable>Address</lable>

                        <div className="input-group has-validation">
                          <input
                            type="text"
                            placeholder="Address"
                            className="form-control"
                            name="addressText"
                            onChange={changeHandler}
                            value={addressText}
                          />
                          <div className="invalid-feedback">
                            Please choose gender.
                          </div>
                        </div>
                      </div>
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
export default AdminProfile;
