import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

import styled from 'styled-components'

import Write from './content/Write';

function Main(props) {
  const [comments, setComments] = useState([]);

  return (
    <Container>
      {props.user && 
        <Write user={props.user} 
              comments={comments} setComments={setComments} /> 
      }
    </Container>
  )
}

export default Main

const Container = styled.div`
  width: 100%;
  padding: 20px 50px;
`