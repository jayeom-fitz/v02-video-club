import React from 'react'

import { firebaseInstance } from 'fb/f'

import Login from '../components/home/login/Login'

function Home(props) {
  return (
    <div>
      {props.user ? props.user.name : <Login />}
      

      <div style={{display: 'flex'}}>
        Home
        <div>
          {props.user ? 
          <button onClick={() => firebaseInstance.auth().signOut()}>로그아웃</button>
          :
          <button onClick={() => document.getElementById('login_frame').style.display = 'flex'}>로그인</button>
          }
        </div>
      </div>
    </div>
  )
}

export default Home
