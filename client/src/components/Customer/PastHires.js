import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import PastHiresCard from './PastHiresCard';
import { pastHires as past } from '../../api/customer';

const PastHires = () => {
  const [pastList, setPastList] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("customerToken");
    const fetchPastHires = async (token) => {
      await past(token)
      .then(res => {
        setPastList(res.data);
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      });
    }
    fetchPastHires(token);
  }, []);

  

  return (
    <Grid container spacing={1} align='center'>
      {pastList.length === 0 && <Grid item xs={12} align='center' style={{marginTop: '10px'}}>No past hires</Grid>}
      {pastList.map(past => (
        <Grid key={past.id} item xs={12} md={3}>
          <PastHiresCard 
          id={past.id} 
          caretakerName={past.caretakerName} 
          startDate={past.startDate} 
          endDate={past.endDate} 
          feedback={past.feedback} 
          photo={past.photo} />
        </Grid>
      ))}
    </Grid>
  )
}

export default PastHires;