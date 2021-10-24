import React, { useState, useEffect } from 'react';
import CurrentActivitiesCard from './CurrentActivitiesCard';
import { Grid } from '@material-ui/core';
import { currentActivities as current } from '../../api/caretaker';

const CurrentActivities = () => {
  const [currentList, setCurrentList] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("caretakerToken");
    const fetchCurrentActivities = async (token) => {
      await current(token)
      .then(res => {
        setCurrentList(res.data.activites);
      })
      .catch(error => {
        console.log(error.message);
      });
    }
    fetchCurrentActivities(token);
  }, []);

  return (
    <Grid container spacing={2} align='center' style={{marginTop: '10px'}}>
      {currentList.length === 0 && <Grid item xs={12} style={{marginTop: '10px'}}>No current activities</Grid>}
      {currentList.map(activity => (
        <Grid item key={activity.id} xs={12} md={3}>
          <CurrentActivitiesCard 
          name={activity.customerName} 
          age={activity.age} 
          primaryPhone={activity.primaryPhone} 
          secondaryPhone={activity.secondaryPhone} 
          address={activity.address} 
          photo={activity.photo} 
          startDate={activity.startDate} 
          endDate={activity.endDate} 
          additionalDetails={activity.additionalDetails} />
        </Grid>
      ))}
    </Grid>
  )
}

export default CurrentActivities;