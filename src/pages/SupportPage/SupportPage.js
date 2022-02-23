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

const SupportPage = (props) => {
    
   // const [LanguageError, setLanguageError] = useState("");

    

    return (
        <>
        <Header/>
            <h1>This is Support us page</h1>
        </>
    );
};

export default SupportPage;
