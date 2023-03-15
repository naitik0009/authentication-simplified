import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { Avatar} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import logo from "../../assets/logo.jpg";
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import style from "./css/home.css";

export default function () {
  const navigate = useNavigate();
  return (
    <>
    <div >

    
      <AppBar  position="static" >
        <Toolbar>
            <Avatar src={logo} style={{marginRight:"5px"}}/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AIOEAM
          </Typography>
          <Button size='small' onClick={()=>{navigate("/login")}}  variant='contained' style={{marginRight:"10px"}}>Sign In</Button>
          <Button size='small' onClick={()=>{navigate("/login")}}  variant='contained'  >Sign Up</Button>
        </Toolbar>
      </AppBar>
    
  
    </div>  </>
  );
}