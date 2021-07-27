import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

import styled from "styled-components";

import { dateToString2 } from 'components/effect/function/func_time';

import { isClikedLike } from 'fb/reply/get';

import Avatar from "@material-ui/core/Avatar";

import { FiEdit2 } from 'react-icons/fi'
import { ImCross } from 'react-icons/im'
import { GoThumbsup } from 'react-icons/go'
import { replyRecommend } from 'fb/reply/set';

function Reply(props) {
  const [reply, setReply] = useState(props.reply)
  
  const [loaded, setLoaded] = useState(false);
  const [recommend, setRecommend] = useState(false);

  async function checkRecommend() {
    if(!(props.user === null || props.user === undefined)) {
      const data = await isClikedLike(reply.id, props.user.uid);
      setRecommend(data);
    }    
     setLoaded(true);
  }

  useEffect(() => {
    checkRecommend(); 
  }, [])

  async function onRecommendClick() {
    if(recommend) return;

    const data = await replyRecommend(reply, props.user.uid);
    
    setReply(data); setRecommend(true);
  }

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
                 
          {props.user && (props.user.uid === props.reply.pid || props.user.level >= 1) &&
          <div style={{verticalAlign:'middle'}}>
            <StyledFiEdit size='12' />
          </div>}

          {props.user && (props.user.uid === props.reply.pid || props.user.level >= 1) &&
          <div style={{verticalAlign:'middle'}}>
            <StyledImCross size='12' onClick={() => props.onDeleteReply(reply.id)}/>
          </div>}

          <div style={{verticalAlign:'middle'}}>
            <StyledGoThumbsup size='12' color={recommend ? '#f70d1a' : 'grey'}
                              onClick={() => onRecommendClick()}/> 
                              
            {reply.ups !== 0 && 
              <UpCount>{reply.ups}</UpCount>
            }
          </div>

          <WriteDate>
            {dateToString2(reply.registDate)}
          </WriteDate>
          
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
const StyledFiEdit = styled(FiEdit2)`
  color: grey;
  padding-right: 10px;
  margin: 0;
  cursor: pointer;
`
const StyledImCross = styled(ImCross)`
  color: grey;
  padding-right: 10px;
  margin: 0;
  cursor: pointer;
`
const StyledGoThumbsup = styled(GoThumbsup)`
  color: ${(props) => props.color};
  padding-right: 10px;
  margin: 0;
  cursor: pointer;
`
const UpCount = styled.span`
  color: #f70d1a;
  padding-right: 10px;
  font-size: 0.9rem;
`
