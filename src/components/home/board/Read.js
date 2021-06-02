import React, { useState, useEffect } from 'react'
import { useParams, Link, useHistory } from "react-router-dom";

import styled, { css } from 'styled-components'

import { getPostingById } from 'fb/board/get';
import { deleteBoardPosting } from 'fb/board/set';

import { lineFeedDecoding } from 'components/effect/function/func_str'
import { dateToString } from 'components/effect/function/func_time';

import Loading from 'components/effect/Loading';
import User from 'components/effect/User';

function Read(props) {
  const { property1, property2 } = useParams();
  const history = useHistory();

  const [loaded, setLoaded] = useState(false);
  const [board, setBoard] = useState(null);

  async function getBoardData() {
    var data = await getPostingById(property2);
    
    if(data.pid === null || data.pid === undefined) {
      alert('잘못된 경로입니다.')
      history.push({ pathname: `/board/${property1}` });
      return;
    }

    data.content = lineFeedDecoding(data.content);
    setBoard(data);
  }  

  async function init() {
    await getBoardData();
    setLoaded(true);
  }

  useEffect(() => {
    init();
  }, [property2])

  async function deletePosting() {
    await deleteBoardPosting(property2);
    alert('게시글이 삭제되었습니다.')
    history.push({ pathname: `/board/${property1}` });
  }

  return (
    <Container>
      {loaded ? board.active ? <>
        <BoxContainer>
          <Box>
            <Text>작성자</Text>
            <Content>
              <User 
                pimage={board.pimage} 
                pname={board.pname} 
                plevel={board.plevel}/>
            </Content>
          </Box>

          <Box>
            <Text>작성일</Text>
            <Content>
              {dateToString(board.registDate)}
            </Content>
          </Box>

          <Box>
            <Text>제목</Text>
            <Title>
              <span>{board.title}</span>
            </Title>
          </Box>

          <Box>
            <Text>내용</Text>
            <Pre>{board.content}</Pre>
          </Box>

          {props.user && (props.user.uid === board.pid || props.user.level >= 1) &&
            <div style={{width:'100%', textAlign:'center', padding:'20px'}}> 
              <Button 
                color='#0f52ba'
                onClick={() => history.push({
                  pathname: `/board/${property1}/edit`,
                  state: {id : property2},
                })}
              >수정</Button>

              <Button 
                color='#f70d1a'
                onClick={() => deletePosting()}
              >삭제</Button>
            </div>
          }
        </BoxContainer>
      </> : '삭제된 글입니다' : <Loading size='72' />}
    </Container>
  )
}

export default Read

const Container = styled.div`
  width: 100%;
  padding: 20px 50px;
  background-color: #ffa6c9;
`
const BoxContainer = styled.div`
  align-items: center;
  width: 80%;
  margin: 20px auto;
  background-color: white;
  border-radius: 10px;
  box-shadow: 3px 3px 5px grey;
`
const Box = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 10px 0;
`
const Text = styled.h4`
  flex: 0.2;
  text-align: center;
  margin: 15px 0;
`
const Content = styled.div`
  flex: 0.8;
  padding: 10px;
  margin: 0 20px;
`
const Title = styled.div`
  flex: 0.8;
  padding: 10px;
  margin: 0 20px;
  border-bottom: 1px solid lightgrey;
`
const Pre = styled.pre`
  flex: 0.8;
  padding: 10px;
  margin: 0 20px;
  border: 1px solid lightgrey;
`
const Button = styled.button`
  width: 80px;
  height: 60px;
  margin: 0 10px;
  font-size: 1rem;
  background-color: ${(props) => `${props.color}` || 'black'};
  border: 1px solid ${(props) => `${props.color}` || 'black'};
  transition: 0.3s;
  color: white;

  &:hover {
    color: ${(props) => `${props.color}` || 'black'};
    background-color: white;
  }
`