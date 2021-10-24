import React, { useState, useEffect } from 'react';
import PastActivitiesCard from './PastActivitiesCard';
import { pastActivities as past } from '../../api/caretaker';
import { Grid } from '@material-ui/core';

const PastActivities = () => {
  const [pastList, setPastList] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("caretakerToken");
    const fetchPastActivities = async (token) => {
      await past(token)
      .then(res => {
        setPastList(res.data.pastList);
      })
      .catch(error => {
        console.log(error);
      });
    }
    fetchPastActivities(token);
  }, []);

  return (
    <Grid container spacing={2} style={{marginTop: '10px'}} align='center'>
      {pastList.length === 0 && <Grid item xs={12}>No past activities</Grid>}
      {pastList.map(pastAct => (
        <Grid item xs={12} md={3} key={pastAct.id}>
          <PastActivitiesCard 
          name={pastAct.customerName} 
          startDate={pastAct.startDate} 
          endDate={pastAct.endDate} 
          rating={pastAct.rating} 
          feedback={pastAct.feedback} 
          photo={pastAct.photo} />
        </Grid>
      ))}
    </Grid>
  )
}

export default PastActivities;