import React, { useEffect, useState,useMemo } from "react";
import ReactTable from "../../shared/data-table/react-table";

import Header from "../Header/Header";
import { useQuery } from "@apollo/client";
import {
  GET_ALL_CONTACTUS
} from "../../shared/constants";

const Support = () => {
  const [mydata, setData] = useState([]);
  

  const {
    data: ContactUsData,
    loading: Contactloading,
  } = useQuery(GET_ALL_CONTACTUS);


  useEffect(() => {
    console.log("AllContactUsData", ContactUsData);
    if (ContactUsData) {
      setData(ContactUsData.getAllContactUs);
    }
  }, [ContactUsData]);
  const AllContactUsData = useMemo(() => [
    {
      Header: "Email",
      accessor: "Email",
    },
    {
      Header: "Phone No",
      accessor: "PhoneNo",
    },
    {
      Header: "Description",
      accessor: "Description",
    },
    
   
    
  
  ],
    []
  );


  return (
    <>
      <Header />
      <div className="container">
        <div className="card mt-3">
          <div className="card-header">
            <h4 className="mb-0 card-tital h4">Support</h4>
          </div>

          <div className="card-body">
          <ReactTable
              columns={AllContactUsData}
              data={mydata}
              //filterValue={value}
              loading={Contactloading}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Support;
