import React from 'react';
import { Grid, Button, TextField, Dialog, DialogActions, DialogTitle, Select, MenuItem } from '@material-ui/core';

const buttonStyle = {
  width: '75%',
  marginTop: '15px',
};

const FeedbackDetails = ({ open, setOpen, feedbackDetails, setFeedbackDetails, markAsComplete, sendFeedback, sendLater }) => {

  const handleClose = () => {
    setFeedbackDetails({
      rating: '',
      feedback: '',
    });
    setOpen(false);
  }
  
  const handleChange = (e) => {
    setFeedbackDetails({...feedbackDetails, [e.target.name]: e.target.value});
  }

  return (
    <Dialog maxWidth='sm' fullWidth open={open} onClose={handleClose}>
      <DialogTitle align='center'>
        Feedback
      </DialogTitle>
      <Grid container>
        <Grid item xs={6} align='center'>
          Rating: <Select name='rating' value={feedbackDetails.rating} onChange={handleChange}>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} align='center'>
          <TextField variant='outlined' multiline rows={4} label='Feedback' style={{marginTop: '20px', width: '270px'}} name='feedback' value={feedbackDetails.feedback} onChange={handleChange}/>
        </Grid>
      </Grid>
      <DialogActions>
        <Grid container>
          <Grid item xs={12} md={6} align='center'>
            <Button variant='contained' color='primary' style={buttonStyle} onClick={sendFeedback}>Submit</Button>
          </Grid>
          {sendLater && <Grid item xs={12} md={6} align='center'>
            <Button variant='contained' color='primary' style={buttonStyle} onClick={markAsComplete}>Send Later</Button>
          </Grid>}
          <Grid item xs={12} md={sendLater ? 12 : 6} align='center'>
            <Button variant='contained' color='secondary' style={buttonStyle} onClick={handleClose}>Cancel</Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}

export default FeedbackDetails;