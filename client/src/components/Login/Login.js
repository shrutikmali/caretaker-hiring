import React, { useState } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


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
  const [loginType, setLoginType] = useState('customer');
  const classes = useStyles();

  const changeLoginType = () => {
    if(loginType === 'customer') {
      setLoginType('caretaker');
    }
    else {
      setLoginType('customer');
    }
  }

  return (
    <>
      <Grid container justify='center'>
        <Grid item xs={12} align='center'>
          <h2 className={classes.title}>{loginType === 'customer' ? 'Customer Login' : 'Caretaker Login'}</h2>
        </Grid>
        <Grid item xs={12} align='center'>
          <TextField className={classes.input} variant='outlined' label='Email' type='email'></TextField>
        </Grid>
        <Grid item xs={12} align='center'>
          <TextField className={classes.input} variant='outlined' label='Password' type='password'></TextField>
        </Grid>
      </Grid>
      <Grid item xs={12} align='center'>
        <Button variant='contained' color='primary' className={classes.button}>Login</Button>
      </Grid>
      <Grid item xs={12} align='center'>
        <Button color='primary' className={classes.button} style={{width: 'auto', textTransform: 'none'}}>Don't have an account? Sign Up</Button>
      </Grid>
      <Grid item xs={12} align='center'>
        <Button color='primary' className={classes.button} style={{width: 'auto', textTransform: 'none', marginTop: '10px'}} onClick={changeLoginType}>{loginType === 'customer' ? 'Caretaker Login' : 'Customer Login'}</Button>
      </Grid>
    </>
  );
}

export default Login;