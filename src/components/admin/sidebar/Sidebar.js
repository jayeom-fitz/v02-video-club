import React from 'react'
import { Link } from 'react-router-dom'

import styled from 'styled-components'

import Manager from './content/Manager'
import { SidebarData } from './content/SidebarData'
import SubMenu from './content/SubMenu'

function Sidebar(props) {  
  return (
    <Container>
      <Link to="/" >
        <Logo src="/image/vc_logo2.png" />
      </Link>

      <Manager user={props.user} />

      <SidebarNav >
        <SidebarWrap>
          {SidebarData.map((item, index) => {
            return <SubMenu item={item} key={index} />;
          })}
        </SidebarWrap>
      </SidebarNav>
    </Container>
  )
}

export default Sidebar

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  height: 100%;
  z-index: 1;
  background-color: #413630;
  text-align: center;
  
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`
const Logo = styled.img`
  height: 40px;
  margin-top: 20px;
`
const SidebarNav = styled.nav`
  background: #15171c;
  width: 200px;
  display: flex;
  justify-content: center;
`;
const SidebarWrap = styled.div`
  width: 100%;
`;