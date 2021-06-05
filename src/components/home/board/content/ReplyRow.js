import React, { useState } from 'react'

import styled from 'styled-components'

import { dateToString2 } from 'components/effect/function/func_time';

import User from 'components/effect/User';

import { FiThumbsUp } from 'react-icons/fi';
import { BsPencil, BsTrash } from 'react-icons/bs';

function ReplyRow(props) {
  const [edit, setEdit] = useState(false);

  return (
    <Container>
      <Title>
        <User 
          pimage={props.reply.pimage} 
          pname={props.reply.pname} 
          plevel={props.reply.plevel}/>
        <Date >{dateToString2(props.reply.registDate)}</Date>
        <FiThumbsUp size='12' style={{paddingLeft:'10px'}}/>
        <BsPencil />
        <BsTrash />
      </Title>

      <Content>
        {props.reply.content}
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