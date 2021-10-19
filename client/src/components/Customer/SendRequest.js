import React, { useState } from 'react';
import { Paper, Grid, Button, Typography } from '@material-ui/core';
import RequestDetails from './RequestDetails';
import { sendRequest as sendRequestAPI } from '../../api/customer';

const paperStyle = {
  width: '250px',
  minHeight: '270px',
  margin: '10px',
  padding: '10px',
};

const SendRequest = ({ name, aboutMe, id, preferredCustomer }) => {
  const [showRequestDetails, setShowRequestDetails] = useState(false);
  const [requestDetails, setRequestDetails] = useState({
    caretakerID: id,
    startDate: '',
    endDate: '',
    additionalDetails: '',
  });

  const sendRequest = async () => {
    const token = localStorage.getItem('customerToken');
    await sendRequestAPI(token, requestDetails)
    .then(res => {
      if(res.status === 200) {
        alert("Request Sent");
        setRequestDetails({
          caretakerID: id,
          startDate: '',
          endDate: '',
          additionalDetails: '',
        });
        setShowRequestDetails(false);
      }
    })
    .catch(error => {
      console.log(error);
    });
  }

  return (
    <div>
      <Paper style={paperStyle}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <img src='https://cdn-icons-png.flaticon.com/512/1946/1946429.png' height='40px' />
          </Grid>
          <Grid item xs={8} align='left' style={{paddingTop: '20px'}}>
            {name}
          </Grid>
          <Grid item xs={12} align='left' style={{marginTop: '30px'}}>
            Rate: 
          </Grid>
          <Grid item xs={12} align='left'>
            Rating:  
          </Grid>
          <Grid item xs={12} align='left'>
            Preferred Customer: {preferredCustomer}
          </Grid>
          <Grid item xs={12} align='left'>
            <Typography variant='caption'>{aboutMe}</Typography>
          </Grid>
          <Grid item xs={12} align='center'>
            <Button variant='contained' color='primary' style={{marginTop: '10px'}} onClick={() => setShowRequestDetails(true)}>Send Request</Button>
          </Grid>
        </Grid>
      </Paper>
      <RequestDetails 
      open={showRequestDetails} 
      setOpen={setShowRequestDetails} 
      requestDetails={requestDetails}
      sendRequest={sendRequest} 
      setRequestDetails={setRequestDetails} />
    </div>
  );
}

export default SendRequest;