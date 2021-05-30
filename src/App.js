import React, { useState, useEffect } from 'react';

import AppRouter from './Router'

import firebase from 'firebase'
import { authService, storeService } from 'fb/f'

import { setUserRelease } from 'fb/users/set'

import { dateToString } from 'components/effect/function/func_time';

function App() {
  const [loaded, setLoaded] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    async function getUserInfo(user) {
      var obj;
      await storeService.collection('users').doc(user.uid).get().then(function(doc) {
        obj = { uid: user.uid, ...doc.data() }
        setUserObj(obj);
      });
      return obj;
    }

    firebase.auth().onAuthStateChanged(async function(user) {
      if(user) {
        const u = await getUserInfo(user);
        const now = Date.now();

        if(u.releaseDate !== 0) {
          if(u.releaseDate > now) {
            authService.signOut();
            alert(dateToString(u.releaseDate) + ' 까지 정지된 계정입니다.')
            window.location.reload();
          } else {
            alert('정지가 해제되었습니다.')
            setUserRelease(u.uid);
          }
        }
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
