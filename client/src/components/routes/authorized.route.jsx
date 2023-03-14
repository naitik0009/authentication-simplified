import {Outlet,Navigate} from "react-router-dom";

export const AuthorizedRoutes = ()=>{
    let auth = localStorage.getItem("authToken");
    return (
     auth?<Outlet/>:<Navigate to={"/login"}/>
    );
}