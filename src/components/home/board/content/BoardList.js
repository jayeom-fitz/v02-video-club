import React from 'react'

import styled from 'styled-components'

import BoardRow from './BoardRow';
import WriteButton from './WriteButton';

function BoardList(props) {
  return (
    <>
      <Title>{props.title !== undefined && props.title}</Title>

      <ButtonWrap>
        <WriteButton 
          user={props.user}
          postingLevel={props.postingLevel}
        />
      </ButtonWrap>

      <div style={{paddingTop:'20px'}}>
        <Line>
          <Column flex='0.5'>제목</Column>
          <Column flex='0.2'>작성자</Column>
          <Column flex='0.1'>작성일</Column>
          <Column flex='0.1'>조회수</Column>
          <Column flex='0.1'>추천수</Column>
        </Line>

        {props.postings.length === 0 ? <Line>게시글이 없습니다.</Line> : 
          props.postings.map((posting) =>
            <BoardRow key={posting.id} posting={posting} />
          )}
      </div>

      <ButtonWrap>
        <WriteButton 
          user={props.user}
          postingLevel={props.postingLevel}
        />
      </ButtonWrap>
    </>
  )
}

export default BoardList

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
const ButtonWrap = styled.div`
  width: 100%;
  text-align: right;
  padding-top: 20px;
`