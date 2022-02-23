import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import Header from "../Header/Header";


import {
    GET_USER_ID,
    UPDATE_USER,
    CREATE_DOCUMENT,
    GET_DOCUMENT_BY_ID,
} from "../../shared/constants";
import { useToasts } from "react-toast-notifications";

const AboutUs = (props) => {
    
   // const [LanguageError, setLanguageError] = useState("");

    

    return (
        <>
        <Header/>
        <div className="container-fluid mb-5 bg-dark">
        <div className="row">
          <div className="col-12  mt-5">
            <div className="text-center my-5 mb-5 ">
              <div>
                <h3 className="text-white mb-2 ">Tomorrow’s skills, today</h3>
                <h2 className="text-white mb-3">
                  <b>TECHIQ PLATFORM</b>
                </h2>
                <p className="text-white mb-2 ">Fueled by the TECHIQ marketplace, TECHIQ Business helps companies achieve critical business outcomes and stay competitive by offering fresh, relevant, and personalized on-demand learning. The TECHIQ Business subscription is a curation of top-rated courses taught by real-world experts from the TECHIQ marketplace. Our content covers key business and technical topics ranging from development and IT to leadership, marketing, design, stress management, and much more. In addition to a curated content collection, we offer a platform to drive effective learning as well as tools for leaders to host and distribute their own proprietary content.</p>
                <button className="btn btn-success">Learn More</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid mt-5 h-auto">
        <div className="row justify-content-center">
          <div className="col-12 ">
            <h2 className="text-center">By the numbers</h2>
            <hr className="container  w-25 text-primary" />

            <div className="container">
              <div className="row mt-5 justify-content-center">
                {/* <div className="col-1 mt-5 pt-5">
                  <IoIosArrowBack size={66} />
                </div> */}

                <div className="col-3">
                  {" "}
                  <div className="card h-100">
                    {/* <img src={degreepic} className="card-img-top" alt="..." /> */}
                    <div className="card-body">

                        <h2>  <b>22.5k+</b></h2>
                      <h6 className="card-title">
                        <b>What is Lorem Ipsum?</b>
                      </h6>
                      <p className="card-text">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Laudantium ad recusandae deserunt aliquam autem
                        nam .
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-3">
                  {" "}
                  <div className="card h-100">
                    {/* <img src={degreepic} className="card-img-top" alt="..." /> */}
                    <div className="card-body">
                    <h2>  <b>80.5k+</b></h2>

                      <h6 className="card-title">
                        <b>What is Lorem Ipsum?</b>
                      </h6>
                      <p className="card-text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quasi praesentium dolorem veritatis ilrchitecto ea
                        accus.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-3">
                  
                  <div className="card h-100">
                    {/* <img src={degreepic} className="card-img-top" alt="..." /> */}
                    <div className="card-body">
                    <h2>  <b>42.5k+</b></h2>

                      <h6 className="card-title">
                        <b>What is Lorem Ipsum?</b>
                      </h6>
                      <p className="card-text">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Aliquidim. Doloremque eum harum nihil, nostrum
                        obcaecati
                      </p>
                    </div>
                  </div>
                </div>
                {/* <div className="col-1 mt-5 pt-5">
                  <IoIosArrowForward size={66} />
                </div> */}
              </div>
            </div>
       
          </div>
        </div>
      </div>
        </>
    );
};

export default AboutUs;
