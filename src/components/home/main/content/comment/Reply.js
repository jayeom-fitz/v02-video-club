import React, { useState } from 'react'
import { Link } from "react-router-dom";

import styled from "styled-components";

import { dateToString2 } from 'components/effect/function/func_time';

import Avatar from "@material-ui/core/Avatar";

import { ImCross } from 'react-icons/im'
import { GoThumbsup } from 'react-icons/go'

function Reply(props) {
  const [reply, setReply] = useState(props.reply)

  return (
    <Container>
      <div>
        <StyledAvatar src={reply.pimage}/>
      </div>

      <div style={{paddingLeft:'10px'}}>
        <div style={{display:'flex'}}>
          <Name>
            <StyledLink to={`/user/${reply.pid}`}>
              {reply.pname}
            </StyledLink>
          </Name>

          {/* {props.user && ( props.user.uid === props.comment.uid || props.user.verified===2 ) && 
          <div style={{verticalAlign:'middle'}}>
            <StyledImCross size='12' onClick={() => props.onDeleteComment(props.comment.id)}/>
          </div>} */}
          

          <WriteDate>
            {dateToString2(reply.registDate)}
          </WriteDate>
          
          <div style={{verticalAlign:'middle'}}>
            <StyledImCross size='12'/>
          </div>

          <div style={{verticalAlign:'middle'}}>
            <StyledGoThumbsup size='12'/>
          </div>
        </div>

        <div>
          <Content>
            {reply.content}
          </Content>
        </div>
      </div>  
    </Container>
  )
}

export default Reply

const Container = styled.div`
  flex: 1;
  display: flex;
  background-color: #f9f9f9;
  padding: 10px;
  &:hover {
    background-color: #c9c9c9;
  }
`
const StyledAvatar = styled(Avatar)`

`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`
const Name = styled.div`
  padding-right: 10px;
`
const WriteDate = styled.div`
  font-size: 12px;
  color: grey;
  margin: auto 0;
`
const Content = styled.pre`
  overflow: auto;
  white-space: pre-wrap;
  word-break: break-all;
  margin-top: 5px;
`
const StyledImCross = styled(ImCross)`
  color: grey;
  padding-right: 10px;
  margin: 0;
  cursor: pointer;
`
const StyledGoThumbsup = styled(GoThumbsup)`
  color: grey;
  padding-right: 10px;
  margin: 0;
  cursor: pointer;
`