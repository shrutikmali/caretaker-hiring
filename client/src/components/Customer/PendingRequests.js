import React, { useState, useEffect } from 'react';
import { pendingRequests } from '../../api/customer';
import PendingRequestCard from './PendingRequestCard';
import { Grid } from '@material-ui/core';
import { cancelRequest as cancel } from '../../api/customer';

const PendingRequests = () => {
  const [pendingRequestList, setPendingRequestList] = useState([]);


  useEffect(() => {
    const customerToken = localStorage.getItem("customerToken");
    const fetchPendingRequests = async (token) => {
      await pendingRequests(token)
      .then(res => {
        setPendingRequestList(res.data);
      })
      .catch(error => {
        console.log(error);
      });
    }
    fetchPendingRequests(customerToken);
  }, []);

  const cancelRequest = async (requestID) => {
    const token = localStorage.getItem('customerToken');
    await cancel(requestID, token)
    .then(res => {
      alert("Request cancelled");
      const newPendingRequestList = pendingRequestList.filter(id => id !== requestID);
      setPendingRequestList(newPendingRequestList);
    })
    .catch(error => {
      console.log(error);
    });
  }

  
  return (
    <Grid container spacing={2} align='center'>
      {pendingRequestList.length === 0 && <Grid item xs={12} align='center' style={{marginTop: '10px'}}>No pending requests</Grid>}
      {pendingRequestList.map(request => (
        <Grid key={request.id} item xs={12} md={3}>
          <PendingRequestCard 
          id={request.id} 
          startDate={request.startDate} 
          endDate={request.endDate} 
          caretakerName={request.caretakerName} 
          additionalDetails={request.additionalDetails} 
          charge={request.charge} 
          cancelRequest={cancelRequest} />
        </Grid>
      ))}
    </Grid>
  );
}

export default PendingRequests;