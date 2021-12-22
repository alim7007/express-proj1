import React, {useEffect, useState } from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import queryString from "query-string";
import "./Home.css"
const VerifyEmail = (props) => {
    const history = useHistory()
    let query = queryString.parse(props.location.search);
    useEffect(() => {
      const fetchPrivateDate = async () => {
          const config = {
            header: {
              "Content-Type": "application/json",
            },
          };
          const useless = {
            useless:'useless'
          }
        try {
        const { data } = await axios.post(`/verify_email?token=${query.token}`,useless,config);
        await localStorage.setItem("authToken", data.jwtHeaderToken);
        history.push("/")
        window.location.reload()
        } catch (error) {
          localStorage.removeItem("authToken");
        }
      };
      fetchPrivateDate();
    }, []);

    return (
        <>  
        <div id="body">
        </div>
        </>
    )
}

export default VerifyEmail
