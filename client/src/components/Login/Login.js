import React, { useState } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles(() => ({
  title: {
    marginTop: '15px',
    marginBottom: '10px',
  },
  input: {
    marginTop: '20px',
    fontSize: '14px',
    width: '250px',
  },
  button: {
    width: '250px',
    marginTop: '30px',
  }
}));

const Login = () => {
  const defaultCredentials = {
    email: '',
    password: '',
  };
  const [loginType, setLoginType] = useState('customer');
  const [credentials, setCredentials] = useState(defaultCredentials);

  const classes = useStyles();
  const history = useHistory();

  const changeLoginType = () => {
    if(loginType === 'customer') {
      setLoginType('caretaker');
    }
    else {
      setLoginType('customer');
    }
    setCredentials(defaultCredentials);
  }

  const handleChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value});
  }

  const goToRegister = () => {
    history.push('/register');
  }

  const login = () => {
    console.log(credentials);
    if(loginType === 'customer') {
      // Call sign in from customer api
    }
    else {
      // Call sign in from caretaker api
    }
  }

  return (
    <>
      <Grid container justify='center'>
        <Grid item xs={12} align='center'>
          <h2 className={classes.title}>{loginType === 'customer' ? 'Customer Login' : 'Caretaker Login'}</h2>
        </Grid>
        <Grid item xs={12} align='center'>
          <TextField className={classes.input} name='email' variant='outlined' label='Email' type='email' onChange={handleChange}></TextField>
        </Grid>
        <Grid item xs={12} align='center'>
          <TextField className={classes.input} name='password' variant='outlined' label='Password' type='password' onChange={handleChange}></TextField>
        </Grid>
      </Grid>
      <Grid item xs={12} align='center'>
        <Button variant='contained' color='primary' className={classes.button} onClick={login}>Login</Button>
      </Grid>
      <Grid item xs={12} align='center'>
        <Button color='primary' className={classes.button} style={{width: 'auto', textTransform: 'none'}} onClick={changeLoginType}>{loginType === 'customer' ? 'Caretaker Login' : 'Customer Login'}</Button>
      </Grid>
      <Grid item xs={12} align='center'>
        <Button color='primary' className={classes.button} style={{width: 'auto', textTransform: 'none', marginTop: '10px'}} onClick={goToRegister}>Don't have an account? Sign Up</Button>
      </Grid>
    </>
  );
}

export default Login;