import { useState,useEffect } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Profile =()=>

{
    const [error,setError] = useState("");
    const [authorizedData,setAuthorizedData]=useState("");
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
                console.log(res.data)
                if(res.code !== "success"){
                    localStorage.removeItem("authToken");
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
        <div><h1>Welcome to aioeam {authorizedData}</h1></div>
        <div><p>{error}</p></div>
        <button onClick={()=>{logoutHandler()}}>Logout</button>
    </>
    )
}