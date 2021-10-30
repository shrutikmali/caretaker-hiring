import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import { useHistory } from 'react-router-dom';
import PendingRequests from './PendingRequests';
import CurrentActivities from './CurrentActivites';
import PastActivities from './PastActivities';
import Profile from '../Profile/Profile';

const Caretaker = () => {
  const [currentActivities, setCurrentActivities] = useState(true);
  const [pendingRequests, setPendingRequests] = useState(false);
  const [pastActivities, setPastActivities] = useState(false);
  const [name, setName] = useState('Name');
  const [photo, setPhoto] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const userType = 'caretaker';
  const history = useHistory();

  useEffect(() => {
    const temp = localStorage.getItem('caretakerToken');
    if(!temp) {
      console.log('No token found');
      history.push('/login');
    }
    setName(localStorage.getItem('caretakerName'));
    setPhoto(localStorage.getItem("caretakerPhoto"));
  }, [history]);

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
      currentActivities={currentActivities} 
      pendingRequests={pendingRequests} 
      pastActivities={pastActivities} 
      setCurrentActivities={setCurrentActivities} 
      setPendingRequests={setPendingRequests} 
      setPastActivities={setPastActivities} 
      setShowProfile={setShowProfile} 
      photo={photo} />
      {/* {`${pendingRequests} ${currentActivities} ${pastActivities}`} */}
      {pendingRequests && <PendingRequests />}
      {currentActivities && <CurrentActivities />}
      {pastActivities && <PastActivities />}
      {showProfile && <Profile type="caretaker" />}
    </>
  );
}

export default Caretaker;