import React, { useState } from 'react';
import { Grid, Paper, Button, Typography, Avatar } from '@material-ui/core';
import FeedbackDetails from './FeedbackDetails';
import { sendFeedback as feedbackAPI } from '../../api/customer';

const paperStyle = {
  width: '250px',
  minHeight: '250px',
  margin: '10px',
  padding: '10px',
};

const PastHiresCard = ({ id, caretakerName, startDate, endDate, feedback, photo }) => {
  const [showFeedbackDetails, setShowFeedbackDetails] = useState(false);
  const [feedbackDetails, setFeedbackDetails] = useState({
    rating: '',
    feedback: '',
  });

  const sendFeedback = async () => {
    setShowFeedbackDetails(true);
    const token = localStorage.getItem("customerToken");
    await feedbackAPI(token, id, feedbackDetails)
    .then(res => {
      console.log(res);
      setFeedbackDetails({
        rating: '',
        feedback: '',
      });
      alert("Feedback sent");
      setShowFeedbackDetails(false);
    })
    .catch(error => {
      console.log(error);
    })
  }
  
  return (
    <div>
      <Paper style={paperStyle}>
        <Grid container spacing={2}>
          <Grid item xs={4} align='left'>
            <Avatar src={photo}/>
          </Grid>
          <Grid item xs={8} align='left' style={{marginTop: '12px'}}>
            {caretakerName}
          </Grid>
          <Grid item xs={12} align='left' style={{marginTop: '30px'}}>
            Start: {startDate}
          </Grid>
          <Grid item xs={12} align='left'>
            End: {endDate}
          </Grid>
          <Grid item xs={12} align='center' style={{marginTop: '30px'}}>
            {!feedback && <Button variant='contained' color='primary' onClick={() => setShowFeedbackDetails(true)}>Send Feedback</Button>}
            {feedback && <Typography style={{marginTop: '10px'}} variant='subtitle1'>Feedback sent</Typography>}
          </Grid>
        </Grid>
      </Paper>
      <FeedbackDetails 
      open={showFeedbackDetails} 
      setOpen={setShowFeedbackDetails} 
      feedbackDetails={feedbackDetails} 
      setFeedbackDetails={setFeedbackDetails} 
      sendFeedback={sendFeedback} />
    </div>
  );
}

export default PastHiresCard;