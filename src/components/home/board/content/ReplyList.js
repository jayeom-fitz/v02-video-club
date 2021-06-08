import React, { useState } from 'react'

import styled from 'styled-components'

import Reply from './Reply'
import ReplyRow from './ReplyRow'

function ReplyList(props) {
  return (
    <Container>
      <Title>댓글 {props.board.replyCount ? props.board.replyCount : 0}개</Title>

      {props.replies && props.replies.map((reply) => 
        <ReplyRow key={reply.id}
          user={props.user} board={props.board}
          reply={reply}
        />
      )}

      <Reply 
        user={props.user} 
        board={props.board} setBoard={props.setBoard}
        replies={props.replies} setReplies={props.setReplies}
      />
    </Container>
  )
}

export default ReplyList

const Container = styled.div`
  align-items: center;
  width: 80%;
  margin: 20px auto;
`
const Title = styled.h4`
  padding-top: 10px;
`
const Box = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 10px 0;
`