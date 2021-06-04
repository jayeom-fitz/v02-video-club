import React, { useState } from 'react'

import styled from 'styled-components'

import Reply from './Reply'

function ReplyList(props) {
  return (
    <Container>
      <h3>댓글 {props.board.replyCount ? props.board.replyCount : 0}개</h3>
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
const Box = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 10px 0;
`