import React, { useState } from 'react'
import { TextField, Button, Grid, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { signUp as customerSignUp } from '../../api/customer';
import { signUp as caretakerSignUp } from '../../api/caretaker';
import { useHistory } from 'react-router-dom';
import FileBase from 'react-file-base64';

const useStyles = makeStyles(() => ({
  header: {
    marginTop: '10px',
    marginBottom: '10px',
    fontSize: '24px',
  },
  input: {
    margin: '10px',
    width: '50%',
    // minWidth:  '200px',
  },
  button: {
    width: '18%',
    minWidth: '200px',
    marginTop: '10px',
    marginBottom: '10px',
  }
}));

const Register = () => {
  const CUSTOMER = 'customer';
  const CARETAKER = 'caretaker';
  const classes = useStyles();
  const [user, setUser] = useState(CUSTOMER);
  const defaultDetails = {
    name: '',
    age: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    emergencyPhone: '',
    preferredCustomer: '',
    aboutMe: '',
    photo: '',
  };
  const [details, setDetails] = useState(defaultDetails);
  const history = useHistory();

  const changeUserType = () => {
    if(user === CUSTOMER) {
      setUser(CARETAKER);
    }
    else {
      setUser(CUSTOMER);
    }
    setDetails(defaultDetails);
  }

  const handleChange = (e) => {
    setDetails({...details, [e.target.name]: e.target.value});
  }


  const signUp = async () => {
    if(user === CUSTOMER) {
      await customerSignUp(details)
      .then(res => {
        if(res.status === 200) {
          localStorage.setItem('customerToken', res.data.token);
          localStorage.setItem('customerName', res.data.name);
          localStorage.setItem('customerPhoto', details.photo);
          history.push('/customer');
        }
      })
      .catch(err => {
        console.log(err);
      });
    }
    else {
      await caretakerSignUp(details)
      .then(res => {
        if(res.status === 200) {
          localStorage.setItem('caretakerToken', res.data.token);
          localStorage.setItem('caretakerName', res.data.name);
          history.push('/caretaker');
        }
      })
      .catch(err => {
        console.log(err);
      });
    }
  }

  return (
    <Grid container>
      <Grid item xs={12} align='center' className={classes.header}>
        <p>{user === CUSTOMER ? 'Customer' : 'Caretaker'} Registration</p>
      </Grid>
      <Grid item md={2}></Grid>
      <Grid item container xs={12} md={4}>
        <Grid item xs={12} align='center'>
          <TextField className={classes.input} variant='outlined' label='Name' name='name' value={details.name} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} align='center'>
          <TextField className={classes.input} variant='outlined' label='Age' name='age' value={details.age} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} align='center'>
          <TextField className={classes.input} variant='outlined' type='email' label='Email' name='email' value={details.email} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} align='center'>
          <TextField className={classes.input} variant='outlined' type='password' label='Password' name='password' value={details.password} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} align='center'>
          <TextField className={classes.input} variant='outlined' label='Phone' name='phone' value={details.phone} onChange={handleChange} />
        </Grid>
      </Grid>
      <Grid item container xs={12} md={4}>
        {user === CUSTOMER && <Grid item xs={12} align='center'>
          <TextField className={classes.input} variant='outlined' label='Emergency Phone' name='emergencyPhone' value={details.emergencyPhone} onChange={handleChange} />
        </Grid>}
        {user === CARETAKER && <Grid item xs={12} align='center'>
          <FormControl variant='outlined' style={{width: '18%'}}>
            <InputLabel id='select-label'>Preferred Customer</InputLabel>
            <Select label='Preferred Customer' style={{textAlign: 'left'}} labelId='select-label' name='preferredCustomer' value={details.preferredCustomer} onChange={handleChange}>
              <MenuItem value='any'>Any</MenuItem>
              <MenuItem value='children'>Children</MenuItem>
              <MenuItem value='adult'>Adult</MenuItem>
              <MenuItem value='elderly'>Elderly</MenuItem>
            </Select>
          </FormControl>
        </Grid>}
        <Grid item xs={12} align='center'>
          <TextField className={classes.input} variant='outlined' multiline rows={5} label='Address' name='address' value={details.address} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} align='center'>
          <TextField className={classes.input} variant='outlined' multiline rows={5} label='About Me' name='aboutMe' value={details.aboutMe} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} align='center'>
          Upload image: <FileBase type="file" multiple={false} onDone={({base64}) => setDetails({...details, selectedFile: base64})}/>
        </Grid>
      </Grid>
      <Grid md={2}></Grid>
      <Grid item xs={12} align='center'>
        <Button variant='contained' color='primary' className={classes.button} onClick={signUp}>Sign Up</Button>
      </Grid>
      <Grid item xs={12} align='center'>
        <Button color='primary' className={classes.button} onClick={changeUserType}>{user === CUSTOMER ? 'Caretaker' : 'Customer'} Sign Up</Button>
      </Grid>
      <Grid item xs={12} align='center'>
        <Button color='primary' className={classes.button}>Have an accout? Sign In</Button>
      </Grid>
    </Grid>
  );
}

export default Register;