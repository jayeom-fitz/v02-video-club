import React, { useState, useEffect } from 'react'
import { useParams, Link, useHistory } from "react-router-dom";

import styled, { css } from 'styled-components'

import { getPostingById } from 'fb/board/get';

import Loading from 'components/effect/Loading';
import User from 'components/effect/User';

function Read(props) {
  const { property1, property2 } = useParams();
  const history = useHistory();

  const [loaded, setLoaded] = useState(false);
  const [board, setBoard] = useState(null);

  async function getBoardData() {
    var data = await getPostingById(property2);

    setBoard(data);
  }  

  async function init() {
    await getBoardData();
    setLoaded(true);
  }

  useEffect(() => {
    init();
  }, [property2])

  return (
    <Container>
      {loaded ? <>
        <BoxContainer>
          <Box>
            <Text>작성자</Text>
            <User pimage={board.pimage} pname={board.pname} plevel={board.plevel}/>
          </Box>

          <Box>
            <Text>제목</Text>
            <span>{board.title}</span>
          </Box>

          <Box>
            <Text>내용</Text>
            <p>{board.content}</p>
          </Box>
        </BoxContainer>
      </> : <Loading size='72' />}
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
const Input = styled.input`
  flex: 0.8;
  height: 30px;
  margin: 5px 0;
  padding: 0 10px;
  border: 1px solid grey;

  &:focus {
    outline: 2px solid #f70d1a;
  }
`
const Textarea = styled.textarea`
  flex: 0.8;
  height: 200px;
  resize: none;
  padding: 10px;
  border: 1px solid grey;

  &:focus {
    outline: 2px solid #f70d1a;
  }
`