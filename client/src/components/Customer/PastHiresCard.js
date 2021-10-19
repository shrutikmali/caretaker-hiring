import React from 'react';
import { Grid, Paper, Button } from '@material-ui/core';

const paperStyle = {
  width: '250px',
  minHeight: '270px',
  margin: '10px',
  padding: '10px',
};

const PastHiresCard = () => {
  return (
    <Paper style={paperStyle}>
      <Grid container spacing={2}>
        <Grid item xs={4} align='left'>
        <img src='https://cdn-icons-png.flaticon.com/512/1946/1946429.png' height='40px' />
        </Grid>
        <Grid item xs={8} align='left' style={{marginTop: '12px'}}>
          Name
        </Grid>
        <Grid item xs={12} align='left' style={{marginTop: '30px'}}>
          Start: 
        </Grid>
        <Grid item xs={12} align='left'>
          End: 
        </Grid>
        <Grid item xs={12} align='center' style={{marginTop: '30px'}}>
          <Button variant='contained' color='primary'>Send Feedback</Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default PastHiresCard;