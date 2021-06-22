import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

import styled from 'styled-components'

import Write from './content/Write';

function Main(props) {
  return (
    <Container>
      {props.user && <Write user={props.user} /> }
    </Container>
  )
}

export default Main

const Container = styled.div`
  width: 100%;
  padding: 20px 50px;
`