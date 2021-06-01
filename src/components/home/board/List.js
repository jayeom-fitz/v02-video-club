import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

import styled from 'styled-components'

import Loading from 'components/effect/Loading';

import { getPostingsByBoardName } from 'fb/board/get';

import BoardList from './content/BoardList';

function List(props) {
  const { property1 } = useParams();

  const [loaded, setLoaded] = useState(false);
  const [title, setTitle] = useState('');
  const [postings, setPostings] = useState([]);
  const [postingLevel, setPostingLevel] = useState(0);
  
  function setTitleByPageName() {
    switch(property1) {
      case 'notice' : setPostingLevel(1); setTitle('공지사항'); return;
      default : return;
    }
  }

  async function getPostingsByPageName() {
    var array = await getPostingsByBoardName(property1);

    setPostings(array);
  }

  async function init() {
    setTitleByPageName();
    await getPostingsByPageName();
    setLoaded(true);
  }

  useEffect(() => {
    init();
  }, [property1])

  return (
    <Container>
      {loaded ? <>
        <BoardList 
          user={props.user}
          title={title}
          postings={postings}
          postingLevel={postingLevel}
        />
      </> : <Loading size='72'/>}
    </Container>
  )
}

export default List

const Container = styled.div`
  width: 100%;
  padding: 20px 50px;
`
