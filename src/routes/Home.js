import React from 'react'
import { useParams } from "react-router-dom";

import Header from 'components/home/header/Header'
import Login from 'components/home/login/Login'
import Sidebar from 'components/home/sidebar/Sidebar'

import Board from 'components/home/board/Board';
import Main from 'components/home/main/Main';

function Home(props) {
  const { pageName } = useParams();

  const switchComponent = (prop) => {
    switch(prop) {
      case 'board': return <Board user={props.user} />

      case 'home' : return <Main user={props.user} />
      default : return <Main user={props.user} />
    }
  }

  return (
    <div>
      <Header user={props.user} /> 

      {props.user ? null : <Login />} 

      <div style={{display: 'flex'}}>
        <Sidebar />

        {switchComponent(pageName)}
      </div>
    </div>
  )
}

export default Home

// #f70d1a ferrari red
// #ffa6c9 carnation

// #0f52ba sapphire