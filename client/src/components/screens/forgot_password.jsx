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

const theme = createTheme();

export const  ForgotPassword=()=> {

const [email,setEmail] = React.useState("");
const [sent,setSent]=React.useState(null);

  const handleSubmit =async (event) => {
    event.preventDefault();

    const config = {
      header: { "Content-Type": "application/json" },
  };
  try {
    const send = await axios.post("http://127.0.0.1:8000/api/v1/forgot-password",{email},config);
    if(send.data.code==="success"){
      setSent(true);
    }else if(send.data.code==="ErrorResponse"){
      setSent(false);
    }
  } catch (error) {
    setSent(false);
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
          {sent?<Alert severity={sent?"success":"error"}>
  <AlertTitle>{sent?"Success":"Failed"}</AlertTitle>
  {"Email sent successfully"}--<strong>{sent?"check your mail box!":"no user found with this email"}</strong>
</Alert>:<>

<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            
            </Avatar>
            <Typography component="h1" variant="h5">
              Enter Your Email To Reset The Password
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
  
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={(event)=>{setEmail(event.target.value)}}
                autoComplete="email"
                autoFocus
              />
            
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

        </Box>
  
      </Container>
    </ThemeProvider>
  );
}