import React from 'react';
import { Grid, Paper, Avatar } from '@material-ui/core';

const paperStyle = {
  width: '250px',
  minHeight: '350px',
}

const CurrentActivitiesCard = ({ name, age, primaryPhone, secondaryPhone, address, photo, startDate, endDate, additionalDetails }) => {
  return (
    <Paper style={paperStyle}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Avatar src={photo} />
        </Grid>
        <Grid item xs={8} align='left' style={{marginTop: '13px', marginLeft: '-10px'}}>
          {name}
        </Grid>
        <Grid item xs={12} align='left' style={{marginLeft: '10px'}}>
          Age: {age}
        </Grid>
        <Grid item xs={12} align='left' style={{marginLeft: '10px'}}>
          Primary Phone: {primaryPhone}
        </Grid>
        <Grid item xs={12} align='left' style={{marginLeft: '10px'}}>
          Emergency phone: {secondaryPhone}
        </Grid>
        <Grid item xs={12} align='left' style={{marginLeft: '10px'}}>
          Address: {address}
        </Grid>
        <Grid item xs={12} align='left' style={{marginLeft: '10px'}}>
          Start date: {startDate}
        </Grid>
        <Grid item xs={12} align='left' style={{marginLeft: '10px'}}>
          End date: {endDate}
        </Grid>
        <Grid item xs={12} align='left' style={{marginLeft: '10px'}}>
          Details:
        </Grid>
        <Grid item xs={12} align='center'>
          {additionalDetails}
        </Grid>
      </Grid>
    </Paper>
  )
}

export default CurrentActivitiesCard;