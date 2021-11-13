import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import CurrentHiresCard from './CurrentHiresCard';
import { currentHires as current } from '../../api/customer';


const CurrentHires = () => {
  const [currentList, setCurrentList] = useState([]);
  
 


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
            currentList={currentList} 
            setCurrentList={setCurrentList} />
          </Grid>
        ))}
      </Grid>
      {/* {showFeedbackDetails && 
      <FeedbackDetails 
      open={showFeedbackDetails} 
      setOpen={setShowFeedbackDetails} 
      feedbackDetails={feedbackDetails} 
      setFeedbackDetails={setFeedbackDetails} 
      />} */}
    </div>
  );
}

export default CurrentHires;