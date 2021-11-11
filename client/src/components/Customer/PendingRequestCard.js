import React from 'react';
import { Paper, Grid, Button, Typography, Avatar } from '@material-ui/core';

const paperStyle = {
  width: '250px',
  minHeight: '270px',
  margin: '10px',
  padding: '10px',
};

const PendingRequestCard = ( { id, startDate, endDate, caretakerName, additionalDetails, charge, cancelRequest }) => {

  
  return (
    <Paper style={paperStyle}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Avatar />
        </Grid>
        <Grid item xs={8} align='left' style={{paddingTop: '20px'}}>
          {caretakerName}
        </Grid>
        <Grid item xs={12} align='left' style={{marginTop: '30px'}}>
          Charge: {charge} / hr
        </Grid>
        <Grid item xs={12} align='left'>
          Start: {startDate}
        </Grid>
        <Grid item xs={12} align='left'>
          End: {endDate}
        </Grid>
        <Grid item xs={12} align='left'>
          <Typography variant='subtitle2'>{additionalDetails}</Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <Button variant='contained' color='primary' onClick={() => cancelRequest(id)}>Cancel Request</Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default PendingRequestCard;