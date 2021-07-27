import React, { useState, useEffect } from 'react'

import styled from 'styled-components'

import Reply from './Reply';
import ReplyWrite from './ReplyWrite'

import { lineFeedDecoding } from 'components/effect/function/func_str';
import { getReplysByPostId } from 'fb/reply/get';
import { deleteReply } from 'fb/reply/set';

function ReplyList(props) {
  const [replys, setReplys] = useState([]);

  async function getReplys() {
    var data = await getReplysByPostId(props.comment.id);

    for(var i=0; i<data.length; i++) {
      data[i].content = lineFeedDecoding(data[i].content);
    }

    setReplys(data);
  }

  useEffect(() => {
    getReplys();
  }, [])

  async function onDeleteReply(id) {   
    var array = [];

    for(var i=0; i<replys.length; i++) {
      if(id !== replys[i].id) {
        array.push(replys[i]);
      } 
    }

    await deleteReply(id);
    alert('삭제되었습니다.');
    setReplys(array); 
  }

  return (
    <Container>
      {props.user && 
        <ReplyWrite user={props.user} comment={props.comment}
                    replys={replys} setReplys={setReplys} />
      }

      {replys.length !== 0 && replys.map((reply) => 
        <Reply  key={reply.id} 
              user={props.user} 
              reply={reply} onDeleteReply={onDeleteReply} />
      )}
    </Container>
  )
}

export default ReplyList

const Container = styled.div`
  border-top: 1px solid lightgrey;
`