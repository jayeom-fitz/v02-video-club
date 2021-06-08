import React, { useState } from 'react'
import { useParams } from "react-router-dom";

import styled from 'styled-components'

import { lineFeedEncoding } from 'components/effect/function/func_str';

import { writeReply } from 'fb/reply/set';
import { setUserPointUp } from 'fb/users/set';
import { getReplyCount } from 'fb/board/get';
import { updateBoardPosting } from 'fb/board/set';

function Reply(props) {
  const { property2 } = useParams();

  const [reply, setReply] = useState('');

  const onClick = async () => {
    if(reply.replace(/ /gi, '').replace(/\n/gi, '') === '') {
      document.getElementById(`vc_reply`).focus(); 
      alert('내용을 입력해주세요.'); return;
    }

    const str = lineFeedEncoding(reply);

    var replyData = {
      postId: property2,
      content: str, registDate: Date.now(), active: true, ups: 0,
      pid: props.user.uid, pname: props.user.name, pimage: props.user.image, 
      plevel: props.user.level
    }

    replyData.id = await writeReply(replyData);

    await setUserPointUp(props.user.uid, 1);

    var data = props.board;

    data.replyCount = await getReplyCount(property2);

    if(data.replyCount === undefined) data.replyCount = 1;
    else data.replyCount = data.replyCount + 1;

    await updateBoardPosting(property2, data);

    replyData.content = reply;
    var array = [replyData, ...props.replies];

    props.setReplies(array);
    props.setBoard(data); setReply('');
    alert('댓글이 작성되었습니다.');
  }

  return (
    <Container>
      {props.user ? <>
        <Textarea 
          id={`vc_reply`}
          placeholder='댓글을 남겨주세요.'
          value={reply} onChange={(e) => setReply(e.target.value)} />
        <Button onClick={onClick}>등록</Button>
      </> : <Textarea value='로그인 후 작성 가능합니다.' readOnly/> }
    </Container>
  )
}

export default Reply

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 10px 0;
`
const Textarea = styled.textarea`
  flex: 0.8;
  height: 80px;
  resize: none;
  padding: 10px;
  border: 1px solid grey;

  &:focus {
    outline: 2px solid #f70d1a;
  }
`
const Button = styled.button`
  flex: 0.2;
  height: 100px;
  margin-left: 20px;
`