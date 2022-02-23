import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Row, Col, InputGroup, Spinner } from "react-bootstrap";

import {
  CREATE_COURSE,
  GET_ALL_COURSES,
  GET_ALL_USERS,
  GET_COURSE_BY_ID,
  GET_TUTORS_BY_COURSE,
  UPDATE_COURSE,
} from "../../shared/constants";
import { useToasts } from "react-toast-notifications";
import { useMutation, useQuery } from "@apollo/client";
import Select from "react-select";
import FilePicker from "../../shared/file-stack/file-picker";
import ImagePicker from "../../shared/file-stack/image-picker";
const CourseModal = (props) => {
  const { addToast } = useToasts();

  const allCategories = [
    { value: "IT", label: "Information Technology" },
    { value: "BUSINESS", label: "Business" },
    { value: "CS", label: "Computer Science" },
    { value: "DATA_SCIENCE", label: "Data Science" },
    { value: "SOCIAL_SCIENCES", label: "Social Sciences" },
    { value: "HEALTH", label: "Health" },
    { value: "MATH", label: "Math" },
    { value: "ARTS", label: "Arts" },
  ];
  const allCategoriesObject = {
    IT: "Information Technology",
    BUSINESS: "Business",
    CS: "Computer Science",
    DATA_SCIENCE: "Data Science",
    SOCIAL_SCIENCES: "Social Sciences",
    HEALTH: "Health",
    MATH: "Math",
    ARTS: "Arts",
  };
  const { show, onHide } = props;
  const [courseName, setCourseName] = useState("");
  const [courseCreditHours, setCourseCreditHours] = useState("");
  const [price, setPrice] = useState("");
  const [priceError, setPriceError] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseAssignments, setCourseAssignments] = useState("");
  const [courseOutcomes, setCourseOutcomes] = useState("");
  const [multiFiles, setMultitFiles] = useState({});
  const [multiFilesError, setMultitFilesError] = useState("");
  const [courseImage, setCourseImage] = useState(null)
  const [courseImageError, setCourseImageError] = useState("")


  const [courseTimings, setCourseTimings] = useState([]);
  const [courseTimingsError, setCourseTimingsError] = useState("");

  const [courseNameError, setCourseNameError] = useState("");
  const [courseAssignmentsError, setCourseAssignmentsError] = useState("");
  const [courseOutcomesError, setCourseOutcomesError] = useState("");
  const [courseCreditHoursError, setCourseCreditHoursErrror] = useState("");
  const [courseDescriptionError, setCourseDescriptionError] = useState("");
  const [selectedTutors, setSelectedTutors] = useState([]);
  const [selectedTutorsError, setSelectedTutorsError] = useState("");
  const [allTutors, setAllTutors] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState({});
  const [selectedCategoriesError, setSelectedCategoriesError] = useState("");

  const [addCourse, { loading, error, data }] = useMutation(CREATE_COURSE, {
    variables: {
      createCourseInput: {
        CourseName: courseName,
        Price: price,
        CourseCreditHours: courseCreditHours,
        CourseDescription: courseDescription,
        CourseAssignments: courseAssignments,
        CourseOutcomes: courseOutcomes,
        Attachment: multiFiles,
        CourseTime: courseTimings.map((c) => c.value),
        CourseCategory: selectedCategories.value,
        CourseImage: courseImage
        //CourseGuidelines: CourseGuidelines
      },
    },
    refetchQueries: [{ query: GET_ALL_COURSES }],
    awaitRefetchQueries: true,
    onError: () => {
      //Do nothing
    },
    onCompleted: () => {
      addToast("Course Created Successfully", { appearance: "success" });
      //window.location.reload()

      //history.push("/welcomepage")
      props.onHide();
    },
  });

  const { loading: loadingCourse, data: dataCourse, error: errorCourse, } = useQuery(GET_COURSE_BY_ID, {
    variables: { id: props && props.courseId },
    skip: props.formType === 1,
    onError: () => {
      props.onHide();
    },
  });

  const { loading: loadingUsers, data: dataUsers, error: errorUsers } = useQuery(GET_TUTORS_BY_COURSE, {
    variables: {
      courseId: props && props.courseId,
    },
    skip: props.formType === 1,
    onCompleted: () => { },
    onError: () => { },
  });

  const [updateCourse, { loading: loadingUpdate, data: dataUpdate, error: errorUpdate },] = useMutation(UPDATE_COURSE, {
    onCompleted: () => {
      addToast("Course saved successfully", { appearance: "success" });
      //window.location.reload()

      props.onHide();
    },
    variables: {
      updateCourseInput: {
        CourseName: courseName,
        Price: price,
        CourseCreditHours: courseCreditHours,
        CourseDescription: courseDescription,
        CourseAssignments: courseAssignments,
        CourseOutcomes: courseOutcomes,
        CourseTime: courseTimings.map((c) => c.value),
        Tutors: selectedTutors.map((tut) => tut.value),
        CourseCategory: selectedCategories.value,
      },
      id: props && props.courseId,
    },
    refetchQueries: [{ query: GET_ALL_COURSES }],
    awaitRefetchQueries: true,
    update: (cache) => {
      cache.evict({
        id: "ROOT_QUERY",
        field: "id",
      });
    },
    onError: () => {
      //Do nothing
    },
  });
  const afterMultiUpload = (files) => {
    setMultitFiles(files);
  };
  const afterImageUpload = (files) => {
    setCourseImage(files);
  };

  useEffect(() => {
    if (dataCourse) {
      setCourseName(dataCourse.getCourseById.CourseName);
      setSelectedCategories({
        value: dataCourse.getCourseById.CourseCategory,
        label: allCategoriesObject[dataCourse.getCourseById.CourseCategory],
      });
      //setPrice()
      setCourseCreditHours(dataCourse.getCourseById.CourseCreditHours);
      setCourseDescription(dataCourse.getCourseById.CourseDescription);
      setCourseAssignments(dataCourse.getCourseById.CourseAssignments);
      setMultitFiles(dataCourse.getCourseById.Attachment);
      setPrice(dataCourse.getCourseById.Price);
      setCourseOutcomes(dataCourse.getCourseById.CourseOutcomes);
      if (dataCourse.getCourseById.CourseTime !== null) {
        setCourseTimings(
          dataCourse.getCourseById.CourseTime.map((timing) => ({
            value: timing,
            label: timing,
          }))
        );
      }
      setPrice(dataCourse.getCourseById.Price)
      //setCourseTimings(dataCourse.getCourseById.CourseTime)
    }
    if (dataUsers) {
      //let dataTutors = dataUsers.getAllUserss.filter(usr => usr.roles === 3)
      //setAllTutors(dataTutors)
      setAllTutors(dataUsers.getAllUserByCourseId);
      setSelectedTutors(
        dataUsers.getAllUserByCourseId.map((tut) => ({
          value: tut.id,
          label: tut.Firstname,
        }))
      );
    }
  }, [dataCourse, dataUsers]);

  // const [validated, setValidated] = useState(false);

  const deleteCourse = () => { };
  const modalLoaded = () => { };
  // const handleSubmit = () => {

  // }

  const handleSelectTutors = (selecopt) => {
    setSelectedTutors(selecopt);
    setSelectedTutorsError("");
  };
  const handleTimingSelect = (selopt) => {
    setCourseTimings(selopt);
    setCourseTimingsError("");
  };

  const handleCategoriesSelect = (selecopt) => {
    const value = selecopt === null ? "" : selecopt;
    setSelectedCategories(selecopt);
    setSelectedCategoriesError("");
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "courseName") {
      setCourseName(value);
      setCourseNameError("");
    } else if (name === "courseCreditHours") {
      setCourseCreditHours(value);
      setCourseCreditHoursErrror("");
    } else if (name === "courseDescription") {
      setCourseDescription(value);
      setCourseDescriptionError("");
    } else if (name === "courseAssignments") {
      setCourseAssignments(value);
      setCourseAssignmentsError("");
    } else if (name === "courseOutcomes") {
      setCourseOutcomes(value);
      setCourseOutcomesError("");
    } else if (name === "fee") {
      setPrice(value);
      setPriceError("");
    }
    //else if (name)
  };
  const handleSubmit = () => {
    // console.log('submit called', courseName)
    // console.log('selectedCategories', selectedCategories)
    let pErr = false;
    if (courseName === "") {
      setCourseNameError("Please enter course name");
      pErr = true;
    }
    if (courseCreditHours === "") {
      setCourseCreditHoursErrror("Please enter course hours");
      pErr = true;
    }
    // if ((multiFiles !== null && Object.keys(multiFiles).length === 0) || multiFiles === null) {
    //   setMultitFilesError("Please upload Document");
    //   pErr = true;
    // }
    // if (courseDescription === "") {
    //   setCourseDescriptionError("Please enter course description");
    //   pErr = true;
    // }
    if (price === "") {
      setPriceError("Please enter course fee");
      pErr = true;
    }
    // if (courseAssignments === "") {
    //   setCourseAssignmentsError("Please enter course assignments");
    //   pErr = true;
    // }
    // if (courseOutcomes === "") {
    //   setCourseOutcomesError("Please enter course learning outcomes");
    //   pErr = true;
    // }
    // if (courseTimings.length === 0) {
    //   setCourseTimingsError("Please select timings");
    //   pErr = true;
    // }
    // if (props.formType === 2 && selectedTutors.length === 0) {
    //   setSelectedTutorsError("Please select Tutors");
    //   pErr = true;
    // }
    if (!pErr && props.formType === 1) {
      addCourse();
    }

    if (!pErr && props.formType === 2) {
      updateCourse();
    }
  };
  const loadingInd = loadingCourse || loadingUpdate
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
      show={show}
      onHide={onHide}
      onEntered={modalLoaded}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.formType === 1 ? "Add Course" : "Edit Course"}
        </Modal.Title>
      </Modal.Header>

      <Form>
        <Modal.Body>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <div className="d-inline-flex">
                <Form.Label> Course name <span className="text-danger  required-text">*</span></Form.Label>
              </div>
              <Form.Control
                type="text"
                placeholder="Course Name"
                maxLength={"50"}
                className={
                  courseNameError.length > 0
                    ? "form-control  is-invalid"
                    : "form-control "
                }
                name="courseName"
                onChange={changeHandler}
                value={courseName}
                aria-describedby="emailHelp"
              />
              <div className="text-danger">{courseNameError}</div>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom02">
              <Form.Label>Category</Form.Label>
              <Select
                value={selectedCategories}
                onChange={handleCategoriesSelect}
                options={allCategories}
              //isClearable
              />

              {/* <div className="text-danger">{selectedCategoriesError}</div> */}
            </Form.Group>

          </Row>

          <Row className="mb-3">

            <Form.Group as={Col} md="6" controlId="validationCustomUsername">
              <div className="d-inline-flex">
                <Form.Label>Credit Hours<span className="text-danger  required-text">*</span></Form.Label>
              </div>
              {/* <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text> */}
              <Form.Control
                type="text"
                placeholder="Credit Hours"
                name="courseCreditHours"
                className={
                  courseCreditHoursError.length > 0
                    ? "form-control  is-invalid"
                    : "form-control "
                }
                maxLength={"50"}
                onChange={changeHandler}
                value={courseCreditHours}
              />
              <div className="text-danger">{courseCreditHoursError}</div>
            </Form.Group>

            <Form.Group as={Col} md="6" controlId="validationCustomUsername">
              <div className="d-inline-flex">

                <Form.Label>Course Fee<span className="text-danger  required-text">*</span></Form.Label>
              </div>
              {/* <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text> */}
              <Form.Control
                type="text"
                placeholder="Course Fee"
                name="fee"
                className={
                  priceError.length > 0
                    ? "form-control  is-invalid"
                    : "form-control "
                }
                maxLength={"50"}
                onChange={changeHandler}
                value={price}
              />
              <div className="text-danger">{priceError}</div>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group controlId="courseDescription">
              <Form.Label className="my-1">Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Description"
                maxLength={"1000"}
                name="courseDescription"
                onChange={changeHandler}
                value={courseDescription}
                rows={3}
              />
            </Form.Group>
            {/* <div className="text-danger">{courseDescriptionError}</div> */}
          </Row>

          {/* <Row className="mb-3">
            <Form.Group controlId="courseAssignments">
              <Form.Label className="my-1">Assignments</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Assignments"
                name="courseAssignments"
                onChange={changeHandler}
                maxLength={"1000"}
                value={courseAssignments}
                rows={3}
              />
            </Form.Group>
          </Row> */}

          {props && props.formType === 2 && (
            <Row className="mb-3">
              <Form.Group controlId="learningOutcomes">
                <Form.Label className="my-1">Select Tutors</Form.Label>
                <Select
                  value={selectedTutors}
                  onChange={handleSelectTutors}
                  options={allTutors.map((usr) => ({
                    value: usr.id,
                    label: usr.Firstname,
                  }))}
                  // options={[{
                  //   value: "ba735fe5-0cbd-4e95-b7ab-992f0a2c31a0", label: "Umar"
                  // }]}
                  isClearable
                  isMulti
                />
              </Form.Group>
              {/* <div className="text-danger">{courseOutcomesError}</div> */}
            </Row>
          )}

          <Row className="mb-3">
            <Form.Group controlId="learningOutcomes">
              <Form.Label className="my-1">Select Course Timings</Form.Label>
              <Select
                value={courseTimings}
                onChange={handleTimingSelect}
                options={[
                  { label: "Morning", value: "MORNING" },
                  { label: "Noon", value: "NOON" },
                  { label: "Evening", value: "EVENING" },
                ]}
                //menuIsOpen={true}
                isClearable
                isMulti
              />
            </Form.Group>
            {/* <div className="text-danger">{courseTimingsError}</div> */}
          </Row>

          <Row className="mb-3">
            <Form.Group controlId="learningOutcomes">
              <Form.Label className="my-1">Learning Outcomes</Form.Label>
              <Form.Control
                as="textarea"
                maxLength={"1000"}
                placeholder="Learning Outcomes"
                name="courseOutcomes"
                onChange={changeHandler}
                value={courseOutcomes}
                rows={3}
              />
            </Form.Group>
            {/* <div className="text-danger">{courseOutcomesError}</div> */}
          </Row>

          {/* <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="learningOutcomes">
              <Form.Label className="my-1">Add Document</Form.Label>
             
              <Form.Control
                as="input"
            

                placeholder="Learning Outcomes"
                name="courseOutcomes"
                onChange={changeHandler}
                value={courseOutcomes}
                
              rows={1}
              />
               
            </Form.Group>
            <div className="text-danger">{courseOutcomesError}</div>
          </Row> */}
          <div className="row mt-3">
            <div className="col-4 mt-2">
              <div className="d-inline-flex">
                <label className="form-label fs-6 text-black">Upload Document<span className="text-danger required-text">*</span></label>
              </div>
              <div className="form-control">

                 {/* className={
              //   multiFilesError.length > 0
              //     ? "form-control  is-invalid"
              //     : "form-control "
              // }> */}

                <FilePicker
                  className="form-control d-inline-flex"
                  data={multiFiles}
                  afterUpload={afterMultiUpload}
                />
               

              </div>
              {/* <div className="text-danger">{UploadError}</div> */}

            </div>
            <div className="text-danger">{multiFilesError}</div>
            <div className="col-4 mt-2">
              <div className="d-inline-flex">
                <label className="form-label fs-6 text-black">Upload Course Image<span className="text-danger required-text">*</span></label>
              </div>
              <div className="form-control">
            <ImagePicker 
                className="form-control d-inline-flex"
                data={courseImage}
                afterUpload={afterImageUpload}
                avatar={false}
              />
              </div>  
            </div>  
          </div>
          {loadingInd &&
            <div className="loading-indicator">
              <Spinner animation="border" variant="primary" />
            </div>
          }
        </Modal.Body>

        <Modal.Footer>
          {/* <FilePicker data={multiFiles} afterUpload={afterMultiUpload} /> */}
          <Button
            className="ms-1"
            type="button"
            variant="secondary"
            onClick={props.onHide}
          >
            Cancel
          </Button>
          <Button className="ms-3" type="button" onClick={handleSubmit}>
            {props.formType === 1 ? "Save" : "Edit Course"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
export default CourseModal;
