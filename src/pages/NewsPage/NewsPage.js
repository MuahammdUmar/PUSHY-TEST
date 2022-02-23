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

const NewsPage = (props) => {
    
   // const [LanguageError, setLanguageError] = useState("");

    

    return (
        <>
        <Header/>
            <div className="container">
            <div className="row justify-content-center">
            <div className="col-7 mt-5">
                <h1><b>TECHIQ Business in the News</b></h1>
            </div>
            <div className="col-9 mt-5">
                <h3><b>TECHIQ Hires New President Greg Brown as Its Growth Continues</b></h3>
                <p><b>January 06,2022</b></p>
                <p>This key hire comes at a growth state for TECHIQ, which accelerated with the pandemic. In 2020, TECHIQ reached a $3.25 billion valuation and TECHIQ for Business surpassed $100 million in annual recurring revenue, according to its data.</p>
           <h4> <a href="">Read the full article at IBL News </a></h4>
            </div>

            <div className="col-9 mt-5">
                <h3><b>What HR Professionals Are Looking Forward to in 2021</b></h3>
                <p><b>March 19,2022</b></p>
                <p>TECHIQ SVP of People Cara Brennan Allamano looks ahead into 2021 and shares the importance of maintaining humanity within an organization.</p>
           <h4> <a href="">Read the full article at SHRM</a></h4>
            </div>
            <div className="col-9 mt-5">
                <h3><b>100 Best Places to Work in the Bay Area</b></h3>
                <p><b>November 06,2022</b></p>
                <p>Built In's “Best Places to Work” list rates companies based on their employer benefits and ranks organizations that are great places to work.</p>
                <h4> <a href="">Read the full article at Built IN</a></h4>
            </div>

            <div className="col-9 mt-5">
                <h3><b>TECHIQ Hires New President Greg Brown as Its Growth Continues</b></h3>
                <p><b>January 06,2022</b></p>
                <p>This key hire comes at a growth state for TECHIQ, which accelerated with the pandemic. In 2020, TECHIQ reached a $3.25 billion valuation and TECHIQ for Business surpassed $100 million in annual recurring revenue, according to its data.</p>
           <h4> <a href="">Read the full article at IBL News </a></h4>
            </div>

            <div className="col-9 mt-5">
                <h3><b>What HR Professionals Are Looking Forward to in 2021</b></h3>
                <p><b>March 19,2022</b></p>
                <p>TECHIQ SVP of People Cara Brennan Allamano looks ahead into 2021 and shares the importance of maintaining humanity within an organization.</p>
           <h4> <a href="">Read the full article at SHRM</a></h4>
            </div>
            <div className="col-9 mt-5">
                <h3><b>100 Best Places to Work in the Bay Area</b></h3>
                <p><b>November 06,2022</b></p>
                <p>Built In's “Best Places to Work” list rates companies based on their employer benefits and ranks organizations that are great places to work.</p>
                <h4> <a href="">Read the full article at Built IN</a></h4>
            </div>

            <div className="col-9 mt-5">
                <h3><b>TECHIQ Hires New President Greg Brown as Its Growth Continues</b></h3>
                <p><b>January 06,2022</b></p>
                <p>This key hire comes at a growth state for TECHIQ, which accelerated with the pandemic. In 2020, TECHIQ reached a $3.25 billion valuation and TECHIQ for Business surpassed $100 million in annual recurring revenue, according to its data.</p>
           <h4> <a href="">Read the full article at IBL News </a></h4>
            </div>

            <div className="col-9 mt-5">
                <h3><b>What HR Professionals Are Looking Forward to in 2021</b></h3>
                <p><b>March 19,2022</b></p>
                <p>TECHIQ SVP of People Cara Brennan Allamano looks ahead into 2021 and shares the importance of maintaining humanity within an organization.</p>
           <h4> <a href="">Read the full article at SHRM</a></h4>
            </div>
            <div className="col-9 mt-5">
                <h3><b>100 Best Places to Work in the Bay Area</b></h3>
                <p><b>November 06,2022</b></p>
                <p>Built In's “Best Places to Work” list rates companies based on their employer benefits and ranks organizations that are great places to work.</p>
                <h4> <a href="">Read the full article at Built IN</a></h4>
            </div>

            <div className="col-9 mt-5">
                <h3><b>TECHIQ Hires New President Greg Brown as Its Growth Continues</b></h3>
                <p><b>January 06,2022</b></p>
                <p>This key hire comes at a growth state for TECHIQ, which accelerated with the pandemic. In 2020, TECHIQ reached a $3.25 billion valuation and TECHIQ for Business surpassed $100 million in annual recurring revenue, according to its data.</p>
           <h4> <a href="">Read the full article at IBL News </a></h4>
            </div>

            <div className="col-9 mt-5">
                <h3><b>What HR Professionals Are Looking Forward to in 2021</b></h3>
                <p><b>March 19,2022</b></p>
                <p>TECHIQ SVP of People Cara Brennan Allamano looks ahead into 2021 and shares the importance of maintaining humanity within an organization.</p>
           <h4> <a href="">Read the full article at SHRM</a></h4>
            </div>
            <div className="col-9 mt-5">
                <h3><b>100 Best Places to Work in the Bay Area</b></h3>
                <p><b>November 06,2022</b></p>
                <p>Built In's “Best Places to Work” list rates companies based on their employer benefits and ranks organizations that are great places to work.</p>
                <h4> <a href="">Read the full article at Built IN</a></h4>
            </div>


           
           
            
            </div>
            </div>
        </>
    );
};

export default NewsPage;
