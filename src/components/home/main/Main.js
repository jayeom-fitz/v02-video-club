import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

import styled from 'styled-components'

import Kategories from './content/Kategories';
import Write from './content/Write';
import List from './content/List';

function Main(props) {
  const { pageName } = useParams();

  const [comments, setComments] = useState([]);

  const switchComponent = (prop) => {
    switch(prop) {
      case undefined : 
      case 'recommended' : return false;

      default : return true;
    }
  }

  return (
    <Container>
      <Kategories />

      {props.user && switchComponent(pageName) &&
        <Write user={props.user} 
              comments={comments} setComments={setComments} /> 
      }

      <List comments={comments} setComments={setComments} />
    </Container>
  )
}

export default Main

const Container = styled.div`
  width: 100%;
  padding: 20px 50px;
  background-color: #ddd;
`