import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import CurrentHiresCard from './CurrentHiresCard';
import { currentHires as current } from '../../api/customer';
import { markAsComplete as complete } from '../../api/customer';
import FeedbackDetails from './FeedbackDetails';

const CurrentHires = () => {
  const [currentList, setCurrentList] = useState([]);
  const [showFeedbackDetails, setShowFeedbackDetails] = useState(null);
  const [feedbackDetails, setFeedbackDetails] = useState({
    rating: '',
    feedback: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('customerToken');
    const fetchCurrentHires = async (token) => {
      await current(token)
      .then(res => {
        setCurrentList(res.data);
      })
      .catch(error => {
        console.log(error);
      });
    }
    fetchCurrentHires(token);
  }, []);


  const markAsComplete = async (id) => {
    const token = localStorage.getItem('customerToken');
    await complete(token, id)
    .then(res => {
      const newCurrentList = currentList.filter(current => current !== id);
      setCurrentList(newCurrentList);
    })
    .catch(error => {
      console.log(error);
    })
  }


  return (
    <div>
      <Grid container spacing={1} align='center'>
        {currentList.length === 0 && <Grid item xs={12} align='center' style={{marginTop: '10px'}}>No caretakers found</Grid>}
        {currentList.map(currentHire => (
          <Grid key={currentHire.id} item xs={12} md={3}>
            <CurrentHiresCard 
            id={currentHire.id} 
            caretakerName={currentHire.caretakerName} 
            caretakerPhone={currentHire.caretakerPhone} 
            caretakerPhoto={currentHire.caretakerPhoto} 
            startDate={currentHire.startDate} 
            endDate={currentHire.endDate} 
            markAsComplete={markAsComplete} 
            sendFeedback={setShowFeedbackDetails} />
          </Grid>
        ))}
      </Grid>
      {showFeedbackDetails && 
      <FeedbackDetails 
      open={showFeedbackDetails} 
      setOpen={setShowFeedbackDetails} 
      feedbackDetails={feedbackDetails} 
      setFeedbackDetails={setFeedbackDetails} 
      />}
    </div>
  );
}

export default CurrentHires;