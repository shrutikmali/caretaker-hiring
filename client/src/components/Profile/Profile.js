import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, Avatar, FormControl, Select, MenuItem, InputLabel } from '@material-ui/core';
import { customerDetails, updateCustomerDetails } from '../../api/customer';
import { caretakerDetails, updateCaretakerDetails } from '../../api/caretaker';
import FileBase from 'react-file-base64';


const inputStyle = {
  width: '250px',
}

const Profile = ({ type }) => {
  
  const [details, setDetails] = useState({});
  const [newDetails, setNewDetails] = useState({});
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if(type === "customer") {
      const token = localStorage.getItem("customerToken");
      const fetchDetails = async (token) => {
        await customerDetails(token)
        .then(res => {
          // console.log(res.data.details);
          setDetails(res.data.details);
          setNewDetails(res.data.details);
        })
        .catch(err => {
          console.log(err.message);
        });
      }
      fetchDetails(token);
    }
    else {
      const token = localStorage.getItem("caretakerToken");
      const fetchDetails = async (token) => {
        await caretakerDetails(token)
        .then(res => {
          setDetails(res.data.details);
          setNewDetails(res.data.details);
          // console.log(res.data.details);
        })
        .catch(err => {
          console.log(err.message);
        });
      }
      fetchDetails(token);
    }
  }, []);

  const handleChange = (e) => {
    setNewDetails({...newDetails, [e.target.name]: e.target.value});
  }

  const buttonClick = async () => {
    if(edit) {
      if(type === "customer") {
        updateCustomer();
      }
      else {
        console.log(newDetails);
        updateCaretaker();
      }
      setEdit(false);
    }
    else {
      setEdit(true);
    }
  }

  const updateCustomer = async () => {
    const token = localStorage.getItem("customerToken");
    await updateCustomerDetails(token, newDetails)
    .then(res => {
      localStorage.setItem("customerPhoto", newDetails.photo);
    })
    .catch(err => {
      console.log(err.message);
    })
  }
  
  const updateCaretaker = async () => {
    const token = localStorage.getItem("caretakerToken");
    await updateCaretakerDetails(token, newDetails)
    .then(res => {
      localStorage.setItem("caretakerPhoto", newDetails.photo);
      alert("Done");
    })
    .catch(err => {
      console.log(err.message);
    })
  }

  const cancelChanges = () => {
    setNewDetails(details);
    setEdit(false);
  }

  return (
    <Grid container spacing={4} style={{marginTop: '20px'}}>
      <Grid item xs={12} md={4} align='center'>
        <Avatar style={{width: '200px', height: '200px'}} src={newDetails.photo}/>
        {edit && <div>Upload image: <FileBase type="file" multiple={false} onDone={({base64}) => setNewDetails({...newDetails, photo: base64})}/></div>}
        {edit && <Button variant="contained" color="primary" style={{marginTop: '10px'}} onClick={() => setNewDetails({...newDetails, photo: ''})}>Clear image</Button>}
        {type === "caretaker" && <div style={{marginTop: '10px'}}><p>Rating: {newDetails.rating}</p></div>}
      </Grid>
      <Grid item container xs={12} md={8} spacing={2}>
        <Grid item xs={12}>
          <TextField variant="outlined" style={inputStyle} name="name" label="Name" value={newDetails.name} InputLabelProps={{shrink: true}} disabled onChange={handleChange}></TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField variant="outlined" style={inputStyle} name="age" label="Age" value={newDetails.age} InputLabelProps={{shrink: true}} disabled={!edit} onChange={handleChange}></TextField>
        </Grid>
        {type === "caretaker" && <Grid item xs={12}>
          <TextField variant="outlined" style={inputStyle} name="phone" label="Phone" value={newDetails.phone} InputLabelProps={{shrink: true}} disabled={!edit} onChange={handleChange}></TextField>
        </Grid>}
        {type === "caretaker" && <Grid item xs={12}>
          <FormControl variant='outlined' style={inputStyle} disabled={!edit}>
            <InputLabel id='preferred-customer'>Preferred Customer</InputLabel>
            <Select label='Preferred Customer' style={{textAlign: 'left'}} value={newDetails.preferredCustomer} labelId='preferred-customer' name='preferredCustomer' onChange={handleChange}>
              <MenuItem value='any'>Any</MenuItem>
              <MenuItem value='children'>Children</MenuItem>
              <MenuItem value='adult'>Adult</MenuItem>
              <MenuItem value='elderly'>Elderly</MenuItem>
            </Select>
          </FormControl>
        </Grid>}
        {type === "caretaker" && <Grid item xs={12}>
          <FormControl variant='outlined' style={inputStyle} disabled={!edit}>
            <InputLabel id='availability'>Availability</InputLabel>
            <Select label='Preferred Customer' style={{textAlign: 'left'}} value={newDetails.availability} labelId='availability' name='availability' onChange={handleChange}>
              <MenuItem value='available'>Available</MenuItem>
              <MenuItem value='busy'>Busy</MenuItem>
            </Select>
          </FormControl>
        </Grid>}
        {type === "customer" && <Grid item xs={12}>
          <TextField variant="outlined" style={inputStyle} name="phonePrimary" label="Primary phone" value={newDetails.phonePrimary} InputLabelProps={{shrink: true}} disabled={!edit} onChange={handleChange}></TextField>
        </Grid>}
        {type === "customer" && <Grid item xs={12}>
          <TextField variant="outlined" style={inputStyle} name="phoneEmergency" label="Emergency phone" value={newDetails.phoneEmergency} InputLabelProps={{shrink: true}} disabled={!edit} onChange={handleChange}></TextField>
        </Grid>}
        <Grid item xs={12}>
          <TextField multiline rows={4} style={inputStyle} name="address" variant="outlined" label="Address" value={newDetails.address} InputLabelProps={{shrink: true}} disabled={!edit} onChange={handleChange}></TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField multiline rows={4} style={inputStyle} name="aboutMe" variant="outlined" label="About Me" value={newDetails.aboutMe} InputLabelProps={{shrink: true}} disabled={!edit} onChange={handleChange}></TextField>
        </Grid>
      </Grid>
      <Grid item xs={12} align='center'>
        <Button variant='contained' color='primary' onClick={buttonClick}>{edit ? "Save" : "Edit"}</Button>
      </Grid>
      {edit && <Grid item xs={12} align='center'>
        <Button variant='contained' color='primary' onClick={cancelChanges}>Cancel</Button>
      </Grid>}
    </Grid>
  );
}

export default Profile;