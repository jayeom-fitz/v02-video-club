import React from 'react'
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { FiMenu } from 'react-icons/fi' 

function HeaderLeft() {
  return (
    <Container>
      <FiMenuIcon 
        // onClick={() => {
        //   document.getElementById("vc-sidebar").style.left = "0px";
        // }} 
        size='24' />

      <Link to="/">
        <Logo src="/image/vc_logo.png" />
      </Link>
    </Container>
  )
}

export default HeaderLeft

const Container = styled.div`
  display: flex;
  align-items: center;
`
const FiMenuIcon = styled(FiMenu)`
  cursor: pointer;

  &:hover {
    color: red;
  }
`
const Logo = styled.img`
  height: 50px;
  object-fit: contain;
  padding: 20px;
`