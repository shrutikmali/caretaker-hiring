import React, { useState } from 'react';
import { AppBar, Box, Button, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  navbarContainer: {
    height: '50px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0px 20px',
  },
  navLeft: {
    width: '130px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navRight: {
    paddingRight: '10px',
  },
  button: {
    margin: '0px 10px',
    textTransform: 'none',
    color: 'white',
  },
  imageStyle: {
    height: '50px',
    width: '50px',
    borderRadius: '50px',
  },
}));

const NavBar = ({ 
  name,
  signOut,
  setCurrentHires, 
  setPastHires, 
  setPendingRequests, 
  setFindCaretakers,
  setCurrentActivities,
  setPastActivities,
  photo,
  }) => {
  const classes = useStyles();


  const changeList = (str) => {
    setPastHires && setPastHires(false);
    setCurrentHires && setCurrentHires(false);
    setPendingRequests && setPendingRequests(false);
    setFindCaretakers && setFindCaretakers(false);
    setCurrentActivities && setCurrentActivities(false);
    setPastActivities && setPastActivities(false);
    switch(str) {
      case "currentHires":
        setCurrentHires && setCurrentHires(true);
        break;
      case "pastHires":
        setPastHires && setPastHires(true);
        break;
      case "pendingRequests":
        setPendingRequests && setPendingRequests(true);
        break;
      case "findCaretakers":
        setFindCaretakers && setFindCaretakers(true);
        break;
      case "currentActivities":
        setCurrentActivities && setCurrentActivities(true);
        break;
      case "pastActivities":
        setPastActivities && setPastActivities(true);
        break;
      default:
        break;
    }
  }


  return (
    <Box xs={{flexGrow: 1}}>
      <AppBar position='static' className={classes.navbarContainer}>
        <div className={classes.navLeft}>
          <Avatar src={photo} alt="Photo" sx={{ width: 56, height: 56 }}/>
          <p>{name}</p>
        </div>
        <div className={classes.navRight}>
          {setCurrentHires && <Button className={classes.button} onClick={() => changeList("currentHires")}>Current Hires</Button>}
          {setPastHires && <Button className={classes.button} onClick={() => changeList("pastHires")}>Past Hires</Button>}
          {setPendingRequests && <Button className={classes.button} onClick={() => changeList("pendingRequests")}>Pending Requests</Button>}
          {setFindCaretakers && <Button className={classes.button} onClick={() => changeList("findCaretakers")}>Find Caretakers</Button>}
          {setCurrentActivities && <Button className={classes.button} onClick={() => changeList("currentActivities")}>Current Activities</Button>}
          {setPastActivities && <Button className={classes.button} onClick={() => changeList("pastActivities")}>Past Activities</Button>}
          <Button style={{margin: '10px'}} variant='contained' color='secondary' onClick={signOut}>Log Out</Button>
        </div>
      </AppBar>
    </Box>
  )
}

export default NavBar;