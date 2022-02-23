import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import countryList from "react-select-country-list";
import Header from "../Header/Header";
import Select from "react-select";
import {
  allTags,
  GET_COURSE_BY_ID_WITH_TIME,
  GET_PAYMENT_BY_ID_COURSE,
  GET_PAYMENT_BY_ID_STUD,
  SAVE_PAYMENT,
  SUBMIT_PAYMENT,
  UPDATE_PAYMENT_STU,
} from "../../shared/constants";
import { useMutation, useQuery } from "@apollo/client";
import { useToasts } from "react-toast-notifications";
import FilePicker from "../../shared/file-stack/file-picker";
import "./PaymentPage.css";
import { Rating } from "react-simple-star-rating";

const PaymentPage = (props) => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [zipcoad, setZipcoad] = useState("");
  const [address, setAddress] = useState("");
  const [courseID, setCourseID] = useState("");
  const [city, setCity] = useState("");
  const [selectedCountry, setSelectedCountry] = useState({});
  const options = useMemo(() => countryList().getData(), []);
  const [selectedCountryError, setSelectedCountryError] = useState("");
  const [firstNameError, setfirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [multiFiles, setMultitFiles] = useState({});
  const [multiFilesError, setMultitFilesError] = useState("");
  const [paymentId, setPaymentId] = useState(null);
  const [paymentData, setPaymentData] = useState();


  const { courseId } = props.history.location.state;
  const { addToast } = useToasts();
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setformData] = useState({
    gender: "Bank Detail",
  });
  // const location = useLocation()
  // const { courseId } = location.state
  // console.log("course id", courseId)

  const handleSelectCountry = (selecopt) => {
    const value = selecopt === null ? "" : selecopt;
    setSelectedCountry(selecopt);
    setSelectedCountryError("");
  };

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setformData({
      ...formData,
      [name]: value,
    });
  };

  const { loading: loadingPayment, data: dataPayment, error: errorPayment, } = useQuery(GET_PAYMENT_BY_ID_COURSE, {
    variables: { id: courseId },
    onError: () => {
      //Error
    },
    onCompleted: () => { },
  });

  const [save_payment, { loading, error, data }] = useMutation(SAVE_PAYMENT, {
    variables: {
      createPaymentInput: {
        CourseId: courseId,
        FirstName: firstName,
        LastName: lastName,
        //Zipcoad: zipcoad,
        //City: city,
        //Address: address,
        Country: selectedCountry.value,
        Attachment:
          multiFiles !== null && Object.keys(multiFiles).length > 0
            ? multiFiles
            : null,
        //CourseGuidelines: CourseGuidelines
      },
    },
    onError: () => {
      //Do nothing
    },
    onCompleted: () => {
      addToast("Billing details saved successfully", { appearance: "success" });
    },
    refetchQueries: [{ query: GET_PAYMENT_BY_ID_COURSE, variables: { id: courseId } }],
    awaitRefetchQueries: true,
  });

  const [updatePaymentStu, { loading: loadingSchPaymentStu, data: dataSchPaymentStu, error: errorSchPaymentStu, }] = useMutation(UPDATE_PAYMENT_STU, {
    onCompleted: () => {
      addToast("Your application has been submitted", { appearance: "success" });
    },
    skip: paymentId === null,
    variables: {
      updatePaymentInput: {
        CourseId: courseId,
        FirstName: firstName,
        LastName: lastName,
        //Zipcoad: zipcoad,
        //City: city,
        //Address: address,
        Country: selectedCountry.value,
        Attachment: multiFiles,
        StudentId: user && user.id,
        //CourseGuidelines: CourseGuidelines
      },
      id: paymentId,
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
    refetchQueries: [{ query: GET_COURSE_BY_ID_WITH_TIME, variables: { id: courseId } }],
    awaitRefetchQueries: true,
  });

  const [submit_payment, { loading: loadingSubmit, error: errorSubmit, data: dataSubmit }] = useMutation(SUBMIT_PAYMENT, {
    variables: {
      submitPaymentInput: {
        CourseId: courseId,
        FirstName: firstName,
        LastName: lastName,
        id: paymentId,
        //Zipcoad: zipcoad,
        //City: city,
        //Address: address,
        Country: selectedCountry.value,
        Attachment: multiFiles,
        //CourseGuidelines: CourseGuidelines
      },
    },
    onError: () => {
      //Do nothing
    },
    onCompleted: () => {
      addToast("Thanks for payment , a confirmation email will be sent to you after admin verify payment receipt ", { appearance: "success" });
      props.history.goBack()
    },
    refetchQueries: [{ query: GET_PAYMENT_BY_ID_COURSE, variables: { id: courseId } }],
    awaitRefetchQueries: true,
  });

  const afterMultiUpload = (files) => {
    console.log("hello", files);
    setMultitFiles(files);
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "firstName") {
      setfirstName(value);
      setfirstNameError("");
    } else if (name === "lastName") {
      setLastName(value);
      setLastNameError("");
    }
    //else if (name)
  };

  const paymentSubmit = () => {
    let pErr = false;
    if (firstName === "") {
      setfirstNameError("Please Enter First Name");
      pErr = true;
    }
    if (lastName === "") {
      setLastNameError("Please Enter Last Name");
      pErr = true;
    }
    if ((multiFiles !== null && Object.keys(multiFiles).length === 0) || multiFiles === null
    ) {
      setMultitFilesError("Please upload attatchment first");
      pErr = true;
    }
    if (!pErr) {
      submit_payment();
    }
  };

  const paymentSave = () => {
    let pErr = false;
    if (firstName === "") {
      setfirstNameError("Please Enter First Name");
      pErr = true;
    }
    if (lastName === "") {
      setLastNameError("Please Enter Last Name");
      pErr = true;
    }

    if (!paymentId && !pErr) {
      save_payment();
    }
    if (paymentId && !pErr) {
      updatePaymentStu();
    }
  };

  useEffect(() => {
    if (dataPayment) {
      console.log("dataPayment.getPaymentById", dataPayment.getPaymentByCourseId);
      if (dataPayment.getPaymentByCourseId && dataPayment.getPaymentByCourseId.id !== null) {
        setfirstName(dataPayment.getPaymentByCourseId.FirstName);
        setLastName(dataPayment.getPaymentByCourseId.LastName);
        setMultitFiles(dataPayment.getPaymentByCourseId.Attachment);
        setPaymentId(dataPayment.getPaymentByCourseId.id);
        setPaymentData(dataPayment.getPaymentByCourseId);
      }
    }
  }, [dataPayment]);

  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col text-white">
            <h3 className="mb-3">{paymentData && paymentData.CourseName}</h3>
            <h6>Credit Hours: <span>{paymentData && paymentData.CourseCreditHours}</span></h6>
            {paymentData && paymentData.AverageRating &&
              <div>
                <span>{paymentData && paymentData.AverageRating}</span>
                <Rating
                  ratingValue={paymentData && paymentData.AverageRating ? paymentData && paymentData.AverageRating : 0}
                  transition
                  size={50}
                  readonly
                />
              </div>}
          </div>


          <div className="col-sm-auto text-white text-end">
            <h3 className="pay_rate text-black">
              <b>${paymentData && paymentData.Price}</b>
            </h3>
          </div>

        </div>
        <div className="card mt-5">
          <div className="card-header">
            <h4 className="card-tital h3 mb-0">Billing</h4>
          </div>

          <div className="card-body">
            <div className="row">
              <div className="col-6">
                <div className="card h-100">
                  <div className="card-header">
                    <h4 className="card-tital h4 mb-0">Billing Detail</h4>
                  </div>

                  <div className="card-body">
                    <form>
                      <div className="form-group">
                        <label>First Name</label>

                        <input
                          type="text"
                          className="form-control"
                          placeholder="First Name"
                          name="firstName"
                          onChange={changeHandler}
                          value={firstName}
                        />
                      </div>
                      <div className="text-danger">{firstNameError}</div>
                      <div className="form-group">
                        <label>Last Name</label>

                        <input
                          type="text"
                          className="form-control"
                          placeholder="Last Name"
                          name="lastName"
                          onChange={changeHandler}
                          value={lastName}
                        />
                        <div className="text-danger">{lastNameError}</div>
                      </div>
                      <div className="form-group">
                        <label>Email address</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter Email"
                        />
                      </div>
                      <div className="form-group">
                        <label>Permanent Adress</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter Address"
                        />

                        {/* <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter country" /> */}
                      </div>

                      <div className="row justify-content-center">
                        <div className="col-6">
                          <div className="form-group">
                            <label>Country</label>
                            <Select
                              options={options}
                              value={
                                Object.keys(selectedCountry).length === 0
                                  ? undefined
                                  : selectedCountry
                              }
                              placeholder="Select Country"
                              onChange={handleSelectCountry}
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <label>Zip/Postal code</label>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Enter Zipcode"
                            />
                          </div>
                        </div>
                      </div>
                      {/* <button type="submit"  className="btn btn-primary mt-4">Submit</button> */}
                    </form>
                  </div>
                </div>
              </div>

              <div className="col-6">
                <div className="card h-100">
                  <div className="card-header">
                    <h4 className="card-tital h4 mb-0">Payment method</h4>
                  </div>

                  <div className="card-body">
                    <form className="form-group">
                      <label className="txt_size">Bank Detail </label>
                      <input
                        className="rad_but"
                        type="radio"
                        name="gender"
                        value="Bank Detail"
                        onChange={handleChange}
                        checked={formData.gender == "Bank Detail"}
                      />

                      <label className="ms-3 txt_size">Card Detail </label>
                      <input
                        className="rad_but"
                        type="radio"
                        name="gender"
                        value="Card Detail"
                        onChange={handleChange}
                        checked={formData.gender == "Card Detail"}
                      />
                    </form>

                    {formData.gender === "Bank Detail" && (
                      <div className="card">
                        <div className="card-header">
                          <h4 className="card-tital h4 mb-0">Bank Detail</h4>
                        </div>
                        <div className="card-body">
                          <div className="form-group">
                            <h5 className="h5 justify-content-between d-flex">
                              Account Title : <span>Garry</span>
                            </h5>
                          </div>

                          <div className="form-group">
                            <h5 className="h5 justify-content-between d-flex">
                              Account Number :<span>0010064790225588</span>
                            </h5>
                          </div>

                          <div className="form-group">
                            <h5 className="h5 justify-content-between d-flex">
                              Bank Name : <span>Allied Bank</span>
                            </h5>
                          </div>

                          <div className="form-group">
                            <h5 className="h5 justify-content-between d-flex">
                              Branch Code : <span>0507</span>
                            </h5>
                          </div>
                        </div>

                        <div className="card-footer text-end">
                          <FilePicker
                            data={multiFiles}
                            afterUpload={afterMultiUpload}
                          />

                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={paymentSave}
                          >
                            Save
                          </button>

                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={paymentSubmit}
                          >
                            Submit
                          </button>

                          <div className="text-danger">{multiFilesError}</div>
                        </div>
                      </div>
                    )}

                    {formData.gender === "Card Detail" && (
                      <>
                        <form>
                          <div className="card">
                            <div className="card-header">
                              <h4 className="card-tital h4 mb-0">
                                Card Detail
                              </h4>
                            </div>

                            <div className="card-body">
                              <div className="form-group">
                                <label for="exampleInputEmail1">
                                  Card Title
                                </label>

                                <input
                                  type="email"
                                  class="form-control"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                  placeholder="Card Title"
                                />
                              </div>

                              <div class="form-group">
                                <label for="exampleInputEmail1">
                                  Card Number
                                </label>

                                <input
                                  type="email"
                                  class="form-control"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                  placeholder="Card Number"
                                />
                              </div>

                              <div className="row">
                                <div className="col-6">
                                  <div class="form-group">
                                    <label for="exampleInputEmail1">
                                      Valid upto
                                    </label>
                                    <input
                                      type="email"
                                      class="form-control"
                                      id="exampleInputEmail1"
                                      aria-describedby="emailHelp"
                                      placeholder="Enter date"
                                    />
                                  </div>
                                </div>
                                <div className="col-6">
                                  <div class="form-group">
                                    <label for="exampleInputEmail1">CVC</label>
                                    <input
                                      type="email"
                                      class="form-control"
                                      id="exampleInputEmail1"
                                      aria-describedby="emailHelp"
                                      placeholder="Enter CVC"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="card-footer text-end">
                              <div className="button-panel">
                                <button
                                  type="button"
                                  className="btn btn-success"
                                >
                                  Save
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-success"
                                >
                                  Submit
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </>
                    )}
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

export default PaymentPage;
