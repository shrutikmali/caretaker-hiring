import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import { useHistory } from 'react-router-dom';

const Customer = () => {
  const [currentHires, setCurrentHires] = useState(true);
  const [pastHires, setPastHires] = useState(false);
  const [pendingRequests, setPendingRequests] = useState(false);
  const [findCaretakers, setFindCaretakers] = useState(false);
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
    </>
  );
}

export default Customer;