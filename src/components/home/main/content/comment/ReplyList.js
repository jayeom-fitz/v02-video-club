import React, { useState, useEffect } from 'react'

import styled from 'styled-components'
import Reply from './Reply';

import ReplyWrite from './ReplyWrite'

function ReplyList(props) {
  const [replys, setReplys] = useState([]);

  async function getReplys() {

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