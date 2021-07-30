import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

import styled from 'styled-components'

import { getRecentlyComments, getRecentlyCommentsByKategorie } from 'fb/comment/get';
import { deleteComment } from 'fb/comment/set';

import Comment from './comment/Comment';

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

  async function onDeleteComment(id) {   
    var array = [];

    for(var i=0; i<props.comments.length; i++) {
      if(id !== props.comments[i].id) {
        array.push(props.comments[i]);
      } 
    }

    await deleteComment(id);
    alert('삭제되었습니다.');
    props.setComments(array); 
  }

  return (
    <Container>
      {loaded && props.comments && props.comments.map((comment) => 
        <Comment key={comment.id} 
                comment={comment} onDeleteComment={onDeleteComment} setVideo={props.setVideo} 
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