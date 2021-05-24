import React from 'react'

import styled from 'styled-components';
import HeaderLeft from './HeaderLeft';

function Header() {
  return (
    <Container>
      <HeaderLeft />
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