import React from 'react'

import Login from '../components/home/login/Login'

function Home(props) {
  return (
    <div>
      <Login />

      <div style={{display: 'flex'}}>
        Home
        <div>
          <button onClick={() => document.getElementById('login_frame').style.display = 'flex'}>로그인</button>
        </div>
      </div>
    </div>
  )
}

export default Home
