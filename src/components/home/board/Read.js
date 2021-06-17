import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from "react-router-dom";

import styled from 'styled-components'

import { getPostingById, getPostingsByBoardName2 } from 'fb/board/get';
import { deleteBoardPosting, updateBoardPosting } from 'fb/board/set';
import { getReplysByPostId } from 'fb/reply/get';


import { lineFeedDecoding } from 'components/effect/function/func_str'
import { dateToString } from 'components/effect/function/func_time';
import { setPostingLevelByPageName, setTitleByPageName } from 'components/effect/function/func_board';

import Loading from 'components/effect/Loading';
import User from 'components/effect/User';
import ReportButton from 'components/effect/ReportButton';

import UpButton from './content/UpButton';
import ReplyList from './content/ReplyList';
import BoardList from './content/BoardList';

function Read(props) {
  const { property1, property2 } = useParams();
  const history = useHistory();

  const [loaded, setLoaded] = useState(false);
  const [board, setBoard] = useState(null);
  
  const [replies, setReplies] = useState([]);
  const [postings, setPostings] = useState([]);

  async function getBoardData() {
    var data = await getPostingById(property2);
    
    if(data.pid === null || data.pid === undefined) {
      alert('잘못된 경로입니다.')
      history.push({ pathname: `/board/${property1}` });
      return;
    }

    data.views = data.views + 1; await updateBoardPosting(property2, { views: data.views });

    data.content = lineFeedDecoding(data.content);

    await getNextPostings(data.registDate);
    setBoard(data);
  }  

  async function getReplys() {
    var data = await getReplysByPostId(property2);

    for(var i=0; i<data.length; i++) {
      data[i].content = lineFeedDecoding(data[i].content);
    }

    setReplies(data);
  }

  async function getNextPostings(registDate) {
    var data = await getPostingsByBoardName2(property1, registDate);

    setPostings(data);
  }

  async function init() {
    await getBoardData();
    await getReplys();
    setLoaded(true);
  }

  useEffect(() => {
    init();
  }, [property2])

  async function deletePosting() {
    var check = window.confirm('삭제하시겠습니까 ?');
    if(!check) return;

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
                pid={board.pid}
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
            <Text>조회수</Text>
            <Content>
              {board.views}
            </Content>
          </Box>

          <Box>
            <Text>제목</Text>
            <Title>
              <span>{board.title}</span>
            </Title>

            <ReportButton 
              user={props.user} 
              collection='board' 
              docId={board.id} />
          </Box>

          <Box>
            <Text>내용</Text>
            <Pre>{board.content}</Pre>
          </Box>

          <UpButton user={props.user} board={board} setBoard={setBoard} />

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

        <BoxContainer>
          <ReplyList 
            board={board} setBoard={setBoard}
            user={props.user}
            replies={replies} setReplies={setReplies}
          />
        </BoxContainer>
        
        {postings && postings.length !== 0 && 
        <BoxContainer style={{width:'100%', padding:'10px 20px', margin:'0 0 0 -20px'}}>
          <BoardList
            user={props.user}
            title={setTitleByPageName(property1)}
            postings={postings}
            postingLevel={setPostingLevelByPageName(property1)}
          />
        </BoxContainer>}
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
  flex: 0.7;
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