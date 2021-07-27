import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

import styled from "styled-components";

import { dateToString2 } from 'components/effect/function/func_time';

import { isClikedLike } from 'fb/reply/get';

import Avatar from "@material-ui/core/Avatar";

import { FiEdit2 } from 'react-icons/fi'
import { ImCross } from 'react-icons/im'
import { GoThumbsup } from 'react-icons/go'
import { replyRecommend, updateReplyContent } from 'fb/reply/set';
import { lineFeedEncoding } from 'components/effect/function/func_str';

function Reply(props) {
  const [reply, setReply] = useState(props.reply)
  const [recommend, setRecommend] = useState(false);

  const [edit, setEdit] = useState(false);
  const [content, setContent] = useState(props.reply.content);

  async function checkRecommend() {
    if(!(props.user === null || props.user === undefined)) {
      const data = await isClikedLike(reply.id, props.user.uid);
      setRecommend(data);
    }    
  }

  useEffect(() => {
    checkRecommend(); 
  }, [])

  async function onRecommendClick() {
    if(recommend) return;

    const data = await replyRecommend(reply, props.user.uid);
    
    setReply(data); setRecommend(true);
  }

  function onChange(t) {
    t.style.height = '1px';
    t.style.height = (t.scrollHeight) + 'px';
    setContent(t.value);
  }

  async function onKeyDown(e) {
    if(e.code === 'Enter') { 
      await updateReplyContent(reply.id, lineFeedEncoding(content));
      var r = reply; r.content = content; 
      alert('댓글이 수정되었습니다.')
      setReply(r);  setEdit(false);
    } 
  }

  return (
    <Container>
      <div>
        <StyledAvatar src={reply.pimage}/>
      </div>

      <div style={{paddingLeft:'10px', width:'80%'}}>
        <div style={{display:'flex'}}>
          <Name>
            <StyledLink to={`/user/${reply.pid}`}>
              {reply.pname}
            </StyledLink>
          </Name>
                 
          {props.user && (props.user.uid === props.reply.pid || props.user.level >= 1) &&
          <div style={{verticalAlign:'middle'}}>
            <StyledFiEdit size='12' onClick={() => setEdit(!edit)} />
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

        <div style={{width:'100%'}}>
          {edit ? 
          <Input value={content} 
                onChange={(e) => onChange(e.target) } 
                onKeyDown={(e) => onKeyDown(e)}/>
          :
          <Content>
            {reply.content}
          </Content>
          }
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