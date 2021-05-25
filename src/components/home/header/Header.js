import React from 'react'

import styled from 'styled-components';

import { FiMenu } from 'react-icons/fi' 

import Logo from './content/Logo';

import UserIcon from './content/UserIcon';
import LoginButton from './content/LoginButton';

function Header(props) {
  return (
    <Container>
      <Content>
        <FiMenuIcon 
          // onClick={() => {
          //   document.getElementById("vc-sidebar").style.left = "0px";
          // }} 
          size='24' />
        <Logo />
      </Content>
      
      <Content>
        {props.user ? <UserIcon user={props.user}/> : <LoginButton />}
      </Content>
    </Container>
  )
}

export default Header

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 0 20px;
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: white;
`
const Content = styled.div`
  display: flex;
  align-items: center;
`
const FiMenuIcon = styled(FiMenu)`
  cursor: pointer;

  &:hover {
    color: red;
  }
`