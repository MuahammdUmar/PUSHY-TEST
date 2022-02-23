import React, { useCallback, useEffect, useState } from 'react'
import { Button, Modal, Spinner } from 'react-bootstrap'
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER_ID, UPDATE_USER, GET_TUTOR_BY_ID, GET_ALL_COURSES, APPROVE_TUTOR_COURSES, REJECT_TUTOR_COURSES, allTags } from '../../shared/constants'
import { useToasts } from 'react-toast-notifications';
import Select, { components } from 'react-select';
import moment from 'moment';
import ReactSelectIcon from '../ReactSelectIcon';
import Control from '../Control';
import DeleteModal from '../DeleteModal/DeleteModal';
import DetailListModal from '../ListModal/ListModal';


export const colourOptions = [
  { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
  { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
  { value: 'purple', label: 'Purple', color: '#5243AA' },
  { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
  { value: 'orange', label: 'Orange', color: '#FF8B00' },
  { value: 'yellow', label: 'Yellow', color: '#FFC400' },
  { value: 'green', label: 'Green', color: '#36B37E' },
  { value: 'forest', label: 'Forest', color: '#00875A' },
  { value: 'slate', label: 'Slate', color: '#253858' },
  { value: 'silver', label: 'Silver', color: '#666666' },
];
const EditTutor = (props) => {

  const [emailText, setEmailText] = useState('')
  const user = JSON.parse(localStorage.getItem('user'))
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dob, setDob] = useState(new Date());
  const [dobISO, setDobISO] = useState('');
  const [addressOne, setAddressOne] = useState("")
  const [gender, setGender] = useState("")
  const [idCard, setIdCard] = useState('')
  const [pages, setPages] = useState(0)

  const [firstNameError, setFirstNameError] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const [emailTextError, setEmailTextError] = useState('')
  const [dobError, setDobError] = useState("");
  const [addressOneError, setAddressOneError] = useState("")
  const [genderError, setGenderError] = useState("")
  const [idCardError, setIdCardError] = useState("")
  const [listModalOpen, setListModalOpen] = useState(false)


  const [selectedInterests, setSelectedInterests] = useState([])
  const [selectedInterestsError, setSelectedInterestsError] = useState('')
  const [allCourses, setAllCourses] = useState([])
  const [selectedCourses, setSelectedCourses] = useState([])

  const { addToast } = useToasts()

  let emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

  const { loading: loadingStudent, data: dataStudent, error: errorStudent, } = useQuery(GET_TUTOR_BY_ID, {
    variables: { id: props && props.tutorId },
    skip: props && props.tutorId === 0,
    onError: () => {
      props.onHide()
    },
  })

  const { loading: loadingCourses, data: dataCourses, error: errorCourse } = useQuery(GET_ALL_COURSES)

  const [approveCourses, { loading: loadingApprove, error: errorApprove }] = useMutation(APPROVE_TUTOR_COURSES, {
    onError: () => {
      //setDeleteDialogOpen(false)
    },
    variables: {
      id: props && props.studentId,
      CourseIds: selectedCourses.map((c) => c.value)
    },
    onCompleted: () => {
      addToast("Tutor courses approved successfully", { appearance: "success" });
    },
    // refetchQueries: [{ query: GET_ALL_ASSIGNMENTS }],
    // awaitRefetchQueries: true,
  });

  const [rejectCourses, { loading: loadingReject, error: errorReject }] = useMutation(REJECT_TUTOR_COURSES, {
    onError: () => {
      //setDeleteDialogOpen(false)
    },
    variables: {
      id: user && user.id,
      CourseIds: selectedCourses.map((c) => c.value)
    },
    onCompleted: () => {
      addToast("Tutor courses rejected successfully", { appearance: "success" });
      setSelectedCourses([])
    },
    // refetchQueries: [{ query: GET_ALL_ASSIGNMENTS }],
    // awaitRefetchQueries: true,
  });


  const [update, { loading, error, data }] = useMutation(UPDATE_USER, {
    variables: {
      updateUserInput: {
        Firstname: firstName,
        Lastname: lastName,
        Email: emailText,
        Address1: addressOne,
        //CardNo: idCard,
        //Gender: gender
        DOB: dobISO,
        CourseIds: selectedCourses.map((c) => c.value),
        //Interests: selectedInterests.map((i) => i.value)

      },
      id: props.tutorId,

    },
    onCompleted: (data) => {
      addToast('Tutor saved Successfully', { appearance: 'success' })
      props.onHide()
      //window.location.reload()
    },
    onError: () => {
      //Do nothing
    }
  })


  useEffect(() => {
    if (dataStudent) {
      console.log('dataStudent', dataStudent)
      setFirstName(dataStudent.TutorById.Firstname)
      setLastName(dataStudent.TutorById.Lastname)
      setEmailText(dataStudent.TutorById.Email)
      if (dataStudent.TutorById.DOB !== null) {

        //setDob(dataStudent.TutorById.DOB.substr(0, 10));
        setDob(moment(dataStudent.TutorById.DOB).format("YYYY-MM-DD"))
        setDobISO(dataStudent.TutorById.DOB)
      }
      setAddressOne(dataStudent.TutorById.Address1)
      //setAllCourses(dataStudent.TutorById.Courses)
      if (dataStudent.TutorById.Courses !== null) {
        console.log("dataStudent.TutorById.Courses", dataStudent.TutorById.Courses)
        setSelectedCourses(dataStudent.TutorById.Courses.map((course) => ({ value: course.id, label: course.CourseName })))
      }
      if (dataStudent.TutorById.Courses == null) {
        setSelectedCourses([])
      }

      //setGender()
      //setIdCard()
    }
    if (dataCourses) {
      setAllCourses(dataCourses.getAllCourses)
    }
  }, [dataStudent, dataCourses])

  const changeHandler = (e) => {
    const { name, value } = e.target;

    if (name === "firstName") {
      setFirstName(value)
      setFirstNameError("")
    } else if (name === "dob") {
      setDob(value)
      if (value !== '' && value !== null) {
        setDobISO(new Date(value).toISOString())
      }
      setDobError("")
    } else if (name === "emailText") {
      setEmailText(e.target.value);
      setEmailTextError("");
    } else if (name === "lastName") {
      setLastName(value)
      setLastNameError("")
    }
    else if (name === "addressOne") {
      setAddressOne(value);
      setAddressOneError("");
    }
    else if (e.target.name === "gender") {
      setGender(e.target.value);
      setGenderError("");
    } else if (e.target.name === "idCard") {
      setIdCard(e.target.value);
      setIdCardError("");
    }
  }
  const submitHandler = async (e) => {

    let pErr = false
    if (firstName === '') {
      setFirstNameError('Please enter first name')
      pErr = true
    }
    if (lastName === '') {
      setLastNameError('Please enter last name')
      pErr = true
    }
    if (dob === "") {
      setDobError("Please enter d.o.b");
      pErr = true
    }
    if (addressOne === "" || addressOne === null) {
      setAddressOneError("Please enter Address")
      pErr = true
    }
    // if (idCard == "") {
    //   setIdCardError("Please enter id card number")
    //   pErr = true
    // }
    // if (gender == "") {
    //   setGenderError("Please enter Country")
    //   pErr = true
    // } 

    if (!pErr && emailText && firstName) {
      await update()
    }

  }

  const handleSelectCourse = (selecopt) => {
    const value = selecopt === null ? '' : selecopt
    setSelectedCourses(selecopt)
  }

  const approveTutCours = async () => {
    console.log('approve')
    await approveCourses()
  }
  const rejectTutCours = async () => {
    await rejectCourses()
  }

  const handleInterestsSelect = (selecopt) => {
    const value = selecopt === null ? '' : selecopt
    setSelectedInterests(selecopt)
    setSelectedInterestsError('')
  }

  const onClickSearchIcon = (e) => {
    e.preventDefault();
    e.stopPropagation();
    //console.log("emogji clicked");
    setListModalOpen(true)
  }
  const approveCoursesFunc = useCallback(() => {
    setPages(pages + 1)
  }, [])

  const backButton = useCallback(() => {
    setPages(pages - 1)
  }, [])

  const loadingInd = loadingStudent || loadingApprove || loadingReject

  return (
    <>
      <Modal show={props.show} onHide={props.onHide} animation={false}>
        {pages === 0 && <>
        <Modal.Header closeButton>
          <Modal.Title>Edit Tutors</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className='container'>
              <div className='row mb-3'>

                <div className='col-6'>
                <div className="d-inline-flex">
                  <label className="form-label">First Name<span className="text-danger required-text">*</span></label>
                  </div>
                  <input type="text"
                    maxLength="50"
                    name="firstName"
                    placeholder="First Name"
                    className={
                      firstNameError.length > 0
                            ? "form-control  is-invalid"
                            : "form-control "
                        }
                    onChange={changeHandler}
                    value={firstName} />
                  <div className="text-danger">{firstNameError}</div>
                </div>
                <div className='col-6'>
                <div className="d-inline-flex">
                  <label className="form-label">Last Name<span className="text-danger required-text">*</span></label>
                  </div>
                  <input type="text"
                    maxLength="50"
                    name="lastName"
                    placeholder="Last Name"
                    className={
                      lastNameError.length > 0
                            ? "form-control  is-invalid"
                            : "form-control "
                        }
                    onChange={changeHandler}
                    value={lastName} />
                  <div className="text-danger">{lastNameError}</div>
                </div>
              </div>
              <div className='row mb-3'>
                <div className='col-12'>
                  <label className="form-label">Email</label>
                  <input type="email" name="emailText" placeholder="Email" className="form-control" onChange={changeHandler} value={emailText} readOnly />
                </div>
                {/* <div className='col-6'>
                  <input type="Gender" name="gender" placeholder="Gender" className="form-control" onChange={changeHandler} value={gender} />
                  <div className="text-danger">{genderError}</div>
                </div> */}
              </div>
              <div className='row mb-3'>
                <div className='col-12'>
                  <label className="form-label">Date of birth</label>
                  <input type="date" name="dob" className="form-control" onChange={changeHandler} value={dob} />
                  <div className="text-danger">{dobError}</div>
                </div>
                {/* <div className='col-6'>
                  <input type="number" placeholder="ID Card Number" name="idCard" className="form-control" onChange={changeHandler} value={idCard} />
                  <div className="text-danger">{idCardError}</div>
                </div> */}
              </div>
              <div className='row mb-3'>
                <div className='col-12'>
                  <label className="form-label">Address</label>
                  <input type="text" placeholder="Address" maxLength="300" name="addressOne" className="form-control" onChange={changeHandler} value={addressOne} />
                  <div className="text-danger">{addressOneError}</div>
                </div>
              </div>


              <div className='row mb-3'>
                <div className='col-12'>
                  <label className="form-label">Approved Courses</label>
                  <Select
                    {...props}
                    value={selectedCourses}
                    onChange={handleSelectCourse}
                    options={(allCourses !== null) ? allCourses.filter((cour) => cour.Status === "Approved").map((c) => ({ value: c.id, label: c.CourseName })) : []}
                    isClearable
                    name="emojis"
                    isMulti
                    // components={{ Control }}
                    // onSearchIconClick={onClickSearchIcon}
                  />

                </div>
              </div>

              <div className='row mb-3'>
                <div className='col-12'>
                  <Button onClick={approveCoursesFunc}>Course Approval</Button>
                </div>
              </div>


            </div>
          </form>
          {loadingInd &&
            <div className="loading-indicator">
              <Spinner animation="border" variant="primary" />
            </div>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Cancel
          </Button>
          <Button type="button" variant="primary" onClick={submitHandler}>Save</Button>
        </Modal.Footer>
        </>}
        {pages === 1 && 
        <DetailListModal
          //show={listModalOpen}
          //onHide={() => setListModalOpen(false)}
          onBack={() => setPages(pages-1)}
          tutorId={props && props.tutorId} 
        />}
      </Modal>

      

    </>
  )
}

export default EditTutor