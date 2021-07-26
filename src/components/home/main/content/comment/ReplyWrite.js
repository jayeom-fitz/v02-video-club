import React,  { useState } from 'react'

import styled from 'styled-components'

import Avatar from "@material-ui/core/Avatar";

import { lineFeedEncoding } from 'components/effect/function/func_str';

import { writeReply } from 'fb/reply/set';
import { updateReplyCount } from 'fb/comment/set';

function ReplyWrite(props) {
  const [reply, setReply] = useState('');
  const [code, setCode] = useState('');

  function onChange(t) {
    t.style.height = '1px';
    t.style.height = (t.scrollHeight) + 'px';
    setReply(t.value);
  }

  async function onKeyDown(e) {
    if((e.code === 'Enter' || e.code === 'NumpadEnter') 
        && (code !== 'ShiftLeft' || code !== 'NumpadEnter' || code !== 'Enter')) {
      await write(); setReply(''); setCode('');
    } else {
      setCode(e.code);
    }
  }

  async function write() {
    if(reply.replace(/ /gi, '').replace(/\n/gi, '') === '') {
      alert('내용을 입력해주세요.'); return;
    }

    const str = lineFeedEncoding(reply);

    var replyData = {
      postId: props.comment.id,
      content: str, registDate: Date.now(), active: true, ups: 0,
      pid: props.user.uid, pname: props.user.name, pimage: props.user.image, 
      plevel: props.user.level
    }

    replyData.id = await writeReply(replyData);

    await updateReplyCount(props.comment.id, 1);

    replyData.content = reply;

    alert('댓글이 작성되었습니다.');
    props.setReplys([replyData, ...props.replys])
  }

  return (
    <Container>
      <StyledAvatar src={props.user.image} />
      <Input placeholder='댓글을 입력하세요'
            value={reply} onChange={(e) => onChange(e.target) } 
            onKeyDown={(e) => onKeyDown(e)}
      />
    </Container>
  )
}

export default ReplyWrite

const Container = styled.div`
  display: flex;
  border-top: 1px solid lightgrey;
  padding: 5px 10px;
`
const StyledAvatar = styled(Avatar)`
  width: 50px !important;
  height: 50px !important;
  margin: auto 10px;
  border: 1px solid lightgrey;
`
const Input = styled.textarea`
  width: 100%;
  min-height: 0.8rem;
  overflow-y: hidden;
  margin: 10px;
  padding: 10px 10px 0 10px;
  resize: none;
  border: none;
  border-radius: 15px;
  background-color: #ffa6c9;

  &:focus {
    outline: none;
  }
`

// #ffa6c9 carnation