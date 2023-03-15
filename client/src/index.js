import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';
// const routes = createBrowserRouter([

//   {
//     path: "/",
//     element: <App />
//   },
//   {
//     path: "/login",
//     element: <Login />
//   },
//   {
//     path: "register",
//     element: <Register />
//   },
//   { 
//     path: "forgot-password", 
//     element: <ForgotPassword /> 
//   },
//   { 
//     path: "reset-password/:reset_token", 
//     element: <ResetPassword /> 
//   }
// ]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <CssBaseline />
    <App/>
    </BrowserRouter>
  </React.StrictMode>
);


