import React, { useState, useEffect } from 'react';

import AppRouter from './Router'

import firebase from 'firebase'
import { storeService } from 'fb/f'

function App() {
  const [loaded, setLoaded] = useState(false);
  const [userObj, setUserObj] = useState(firebase.auth().currentUser);

  useEffect(() => {
    async function getUserInfo(user) {
      await storeService.collection('users').doc(user.uid).get().then(function(doc) {
        setUserObj({
          ...doc.data(),
          uid: user.uid
        });
      });
    }

    firebase.auth().onAuthStateChanged(function(user) {
      if(user) {
        getUserInfo(user);
      } 
      setLoaded(true);
    });
  }, []);
  
  return (
    <>
      {loaded ? <AppRouter user={userObj}/> : null}
    </>
  );
}

export default App;
