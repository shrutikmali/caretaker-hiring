import React, { useState, useEffect } from 'react';
import PendingRequestCard from './PendingRequestCard';
import { Grid } from '@material-ui/core';
import { getPendingRequests, acceptRequest as accept, declineRequest as decline } from '../../api/caretaker';

const PendingRequests = () => {
  const [pendingList, setPendingList] = useState([]);
  
  useEffect(() => {
    const token = localStorage.getItem('caretakerToken');
    const fetchPendingRequests = async (token) => {
      await getPendingRequests(token)
      .then(res => {
        setPendingList(res.data);
      })
      .catch(error => {
        console.log(error);
      });
    }
    fetchPendingRequests(token);
  }, []);

  const acceptRequest = async (requestID) => {
    const token = localStorage.getItem('caretakerToken');
    await accept(token, requestID)
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.log(error);
    });
  }
  
  const declineRequest = async (requestID) => {
    const token = localStorage.getItem('caretakerToken');
    await decline(token, requestID)
    .then(res => {
      const newPendingList = pendingList.filter(id => id !== requestID);
      setPendingList(newPendingList);
    })
    .catch(error => {
      console.log(error);
    });
  }

  return (
    <Grid container spacing={2} style={{marginTop: '10px'}} align='center'>
      {pendingList.length === 0 && <Grid item xs={12}>No pending requests</Grid>}
      {pendingList.map(request => (
        <Grid key={request.id} item xs={12} md={3}>
          <PendingRequestCard 
          customerAge={request.customerAge} 
          customerName={request.customerName} 
          id={request.id}
          startDate={request.startDate} 
          endDate={request.endDate} 
          additionalDetails={request.additionalDetails} 
          photo={request.photo} 
          acceptRequest={acceptRequest} 
          declineRequest={declineRequest} />
        </Grid>
      ))}
    </Grid>
  );
}

export default PendingRequests;