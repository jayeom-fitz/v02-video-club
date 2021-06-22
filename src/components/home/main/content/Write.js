import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

import styled from 'styled-components'

import User from 'components/effect/User';

function Write(props) {
  const [link, setLink] = useState('');
  const [linkInput, setLinkInput] = useState('');
  const [content, setContent] = useState('');

  function onChangeLink(str) {
    setLinkInput(str)
  }

  return (
    <Container>
      <Box flex='0.4'>
        이미지
      </Box>

      <Box flex='0.6'>
        <User 
          pid={props.user.uid}
          pimage={props.user.image} 
          pname={props.user.name} 
          plevel={props.user.level}/>

        <InputBox>
          <Input 
            id='vc_link'
            placeholder='링크를 입력해주세요' 
            value={linkInput}
            onChange={(e) => onChangeLink(e.target.value)} />
        </InputBox>

        <InputBox>
          <Textarea 
            id='vc_content'
            placeholder='댓글을 입력해주세요' 
            value={content}
            onChange={(e) => setContent(e.target.value)} />
        </InputBox>
        
      </Box>
    </Container>
  )
}

export default Write

const Container = styled.div`
  display: flex;
  width: 80%;
  margin: 20px auto;
  align-items: center;
  border: 1px solid lightgrey;
  box-shadow: 5px 5px 5px grey;
`
const Box = styled.div`
  flex: ${(props) => props.flex || 1};
  padding: 10px;
`
const InputBox = styled.div`
  width: 100%;
  text-align: center;
`
const Input = styled.input`
  width: 80%;
  height: 30px;
  margin: 5px auto;
  padding: 0 10px;
  border: none;
  border-bottom: 1px solid grey;

  &:focus {
    outline: none;
  }
`
const Textarea = styled.textarea`
  width: 80%;
  height: 150px;
  resize: none;
  padding: 10px;
  margin: 5px auto;
  border: 1px solid grey;

  &:focus {
    outline: none;
  }
`