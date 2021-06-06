import React, { useState } from 'react'

import styled from 'styled-components'

import { dateToString2 } from 'components/effect/function/func_time';

import User from 'components/effect/User';

import { FiThumbsUp } from 'react-icons/fi';
import { BsPencil, BsTrash } from 'react-icons/bs';
import { RiAlarmWarningLine } from 'react-icons/ri';

import { getReplyUps, isClikedLike } from 'fb/reply/get';
import { updateReplyUps, addReplyUpClickedUser } from 'fb/reply/set';
import { setUserPointUp } from 'fb/users/set';

function ReplyRow(props) {
  const [edit, setEdit] = useState(false);
  const [content, setContent] = useState(props.reply.content);
  const [up, setUp] = useState(props.reply.ups);

  const onLikeClick = async () => {
    if(props.user === undefined) {
      alert('로그인 후 이용해주세요.'); return;
    } else if(props.user.uid === props.reply.pid) {
      return;
    }

    var isClicked = await isClikedLike(props.reply.id, props.user.uid);
    if(isClicked) {
      alert('이미 추천하였습니다.'); return;
    }

    var replyUps = await getReplyUps(props.reply.id);
    if(replyUps === undefined || replyUps === 0) replyUps = 1;
    else replyUps++;

    await updateReplyUps(props.reply.id, replyUps);
    await addReplyUpClickedUser(props.reply.id, props.user.uid);
    await setUserPointUp(props.reply.pid, 5);

    setUp(replyUps);
  }

  return (
    <Container>
      <Title>
        <User 
          pimage={props.reply.pimage} 
          pname={props.reply.pname} 
          plevel={props.reply.plevel}/>
        <Date >{dateToString2(props.reply.registDate)}</Date>

        <Icon onClick={onLikeClick}><FiThumbsUp size='14'/></Icon>

        {up !== undefined && up > 0 && 
          <Span>{up}</Span>
        }
        
        <RiAlarmWarningLine 
          size='14' style={{paddingLeft:'10px', cursor:'pointer'}}/>

        {props.user && ((props.user.uid === props.reply.pid) || (props.user.level >= 1)) && <>
          <BsPencil 
            size='14' style={{paddingLeft:'10px', cursor:'pointer'}}/>
          <BsTrash 
            size='14' style={{paddingLeft:'10px', cursor:'pointer'}}/>
        </>}
      </Title>

      <Content>
        {content}
      </Content>
    </Container>
  )
}

export default ReplyRow

const Container = styled.div`
  width: 100%;
`
const Title = styled.div`
  display: flex;
  align-items: center;
`
const Date = styled.div`
  font-size: 0.8rem;
  color: grey;
`
const Content = styled.pre`
  padding: 0 10px;
  font-size: 0.9rem;
`
const Icon = styled.div`
  padding-left: 10px;
  cursor: pointer;
`
const Span = styled.span`
  padding: 0 10px;
  font-size: 0.9rem;
  font-weight: 900;
`