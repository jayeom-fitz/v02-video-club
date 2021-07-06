import React from 'react'
import { useParams } from "react-router-dom";

import Main from 'components/admin/main/Main';
import Sidebar from 'components/admin/sidebar/Sidebar';

import Users from 'components/admin/users/Users';
import User from 'components/admin/users/User';

import Reports from 'components/admin/etc/report/Reports';
import Report from 'components/admin/etc/report/Report';
import Kategories from 'components/admin/etc/kategorie/Kategories';

function Admin(props) {
  const { startComponent } = useParams();

  if(props.user == null || props.user.level < 1) {
    alert('잘못된 접근입니다');
    window.history.back();
  }

  const switchComponent = (prop) => {
    switch(prop) {
      case 'administrators':
      case 'users' :
      case 'ban_users' : return <Users />
      case 'user' : return <User user={props.user} />   
      
      case 'reports' : return <Reports />
      case 'report' : return <Report user={props.user} />

      case 'kategorie' : return <Kategories user={props.user} />

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
