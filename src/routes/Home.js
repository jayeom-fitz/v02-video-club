import React from 'react'

import Header from 'components/home/header/Header'

function Home(props) {
  return (
    <div>
      <Header user={props.user} />  

      <div style={{display: 'flex'}}>
        Home
      </div>
    </div>
  )
}

export default Home
