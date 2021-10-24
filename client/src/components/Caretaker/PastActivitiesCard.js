import React from 'react';
import { Paper, Grid, Avatar } from '@material-ui/core';

const paperStyles = {
  width: '250px',
  minHeight: '280px',
  padding: '10px',
};

const PastActivitiesCard = ({ name, startDate, endDate, rating, feedback, photo }) => {
  return (
    <Paper style={paperStyles}>
      <Grid container spacing={2} align='left'>
        <Grid item xs={4} align='left'>
          <Avatar alt="photo" src={photo} />
        </Grid>
        <Grid item xs={8}>
          {name}
        </Grid>
        <Grid item xs={12} style={{marginTop: '10px'}}>
          Start date: {startDate}
        </Grid>
        <Grid item xs={12}>
          End date: {endDate}
        </Grid>
        <Grid item xs={12}>
          Rating: {rating}
        </Grid>
        <Grid item xs={12} align='left'>
          Feedback:
        </Grid>
        <Grid item xs={12} align='center'>
          {feedback ? <p>{feedback}</p> : <p style={{color: 'grey', marginTop: '10px'}}>No feedback</p>}
        </Grid>
      </Grid>
    </Paper>
  )
}

export default PastActivitiesCard;