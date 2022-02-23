import React,{useState,useEffect} from 'react'
import {
    CREATE_CONTACT_US
  } from "../../shared/constants";
import { useMutation, useQuery } from "@apollo/client";
import { useToasts } from "react-toast-notifications";

import Header from '../Header/Header'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const ContactUs = (props) => {
    const { addToast } = useToasts();
    const [Email, setEmail] = useState();
    const [EmailError, setEmailError] = useState();
    const [description, setdescription] = useState();
    const [descriptionError, setdescriptionError] = useState();
    const [PhoneNo, setPhoneNo] = useState();
    const [PhoneNoError, setPhoneNoError] = useState();

    // const { prevPath } = props.history.location.state;

    const [createContactUs, { loading, error, data }] = useMutation(CREATE_CONTACT_US, {
        variables: {
            createContactUsInput : {
                Email: Email,
                Description: description,
                PhoneNo: PhoneNo,
          },
        },
        // refetchQueries: [{ query: GET_ALL_COURSES }],
        // awaitRefetchQueries: true,
        onError: () => {
          //Do nothing
        },
        onCompleted: () => {
          addToast("Thanks for contacting us! We will be in touch with you shortly.", { appearance: "success" });
    
          props.history.push("/")
          props.onHide();
        },
      });

      const changeHandler = (e) => {
        const { name, value } = e.target;

        if (e.target.name === "email") {
            if (e.target.value.toString().length < 50) {
                setEmail(e.target.value);

                // setTitleError("");
            }
            // else {
            //     setTitle(e.target.value);

            //     setTitleError("Title must be less than 50 characters");

            // }
        }
        else if (e.target.name === "description") {
            if (e.target.value.toString().length < 1000) {
                setdescription(e.target.value);
                

                // setDescriptionError("");
            }
            // else {
            //     setDescription(e.target.value);

            //     setDescriptionError("Description must be less than 1000 characters");

            // }
            // setdescription(e.target.value);

        } 
        if (name === "phoneNo") {
            setPhoneNo(value);
            //setLastNameError('')
          }
    };

      const submitHandler = async (e) => {
          console.log("testing",description);
        let pErr = false;
        e.preventDefault();
        if (Email === "") {
            setEmailError("Please Enter Email");
            pErr = true;
        }
        if (description === "") {
            setdescriptionError("Please Enter Description");
            pErr = true;
        }
        if (PhoneNo === "") {
            setPhoneNoError("Please Enter Phone No");
            pErr = true;
        }
       
  

        if (!pErr) {
            createContactUs();
        }
    };

    return (
        <>
            <Header />
            <div className='container'>
              
                <form className='bg-white pb-5 pt-3 mt-4 rounded-3'>
                <div className='col-6 offset-4 mt-5'>
                        <h2><b>How we can Help You ?</b></h2>
                    </div>
                {/* <div className='row bg-white'>
                    <div className='col-6 offset-4 mt-5'>
                        <h2><b>How we can Help You ?</b></h2>
                    </div>
                </div> */}
                    <div className='row'>
                        <div className='col-6 offset-3 mt-4'>
                            <label className="form-label fs-6 text-black">Email Address</label>

                            <input
                                type="email"
                                placeholder='Email Address'
                                className='form-control mt-1'
                                onChange={changeHandler}
                                name="email"
                                value={Email}
                            />
                        </div>
                        <div className='col-6 offset-3 mt-2'>
                            <label className="form-label fs-6 text-black">Contact No</label>

                            <input
                                type="number"
                                placeholder='Contact No'
                                className='form-control mt-1'
                                onChange={changeHandler}
                                name="phoneNo"
                                value={PhoneNo}



                            />
                        </div>
                        <div className='col-6 offset-3 mt-2'>
                            <label className="form-label fs-6 text-black">Description</label>

                            <textarea
                                rows={4}
                                type="text"
                                placeholder='Description'
                                className='form-control mt-1'
                                onChange={changeHandler}
                                name="description"
                                value={description}


                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-6 offset-3'>
                            <Link to="/">
                                <Button
                                    className="ms-1 w-25 border-dark mt-3"
                                    type="button"
                                    variant="dark"
                                >
                                    Back
                                </Button>
                            </Link>
                            <Button
                                className="ms-1 w-25 border-dark mt-3"
                                type="button"
                                variant="dark"
                                onClick={submitHandler}
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                </form>
            </div>

        </>
    )
}

export default ContactUs