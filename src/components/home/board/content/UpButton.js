import React from 'react'
import { useParams } from "react-router-dom";

import styled from 'styled-components'

import { FaThumbsUp } from 'react-icons/fa'
import { plusUp } from 'fb/board/set';

function UpButton(props) {
  const { property2 } = useParams();

  async function onClick() {
    if(props.user === undefined) {
      alert('로그인 후 이용해주세요.'); return;
    } else if(props.user.uid === props.board.pid) {
      return;
    }

    var data = props.board;

    data.ups = await plusUp(property2, props.user.uid);

    if(data.ups === -1) {
      alert('이미 추천하였습니다.'); return;
    }

    props.setBoard(data);
  }

  return (
    <Container>
      <Circle onClick={() => onClick()}>
        <FaThumbsUp size='24' style={{paddingTop:'10px'}}/>
        <Content>
          {props.board.ups}
        </Content>
      </Circle>
    </Container>
  )
}

export default UpButton

const Container = styled.div`
  width: 100%;
  padding: 20px;
  align-items: center;
`
const Circle = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid lightgrey;
  background-color: lightgrey;
  text-align: center;
  margin: 0 auto;
  cursor: pointer;

  &:hover {
    background-color: grey;
  }
`
const Content = styled.div`
  padding-top: 10px;
  font-size: 24px;
`