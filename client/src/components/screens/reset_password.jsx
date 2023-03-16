import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { Alert,AlertTitle } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
const theme = createTheme();

export const  ResetPassword=()=> {
    const navigate = useNavigate();
    const  {resetId} = useParams();
const [isLoading,setLoading] = React.useState(false);
const [password,setPassword] = React.useState("");
const [reset,setreset]=React.useState(null);

  const handleSubmit =async (event) => {
    event.preventDefault();
console.log(resetId);
    const config = {
      header: { "Content-Type": "application/json" },
  };
  try {
    const send = await axios.put(`http://127.0.0.1:8000/api/v1/reset-password/${resetId}`,{password},config).then((response)=>{
        console.log(response.data);
        if(response.data.code==="success"){
            setTimeout(() => {
                setreset(true);
                setLoading(true)
            }, 3000);  
            
              setLoading(false);
            }else if(response.data.code==="ErrorResponse"){
              setreset(false);
            }
    }).catch((error)=>{
        setreset(false);
    });
   
  } catch (error) {
    setreset(false);
  }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {reset?<>
            <Alert severity={reset?"success":"error"}>
  <AlertTitle>{reset?"Success":"Failed"}</AlertTitle>
  {"Password reset successfully"}--<strong>{reset?"Click on below button to go to your login page":"cannot reset your password link expired"}</strong>
</Alert>
<Button onClick={()=>{navigate("/login")}}>Login Page</Button>
          </>:<>

<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            
            </Avatar>
           {isLoading?<CircularProgress/>:<>
            <Typography component="h1" variant="h5">
              Enter Your Email To Reset The Password
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
  
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="New Password"
                name="password"
                onChange={(event)=>{setPassword(event.target.value)}}
                autoComplete="password"
                autoFocus
              />
                {/* <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={(event)=>{setEmail(event.target.value)}}
                autoComplete="email"
                autoFocus
              /> */}
            
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Send Link
              </Button>
              <Grid container>
  
                <Grid item>
                  <Link href="/login" variant="body2">
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
           </>}
</>}

        </Box>
  
      </Container>
    </ThemeProvider>
  );
}