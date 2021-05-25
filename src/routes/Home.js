import React from 'react'

import Header from 'components/home/header/Header'
import Login from 'components/home/login/Login'

function Home(props) {
  return (
    <div>
      <Header user={props.user} /> 

      {props.user ? null : <Login />} 

      <div style={{display: 'flex'}}>
        Home
      </div>
    </div>
  )
}

export default Home
