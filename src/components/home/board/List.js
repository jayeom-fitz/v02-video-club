import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom";

import styled, { css } from 'styled-components'

import Avatar from "@material-ui/core/Avatar";
import Loading from 'components/effect/Loading';

import { dateToString2 } from 'components/effect/function/func_time';
import { getPostingsByBoardName } from 'fb/board/get';
import BoardRow from './content/BoardRow';

function List(props) {
  const { property1, property2 } = useParams();

  console.log(property1, property2)

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
        <div style={{display:'flex', width:'100%', justifyContent:'space-between'}}>
          <Title>{title}</Title>

          {props.user && ((props.user.level >= postingLevel)) && 
            <div>
              <Link to={`/board/${property1}/write`}>
                <Button>글쓰기</Button>
              </Link>
            </div>
          }
        </div>

        <div>
          <div style={{paddingTop:'20px'}}>
            <Line>
              <Column flex='0.4'>제목</Column>
              <Column flex='0.2'>작성자</Column>
              <Column flex='0.2'>작성일</Column>
              <Column flex='0.1'>조회수</Column>
              <Column flex='0.1'>추천수</Column>
            </Line>

            {postings.length === 0 ? <Line>게시글이 없습니다.</Line> : 
              postings.map((posting) =>
                <BoardRow key={posting.id} posting={posting} />
            )}
          </div>

          {props.user && ((props.user.level >= postingLevel)) && 
            <div style={{paddingTop:'20px', textAlign:'right'}}>
              <Link to={`/board/${property1}/write`} >
                <Button>글쓰기</Button>
              </Link>
            </div>
          }
        </div>
      </> : <Loading size='72'/>}
    </Container>
  )
}

export default List

const Container = styled.div`
  width: 100%;
  padding: 20px 50px;
`
const Title = styled.h1`
  margin: 0;
`
const Line = styled.div`
  width: 100%;
  display: flex;
  padding: 10px;
  transition-duration: 0.2s;
  border-bottom: 1px solid lightgrey;
  align-items: center;
  color: white;
  background-color: #f70d1a;
`
const Column = styled.div`
  flex: ${(props) => props.flex || '0.1'};
  text-align: center;
`
const Button = styled.button`
  padding: 10px 20px;
  margin-left: 10px;
  color: #f70d1a;
  border: 1px solid #f70d1a;
  background-color: white;

  &:hover {
    color: white;
    background-color: #f70d1a;
  }
`