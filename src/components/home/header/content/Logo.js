import React from 'react'
import { Link } from 'react-router-dom';

import styled from 'styled-components';

function Logo() {
  return (
    <Link to="/">
      <Image src="/image/vc_logo.png" />
    </Link>
  )
}

export default Logo

const Image = styled.img`
  height: 60px;
  object-fit: contain;
  padding: 10px 20px;
`