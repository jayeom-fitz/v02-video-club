import React, { useState } from 'react'

import styled from 'styled-components'

import { dateToString2 } from 'components/effect/function/func_time';
import { lineFeedEncoding } from 'components/effect/function/func_str';

import User from 'components/effect/User';

import { FiThumbsUp } from 'react-icons/fi';
import { BsPencil, BsTrash } from 'react-icons/bs';
import { RiAlarmWarningLine } from 'react-icons/ri';

import { getReplyUps, isClikedLike } from 'fb/reply/get';
import { updateReplyUps, addReplyUpClickedUser
        , deleteReply, updateReplyContent } from 'fb/reply/set';
import { setUserPointUp } from 'fb/users/set';
import ReportButton from 'components/effect/ReportButton';
import { updateReplyCount } from 'fb/board/set';


function ReplyRow(props) {
  const [edit, setEdit] = useState(false);
  const [content, setContent] = useState(props.reply.content);
  const [editContent, setEditContent] = useState(props.reply.content);
  const [up, setUp] = useState(props.reply.ups);
  const [active, setActive] = useState(props.reply.active);

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

  const onSaveClick = async () => {
    var data = lineFeedEncoding(editContent);
    await updateReplyContent(props.reply.id, data);
    setContent(editContent); setEdit(false);
  }

  const onDeleteClick = async () => {
    var check = window.confirm('삭제하시겠습니까 ?');
    if(!check) return;

    await updateReplyCount(props.board.id, -1);
    await deleteReply(props.reply.id);
    setActive(false);
  }

  return (
    <Container>
      {active && <>
        <Title>
          <User 
            pimage={props.reply.pimage} 
            pname={props.reply.pname} 
            plevel={props.reply.plevel}/>
          <Date >{dateToString2(props.reply.registDate)}</Date>

          <Icon onClick={onLikeClick}><FiThumbsUp size='16'/></Icon>

          {up !== undefined && up > 0 && 
            <Span>{up}</Span>
          }

          {props.user && ((props.user.uid === props.reply.pid) || (props.user.level >= 1)) && <>
            <Icon onClick={() => setEdit(!edit)}><BsPencil size='16'/></Icon>
            <Icon onClick={() => onDeleteClick()}><BsTrash size='16'/></Icon>
          </>}

          <div style={{marginLeft:'10px'}}>
            <ReportButton 
              user={props.user} 
              collection='reply' 
              docId={props.reply.id} />
          </div>
        </Title>

        {edit ? <>
          <div style={{display:'flex'}}>
            <Textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} />
            <Button onClick={onSaveClick}>수정</Button>
            <Button onClick={() => {
              setEditContent(content); setEdit(false);
            }}>취소</Button>
          </div>
        </> : <Content>{content}</Content>}
      </>}
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
  height: 16px;
`
const Span = styled.span`
  padding: 0 10px;
  font-size: 0.9rem;
  font-weight: 900;
`
const Textarea = styled.textarea`
  flex: 0.8;
  padding: 10px;
  margin: 10px;
  height: 120px;
  resize: none;
  border: 1px solid grey;

  &:focus {
    outline: 2px solid #f70d1a;
  }
`
const Button = styled.button`
  flex: 0.1;
  margin: 20px;
`