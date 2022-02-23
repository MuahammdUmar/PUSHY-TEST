import React, { useEffect, useState } from "react";
import { Spinner, Table } from "react-bootstrap";
import "./Review.css";
import {
  MdOutlineCheckCircleOutline,
  MdOutlineHighlightOff,
} from "react-icons/md";
import Header from "../Header/Header";
import { useMutation, useQuery } from "@apollo/client";
import {
  APPROVE_RATING,
  GET_ALL_RATING,
  REJECT_RATING,
} from "../../shared/constants";
import { useToasts } from "react-toast-notifications";

const Review = () => {
  const [ratings, setRatings] = useState([]);
  const { addToast } = useToasts();

  const {
    data: dataRatings,
    refetch,
    loading: loadingReviews,
  } = useQuery(GET_ALL_RATING);

  useEffect(() => {
    if (dataRatings) {
      setRatings(dataRatings.getAllRatings);
    }
  }, [dataRatings]);

  const [approveRating] = useMutation(APPROVE_RATING);
  const [rejectRating] = useMutation(REJECT_RATING);

  const approve = (id, ratingId) => {
    approveRating({
      variables: { id: id, RatingId: ratingId },
      onCompleted: () => {
        addToast("Review Approved Successfully", { appearance: "success" });
        refetch();
      },
    });
  };

  const reject = (id, ratingId) => {
    rejectRating({
      variables: { id: id, RatingId: ratingId },
      onCompleted: () => {
        addToast("Review Reject Successfully", { appearance: "success" });
        refetch();
      },
    });
  };

  const getRating = (type) => {
    var rating = {
      20: "Very Poor",
      40: "Poor",
      60: "Fair",
      80: "Good",
      100: "Excellent",
      default: "GOOD",
    };
    return rating[type] || rating["default"];
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="card mt-3">
          <div className="card-header">
            <h4 className="mb-0 card-tital h4">Review</h4>
          </div>

          <div className="card-body">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>
                    <b>#</b>
                  </th>
                  <th>
                    <b>Student Name</b>
                  </th>
                  <th>
                    <b>Course Rating</b>
                  </th>
                  <th>
                    <b>Review Description</b>
                  </th>
                  <th>
                    <b>Status</b>
                  </th>
                  <th>
                    <b>Actions</b>
                  </th>
                </tr>
              </thead>
              <tbody>
                {ratings &&
                  ratings.map((rating, i) => {
                    return (
                      <tr>
                        <td>{i + 1}</td>
                        <td>{rating.StudentName}</td>
                        <td>{getRating(rating.Rating)}</td>
                        <td>{rating.Comment}</td>
                        <td>{rating.Status}</td>
                        <td>
                          <button className="btn">
                            <MdOutlineCheckCircleOutline
                              title="Approve"
                              fontSize={25}
                              onClick={() =>
                                approve(rating.id, rating.RatingId)
                              }
                              fill="green"
                            />
                          </button>
                          <button className="btn">
                            <MdOutlineHighlightOff
                              title="Reject"
                              fontSize={25}
                              onClick={() => reject(rating.id, rating.RatingId)}
                              fill="red"
                            />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                {loadingReviews && (
                  <div className="loading-indicator">
                    <Spinner animation="border" variant="primary" /> Loading...
                  </div>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Review;
