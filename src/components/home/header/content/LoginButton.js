import React from 'react'

import styled from 'styled-components';

function LoginButton() {
  return (
    <Container onClick={() =>  document.getElementById('vc_login_frame').style.display = 'flex'}>
      로그인
    </Container>
  )
}

export default LoginButton

const Container = styled.div`
  padding: 6px 8px;
  color: blueviolet;
  border: 1px solid blueviolet;
  cursor: pointer;
`
