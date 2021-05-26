import React from 'react'
import { useParams } from "react-router-dom";

import Main from 'components/admin/main/Main';
import Sidebar from 'components/admin/sidebar/Sidebar';

function Admin(props) {
  const { startComponent } = useParams();

  if(props.user == null || props.user.level < 4) {
    alert('잘못된 접근입니다');
    window.history.back();
  }

  const switchComponent = (prop) => {
    switch(prop) {
      default : return <Main user={props.user} />
    }
  }

  return (
    <div>
      <Sidebar user={props.user} />

      <div style={{top:'0',marginLeft:'200px'}}>
        {switchComponent(startComponent)}
      </div>
    </div>
  )
}

export default Admin

// #413630 #FEE100 kakao
