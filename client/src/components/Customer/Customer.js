import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import { useHistory } from 'react-router-dom';
import FindCaretakers from './FindCaretakers';
import PendingRequests from './PendingRequests';
import CurrentHires from './CurrentHires';
import PastHires from './PastHires';

const Customer = () => {
  const [currentHires, setCurrentHires] = useState(false);
  const [pastHires, setPastHires] = useState(false);
  const [pendingRequests, setPendingRequests] = useState(false);
  const [findCaretakers, setFindCaretakers] = useState(true);
  const [token, setToken] = useState('');
  const [name, setName] = useState('Name');
  const userType = 'customer';
  const history = useHistory();

  useEffect(() => {
    const temp = localStorage.getItem('customerToken');
    if(!temp) {
      console.log('No token found');
      history.push('/login');
    }
    setToken(temp);
    setName(localStorage.getItem('customerName'));
  }, []);

  const signOut = () => {
    localStorage.removeItem('customerToken');
    localStorage.removeItem('customerName');
    history.push('/login');
  }

  return (
    <>
      <NavBar 
      name={name} 
      signOut={signOut} 
      userType={userType} 
      setCurrentHires={setCurrentHires} 
      setPastHires={setPastHires}
      setPendingRequests={setPendingRequests}
      setFindCaretakers={setFindCaretakers}/>
      {/* {`${currentHires} ${pastHires} ${pendingRequests} ${findCaretakers}`} */}
      {findCaretakers && <FindCaretakers />}
      {pendingRequests && <PendingRequests />}
      {currentHires && <CurrentHires />}
      {pastHires && <PastHires />}
    </>
  );
}

export default Customer;