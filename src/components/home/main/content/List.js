import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

import styled from 'styled-components'

import { getRecentlyComments, getRecentlyCommentsByKategorie } from 'fb/comment/get';

import Comment from './Comment';

function List(props) {
  const { property1 } = useParams();

  const [loaded, setLoaded] = useState(false);

  async function getComments() {
    var array

    switch(property1) {
      case undefined : array = await getRecentlyComments(); break;

      case 'best' : array = []; break;

      case 'hot' : array = []; break;

      default : array = await getRecentlyCommentsByKategorie(property1); break;
    }

    props.setComments(array);
  }

  async function init() {
    await getComments();
    setLoaded(true);
  }
  
  useEffect(() => {
    init();
  }, [property1])

  return (
    <Container>
      {loaded && props.comments && props.comments.map((comment) => 
        <Comment key={comment.id} 
                comment={comment} setVideo={props.setVideo} 
                user={props.user}
        />)
      }
    </Container>
  )
}

export default List

const Container = styled.div`
  width: 100%;
  padding-top: 20px;
`