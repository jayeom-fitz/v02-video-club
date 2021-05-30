import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom";

import styled, { css } from 'styled-components'

import Avatar from "@material-ui/core/Avatar";
import Loading from 'components/effect/Loading';

import { dateToString2 } from 'components/effect/func';

function Board(props) {
  const { pageName } = useParams();

  const [loaded, setLoaded] = useState(false);
  const [title, setTitle] = useState('');
  const [postings, setPostings] = useState([]);
  const [postingLevel, setPostingLevel] = useState(0);
  
  function setTitleByPageName() {
    switch(pageName) {
      case 'notice' : setPostingLevel(1); setTitle('공지사항'); return;
      default : return;
    }
  }

  async function getPostingsByPageName() {
    
  }

  async function init() {
    setTitleByPageName();
    await getPostingsByPageName();
    setLoaded(true);
  }

  useEffect(() => {
    init();
  }, [pageName])

  return (
    <Container>
      {loaded ? <>
        <div style={{display:'flex', width:'100%', justifyContent:'space-between'}}>
          <Title>{title}</Title>

          {props.user && ((props.user.level >= postingLevel)) && 
            <div>
              <Link to={`/write/${pageName}`}>
                <Button>글쓰기</Button>
              </Link>
            </div>
          }
        </div>

        <div>
          <div style={{paddingTop:'20px'}}>
            <Line top='true'>
              <Column flex='0.4'>제목</Column>
              <Column flex='0.3'>작성자</Column>
              <Column flex='0.2'>작성일</Column>
              <Column flex='0.1'>조회수</Column>
            </Line>

            {postings.length === 0 ? <Line>게시글이 없습니다.</Line> : <></>}
          </div>
            {/* 
              
              {users.length !== 0 ? users.map((user) => 
                <StyledLink key={user.id} to={`/admin/user/${user.id}`}>
                  <Line>
                    <Column flex='0.1'>
                      <StyledAvatar src={user.image}/>
                    </Column>
                    <Column flex='0.3'>{user.id}</Column>
                    <Column flex='0.2'>{user.name}</Column>
                    <Column flex='0.2'>{dateToString(user.lastLoginDate)}</Column>
                    <Column flex='0.2'>{dateToString(user.joinDate)}</Column>
                  </Line>
                </StyledLink>
              ) : <Line>{title}이(가) 없습니다</Line>}

            </div> */}

            {props.user && ((props.user.level >= postingLevel)) && 
              <div style={{paddingTop:'20px', textAlign:'right'}}>
                <Link to={`/write/${pageName}`} >
                  <Button>글쓰기</Button>
                </Link>
              </div>
            }
          </div>
      </> : <Loading size='72'/>}
    </Container>
  )
}

export default Board

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
  
  ${(props) => {
    if(props.top) {
      return css`
        color: white;
        background-color: #f70d1a;
      `;
    } else {
      return css`
        &:hover {
          background-color: lightgrey;
        }
      `;
    }
  }}
`
const Column = styled.div`
  flex: ${(props) => props.flex || '0.1'};
  text-align: center;
`
const StyledAvatar = styled(Avatar)`
  width: 50px !important;
  height: 50px !important;
  margin: auto;
  border: 1px solid lightgrey;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
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