import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

import styled from 'styled-components'

import { getRecentlyComments } from 'fb/comment/get';

import Comment from './Comment';

function List(props) {
  const [loaded, setLoaded] = useState(false);

  async function getComments() {
    var data = await getRecentlyComments();
    props.setComments(data);
  }

  async function init() {
    await getComments();
    setLoaded(true);
  }
  
  useEffect(() => {
    init();
  }, [])

  return (
    <Container>
      {loaded && props.comments && props.comments.map((comment) => 
        <Comment key={comment.id} comment={comment}/>)
      }
    </Container>
  )
}

export default List

const Container = styled.div`
  width: 100%;
  padding-top: 20px;
`