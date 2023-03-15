import { useState,useEffect } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Avatar } from "@mui/material";
import logo from "../../../assets/logo.jpg"
export const Profile =()=>

{
    const [error,setError] = useState([]);
    const [authorizedData,setAuthorizedData]=useState([]);
    const navigate = useNavigate();

    useEffect(()=>{

        if(!localStorage.getItem("authToken")){
            navigate("/login");
        };
        async function getData(){
            const response = await fetch("http://127.0.0.1:8000/api/v1/profile",{
                method:"GET",
                headers:{
                    'Content-Type': 'application/json',
                    authorization : `bearer ${localStorage.getItem("authToken")}`, 
                }
            });
            const result = await response.json().then((res)=>{
                console.log(res.data.message);
                if(res.code !== "success"){
                    console.log("nahi huwa login vai")
                    localStorage.removeItem("authToken");
                }else if(res.code === "ErrorResponse"){
                    alert(res.mesage,"cannot login");
                }
                setAuthorizedData(res.data.username);
            }).catch((error)=>{
                localStorage.removeItem("authToken");
                setError(error);
            })
        };
        getData();
    },[navigate]);

const logoutHandler = ()=>{
    localStorage.removeItem("authToken");
    navigate("/login");
}

    return (
        <>
          <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <Avatar src={logo} style={{marginRight:"5px"}}/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AIOEAM
          </Typography>
          <Button color="inherit" onClick={()=>{logoutHandler()}}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
        <div><h1>Welcome to aioeam {authorizedData}</h1></div>
        
       
    </>
    )
}