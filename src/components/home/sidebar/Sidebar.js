import React from 'react'

import styled from 'styled-components';

import { ImCross } from 'react-icons/im'

import { SidebarData } from './content/SidebarData';
import SidebarRow from './content/SidebarRow';

function Sidebar() {
  return (
    <Container id='vc_sidebar'>
      <CloseBar>
        <CloseIcon onClick={() => {
          document.getElementById("vc_sidebar").style.left = "-300px";
        }}/>
      </CloseBar>

      {SidebarData.map((item, index) => {
        return <SidebarRow item={item} key={index} />;
      })}
    </Container>
  )
}

export default Sidebar

const Container = styled.div`
  position: fixed;
  top: 0;
  left: -300px;
  z-index: 200;
  width: 300px;
  height: 100%;
  padding: 20px 20px;
  box-sizing: border-box;
  transition: left 0.3s ease-in-out;
  background-color: #f70d1a;
`
const CloseBar = styled.div`
  text-align: right;
  margin-bottom: 20px;
`
const CloseIcon = styled(ImCross)`
  color: white;
  cursor: pointer;
`
const Line = styled.hr`
  height: 1px;
  border: 0;
  background-color: white;
  margin-top: 10px;
  margin-bottom: 10px;
`
