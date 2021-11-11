import React from 'react';
import { Grid, Button, TextField, Dialog, DialogActions, DialogTitle } from '@material-ui/core';

const buttonStyle = {
  width: '75%',
  marginTop: '15px',
};

const RequestDetails = ({ open, setOpen, requestDetails, setRequestDetails, sendRequest }) => {

  const handleClose = () => {
    setOpen(false);
  }

  const handleChange = (e) => {
    setRequestDetails({...requestDetails, [e.target.name]: e.target.value});
  }

  return (
    <Dialog maxWidth='sm' fullWidth open={open} onClose={handleClose}>
      <DialogTitle align='center'>
        Request Details
      </DialogTitle>
      <Grid container>
        <Grid item xs={12} md={6} align='center'>
          Start: <input type='date' style={{width: '150px'}} name='startDate' value={requestDetails.startDate} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6} align='center'>
          End: <input type='date' style={{width: '150px'}} name='endDate' value={requestDetails.endDate} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} align='center'>
          <TextField variant='outlined' multiline rows={4} label='Additional Details' style={{marginTop: '10px'}} name='additionalDetails' value={requestDetails.additionalDetails} onChange={handleChange} />
        </Grid>
      </Grid>
      <DialogActions>
        <Grid container>
          <Grid item xs={12} md={6} align='center'>
            <Button variant='contained' color='primary' style={buttonStyle} onClick={sendRequest}>Send Request</Button>
          </Grid>
          <Grid item xs={12} md={6} align='center'>
            <Button variant='contained' color='secondary' style={buttonStyle} onClick={handleClose}>Cancel</Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}

export default RequestDetails;