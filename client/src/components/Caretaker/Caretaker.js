import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import { useHistory } from 'react-router-dom';
import PendingRequests from './PendingRequests';
import CurrentActivities from './CurrentActivites';
import PastActivities from './PastActivities';

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
    history.push('/login');
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
      {pendingRequests && <PendingRequests />}
      {currentActivities && <CurrentActivities />}
      {pastActivities && <PastActivities />}
    </>
  );
}

export default Caretaker;