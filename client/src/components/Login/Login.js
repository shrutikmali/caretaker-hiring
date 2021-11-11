import React, { useState } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { signIn as caretakerSignIn } from '../../api/caretaker';
import { signIn as customerSignIn } from '../../api/customer';


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
  const CUSTOMER = 'customer';
  const CARETAKER = 'caretaker'
  const [loginType, setLoginType] = useState(CUSTOMER);
  const [credentials, setCredentials] = useState(defaultCredentials);

  const classes = useStyles();
  const history = useHistory();

  const changeLoginType = () => {
    if(loginType === CUSTOMER) {
      setLoginType(CARETAKER);
    }
    else {
      setLoginType(CUSTOMER);
    }
    setCredentials(defaultCredentials);
  }

  const handleChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value});
  }

  const goToRegister = () => {
    history.push('/register');
  }

  const login = async () => {
    if(loginType === CUSTOMER) {
      await customerSignIn(credentials)
      .then(res => {
        if(res.status === 200) {
          localStorage.setItem('customerToken', res.data.token);
          localStorage.setItem('customerName', res.data.name);
          localStorage.setItem('customerPhoto', res.data.photo);
          history.push('/customer');
        }
      })
      .catch(err => {
        alert("Incorrect credentials");
        console.log(err.response.status);
      });
    }
    else {
      await caretakerSignIn(credentials)
      .then(res => {
        if(res.status === 200) {
          localStorage.setItem('caretakerToken', res.data.token);
          localStorage.setItem('caretakerName', res.data.name);
          localStorage.setItem('caretakerPhoto', res.data.photo);
          history.push('/caretaker');
        }
      })
      .catch(err => {
        alert("Incorrect credentials");
        console.log(err.response.status);
      });
    }
  }

  return (
    <>
      <Grid container justify='center'>
        <Grid item xs={12} align='center'>
          <h2 className={classes.title}>{loginType === CUSTOMER ? 'Customer Login' : 'Caretaker Login'}</h2>
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
        <Button color='primary' className={classes.button} style={{width: 'auto', textTransform: 'none'}} onClick={changeLoginType}>{loginType === CUSTOMER ? 'Caretaker Login' : 'Customer Login'}</Button>
      </Grid>
      <Grid item xs={12} align='center'>
        <Button color='primary' className={classes.button} style={{width: 'auto', textTransform: 'none', marginTop: '10px'}} onClick={goToRegister}>Don't have an account? Sign Up</Button>
      </Grid>
    </>
  );
}


export default Login;