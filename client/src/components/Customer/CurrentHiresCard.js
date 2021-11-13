import React, { useState } from 'react';
import { Paper, Grid, Button, Avatar } from '@material-ui/core';
import FeedbackDetails from './FeedbackDetails';
import { markAsComplete as complete } from '../../api/customer';
import { sendFeedback as feedback } from '../../api/customer';

const paperStyle = {
  width: '250px',
  minHeight: '270px',
  margin: '10px',
  padding: '10px',
}

const CurrentHiresCard = ({ id, caretakerName, caretakerPhone, startDate, endDate, currentList, setCurrentList, caretakerPhoto }) => {

  const [showFeedbackDetails, setShowFeedbackDetails] = useState(false);
  const [feedbackDetails, setFeedbackDetails] = useState({
    rating: '',
    feedback: '',
  });

  const markAsComplete = async () => {
    const token = localStorage.getItem('customerToken');
    await complete(token, id)
    .then(res => {
      alert("Marked as complete");
      const newCurrentList = currentList.filter(current => current !== id);
      setCurrentList(newCurrentList);
      setShowFeedbackDetails(false);
    })
    .catch(error => {
      console.log(error);
    })
  }

  const sendFeedback = async () => {
    const token = localStorage.getItem('customerToken');
    await feedback(token, id, feedbackDetails)
    .then(async (res) => {
      await markAsComplete();
    })
    .catch(err => {
      console.log(err.message);
    });
  }
  
  return (
    <div>
      <Paper style={paperStyle}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Avatar src={caretakerPhoto} />
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
            <Button variant='contained' color='primary' onClick={() => setShowFeedbackDetails(true)}>Complete</Button>
          </Grid>
        </Grid>
      </Paper>
      <FeedbackDetails 
      open={showFeedbackDetails} 
      setOpen={setShowFeedbackDetails} 
      feedbackDetails={feedbackDetails} 
      setFeedbackDetails={setFeedbackDetails} 
      sendLater={true} 
      markAsComplete={markAsComplete} 
      sendFeedback={sendFeedback} />
    </div>
  );
  
}

export default CurrentHiresCard;