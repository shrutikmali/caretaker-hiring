import React from 'react';
import { Paper, Grid, Button } from '@material-ui/core';

const paperStyle = {
  width: '250px',
  minHeight: '270px',
  margin: '10px',
  padding: '10px',
}

const CurrentHiresCard = ({ id, caretakerName, caretakerPhone, startDate, endDate, markAsComplete }) => {
  return (
    <Paper style={paperStyle}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
        <img src='https://cdn-icons-png.flaticon.com/512/1946/1946429.png' height='40px' />
        </Grid>
        <Grid item xs={8} align='left' style={{paddingTop: '20px'}}>
          {caretakerName}
        </Grid>
        <Grid item xs={12} align='left' style={{marginTop: '30px'}}>
          Phone: {caretakerPhone}
        </Grid>
        <Grid item xs={12} align='left'>
          Start: {startDate}
        </Grid>
        <Grid item xs={12} align='left'>
          End: {endDate}
        </Grid>
        <Grid item xs={12} align='center'>
          <Button variant='contained' color='primary' onClick={() => markAsComplete(id)}>Complete</Button>
        </Grid>
      </Grid>
    </Paper>
  );
  
}

export default CurrentHiresCard;