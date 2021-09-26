import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import { useHistory } from 'react-router-dom';

const Caretaker = () => {
  const [currentActivities, setCurrentActivities] = useState(true);
  const [pendingRequests, setPendingRequests] = useState(false);
  const [pastActivities, setPastActivities] = useState(false);
  const [token, setToken] = useState('');
  const [name, setName] = useState('Name');
  const userType = 'caretaker';
  const history = useHistory();

  useEffect(() => {
    const temp = localStorage.getItem('caretakerToken');
    if(!temp) {
      console.log('No token found');
      history.push('/login');
    }
    setToken(temp);
    setName(localStorage.getItem('caretakerName'));
  }, []);

  const signOut = () => {
    localStorage.removeItem('caretakerToken');
    localStorage.removeItem('caretakerName');
  }

  return (
    <>
      <NavBar 
      name={name} 
      signOut={signOut} 
      userType={userType} 
      setCurrentActivities={setCurrentActivities} 
      setPendingRequests={setPendingRequests} 
      setPastActivities={setPastActivities} />
      {/* {`${pendingRequests} ${currentActivities} ${pastActivities}`} */}
    </>
  );
}

export default Caretaker;