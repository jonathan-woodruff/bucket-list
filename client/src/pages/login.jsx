/* Login page */

import React, { useState } from 'react';
import Layout from '../components/layout';
import { onLogin } from '../api/auth';
import { useDispatch, useSelector } from 'react-redux';
import { authenticateUser } from '../redux/slices/authSlice';
import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { pink } from '@mui/material/colors';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://jonathan-woodruff.github.io/">
        Jonathan Woodruff
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme({
    palette: {
      primary: pink
    },
});

const Login = () => {
    const [values, setValues] = useState({
      email: '',
      password: '',
      isChecked: true
    });
    const [error, setError] = useState(false);

    const dispatch = useDispatch();

    const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value});
    };

    const toggleChecked = () => {
      if (values.isChecked) {
        setValues({ ...values, isChecked: false});
      } else {
        setValues({ ...values, isChecked: true});
      }    
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const { data } = await onLogin(values); //the server sends back a token/cookie
        setError('');
        dispatch(notSSO());
        dispatch(authenticateUser());
        localStorage.setItem('isAuth', 'true');
      } catch(error) {
        let errorMessage = error.response.data.errors[0].msg;
        if (errorMessage === 'data and hash arguments required') {
          errorMessage = 'Sign in with Google, or sign up with a password';
        }
        console.log(errorMessage); //error from axios
        setError(errorMessage);
      }
    };

    const { serverURL } = useSelector(state => state.glob);

    const google = () => {
      window.open(`${serverURL}/auth/google`, '_self'); //server call
    };

    return (
      <Layout>
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
              <Typography component="h1" variant="h5">
                Log in
              </Typography>
              <Box component="form" onSubmit={ (e) => handleSubmit(e) } noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={ values.email }
                  onChange={ (e) => handleChange(e) }
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={ values.password }
                  onChange={ (e) => handleChange(e) }
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox checked={ values.isChecked } color="primary" onChange={ () => toggleChecked() } />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, mb: 2 }}
                >
                  Log In
                </Button>
                <Grid container justifyContent="center">
                  <Grid item>
                    <Link href="/register" variant="body2">
                      Don't have an account? Sign Up
                    </Link>
                  </Grid>
                </Grid>
                <div style={{ color: 'red', margin: '10px 0', textAlign: 'center' }}>{ error }</div>
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        </ThemeProvider>
      </Layout>
    )
  };
  
  export default Login;