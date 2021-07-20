import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

import styled from 'styled-components'

import Kategories from './content/Kategories';
import Write from './content/Write';
import List from './content/List';
import More from './content/More';
import Video from './content/Video';

function Main(props) {
  const { property1 } = useParams();

  const [video, setVideo] = useState({});
  const [comments, setComments] = useState([]);

  const switchComponent = () => {
    switch(property1) {
      case undefined : 
      case 'best' : 
      case 'hot' : return false;

      default : return true;
    }
  }

  return (
    <Container>
      <Video video={video} />

      <Kategories />

      {props.user && switchComponent() &&
        <Write user={props.user} 
              comments={comments} setComments={setComments} /> 
      }

      <List comments={comments} setComments={setComments} 
            setVideo={setVideo}
            user={props.user} />

      <More comments={comments} setComments={setComments} />
    </Container>
  )
}

export default Main

const Container = styled.div`
  width: 100%;
  padding: 20px 50px;
  background-color: #eee;
`