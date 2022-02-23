import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import {CREATE_NEWS , GET_ALL_NEWS, UPDATE_NEWS , GET_NEWS_BY_ID} from "../../shared/constants";
import { useToasts } from "react-toast-notifications";

const EditNews = (props) => {
    const [multiFiles, setMultitFiles] = useState({});

    const [Status, setStatus] = useState("");
    const [StatusError, setStatusError] = useState("");
    const [id, setid] = useState("");
    const [Title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [NewsType, setNewsType] = useState("");
    const [Language, setLanguage] = useState("");
    const [Upload, setUpload] = useState("");
    const [TitleError, setTitleError] = useState("");
    const [DescriptionError, setDescriptionError] = useState("");
    const [idError, setidError] = useState("");
    const [NewsTypeError, setNewsTypeError] = useState("");
    const {} = useQuery(GET_ALL_NEWS, {
        onError: {
          // Do nothiing
        },
      });

    const { addToast } = useToasts();

    const { data: dataNews } = useQuery(GET_NEWS_BY_ID, {
        variables: { id: props && props.newsId },
        skip: props && props.newsId === 0,
        onError: () => {
          props.onHide()
        },
      })

    const [Create, { loading, error, data ,refetch }] = useMutation(UPDATE_NEWS, {
        variables: {
            updateNewsInput: {
                Title: Title,
                Description: Description,
                NewsType: NewsType,
                // Attachment: multiFiles,
                Status: Status,
            },
            id: props.newsId,
        },

        
        onCompleted: (data) => {
            addToast("News Added Successfully", { appearance: "success" });
            props.onHide("update");
            refetch()
        },
        onError: () => {
            //Do nothing
        },
    });

    useEffect(() => {
        if (dataNews) {
          console.log("dataNews", dataNews);
          setTitle(dataNews.getNewsById.Title);
          setDescription(dataNews.getNewsById.Description);
          setNewsType(dataNews.getNewsById.NewsType);
        }
      }, [dataNews]);

    const changeHandler = (e) => {
        const { name, value } = e.target;

        if (e.target.name === "title") {
            if (e.target.value.toString().length < 50) {
                setTitle(e.target.value);

                setTitleError("");
            }
            else {
                setTitle(e.target.value);

                setTitleError("Title must be less than 50 characters");

            }
        }
        else if (e.target.name === "description") {
            if (e.target.value.toString().length < 1000) {
                setDescription(e.target.value);

                setDescriptionError("");
            }
            else {
                setDescription(e.target.value);

                setDescriptionError("Description must be less than 1000 characters");

            }
        } 
        else if (e.target.name === "newstype") {
                setNewsType(e.target.value);
                setNewsTypeError("");
        

        }
    };

    const submitHandler = async (e) => {
        let pErr = false;
        e.preventDefault();
        if (Title === "") {
            setTitleError("Please Enter Title");
            pErr = true;
        }
        if (Description === "") {
            setDescriptionError("Please Enter Description");
            pErr = true;
        }
        if (NewsType === "") {
            setNewsTypeError("Please Enter News Type");
            pErr = true;
        }
        if(!pErr){
            Create()
            refetch()
        }
    };

    return (
        <>
            <Modal show={props.show} onHide={props.onHide} animation={true} size="lg">
                <Modal.Header closeButton className="">
                    <Modal.Title className="fs-3">Add News</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="d-inline-flex">
                                        <label className="form-label fs-6 text-black">Title<span className="text-danger fs-5 required-text"></span></label>
                                    </div>
                                    <input
                                        className="form-control form-control-md mt-2 border-dark"
                                        type="text"
                                        // maxLength="2"
                                        placeholder="Title"
                                        name="title"
                                        onChange={changeHandler}
                                        value={Title}
                                    />
                                    <div className="text-danger">{TitleError}</div>

                                </div>

                            </div>
                            <div className="row mt-3">
                                <div className="col-12 mt-2">
                                    <div className="d-inline-flex">
                                        <label className="form-label fs-6 text-black">Description<span className="text-danger fs-5 required-text"></span></label>
                                    </div>
                                    <textarea
                                        className="form-control form-control-md mt-2 border-dark"
                                        type="text"
                                        // maxLength="1000"
                                        placeholder="Description"
                                        name="description"
                                        onChange={changeHandler}
                                        value={Description}
                                    />
                                    <div className="text-danger">{DescriptionError}</div>

                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-12 mt-2 ">
                                    <div className="d-inline-flex">
                                        <label className="form-label fs-6 text-black">News Type<span className="text-danger fs-5 required-text"></span></label>
                                    </div>
                                    <input
                                        className="form-control form-control-md mt-2 border-dark"
                                        type="text"
                                        // maxLength="2"
                                        placeholder="News Type"
                                        name="newstype"
                                        onChange={changeHandler}
                                        value={NewsType}
                                    />
                                    <div className="text-danger">{NewsTypeError}</div>
                                </div>

                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                <Button
                        className="ms-1 w-25 border-dark"
                        type="button"
                        variant="primary"
                        // onClick={submitHandler}
                    >
                        Post
                    </Button>
                    <Button
                        className="ms-1 w-25 border-dark"
                        variant="secondary"
                        onClick={props.onHide}
                    >
                        Close
                    </Button>
                    <Button
                        className="ms-1 w-25 border-dark"
                        type="button"
                        variant="primary"
                        onClick={submitHandler}
                    >
                        Save
                    </Button>
          
                </Modal.Footer>
            </Modal>

        </>
    );
};

export default EditNews;
