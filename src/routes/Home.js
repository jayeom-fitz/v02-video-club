import React from 'react'

import Header from 'components/home/header/Header'
import Login from 'components/home/login/Login'
import Sidebar from 'components/home/sidebar/Sidebar'

function Home(props) {
  return (
    <div>
      <Header user={props.user} /> 

      {props.user ? null : <Login />} 

      <div style={{display: 'flex'}}>
        <Sidebar />

        Home
      </div>
    </div>
  )
}

export default Home

// #f70d1a