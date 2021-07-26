import React, { useState, useEffect } from 'react'

import styled from 'styled-components'

import Reply from './Reply';
import ReplyWrite from './ReplyWrite'

import { lineFeedDecoding } from 'components/effect/function/func_str';
import { getReplysByPostId } from 'fb/reply/get';

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

  return (
    <Container>
      {props.user && 
        <ReplyWrite user={props.user} comment={props.comment}
                    replys={replys} setReplys={setReplys} />
      }

      {replys.length !== 0 && replys.map((reply) => 
        <Reply reply={reply} />
      )}
    </Container>
  )
}

export default ReplyList

const Container = styled.div`
  border-top: 1px solid lightgrey;
`