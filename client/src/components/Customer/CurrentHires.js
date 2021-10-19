import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import CurrentHiresCard from './CurrentHiresCard';
import { currentHires as current } from '../../api/customer';
import { markAsComplete as complete } from '../../api/customer';

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
    <Grid container spacing={1} align='center'>
      {currentList.length === 0 && <Grid item xs={12} align='center' style={{marginTop: '10px'}}>No caretakers found</Grid>}
      {currentList.map(currentHire => (
        <Grid key={currentHire.id} item xs={12} md={3}>
          <CurrentHiresCard 
          id={currentHire.id} 
          caretakerName={currentHire.caretakerName} 
          caretakerPhone={currentHire.caretakerPhone} 
          startDate={currentHire.startDate} 
          endDate={currentHire.endDate} 
          markAsComplete={markAsComplete} />
        </Grid>
      ))}
    </Grid>
  );
}

export default CurrentHires;