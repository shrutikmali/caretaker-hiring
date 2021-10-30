import React, { useState, useEffect } from 'react';
import { findCaretakers } from '../../api/customer';
import SendRequest from './SendRequest';
import { Grid } from '@material-ui/core';

const FindCaretakers = () => {
  const [caretakerList, setCaretakerList] = useState([]);


  useEffect(() => {
    const fetchCaretakers = async () => {
      await findCaretakers()
      .then(result => {
        setCaretakerList(result.data);
      })
      .catch(error => {
        console.log(error.response);
      });
    }
    fetchCaretakers();
  }, [])
  
  return (
    <Grid container spacing={1} align='center'>
      {caretakerList.length === 0 && <Grid item xs={12} align='center' style={{marginTop: '10px'}}>No caretakers found</Grid>}
      {caretakerList.map(caretaker => (
        <Grid key={caretaker.id} item xs={12} md={3}>
          <SendRequest 
          id={caretaker.id}
          name={caretaker.name} 
          aboutMe={caretaker.aboutMe} 
          availability={caretaker.availability} 
          preferredCustomer={caretaker.preferredCustomer} 
          rating={caretaker.rating} 
          charge={caretaker.charge}
          photo={caretaker.photo} />
        </Grid>
      ))}
    </Grid>
  );
}

export default FindCaretakers;