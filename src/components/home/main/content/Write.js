import React, { useState } from 'react'
import { useParams } from "react-router-dom";

import styled from 'styled-components'

import User from 'components/effect/User';
import { getVideoLinkByIdAndPlatform, getVideoIdByLink } from 'components/effect/function/func_video';

import { writeCommentPosting } from 'fb/comment/set';
import { setCommentCountUp } from 'fb/video/set';
import { lineFeedEncoding } from 'components/effect/function/func_str';

function Write(props) {
  const { property1 } = useParams();

  const [link, setLink] = useState('');
  const [linkInput, setLinkInput] = useState('');
  const [content, setContent] = useState('');

  const [id, setId] = useState('');
  const [platform, setPlatform] = useState('');

  function onChangeLink(str) {
    setLinkInput(str);

    var data = getVideoIdByLink(str);

    if(data === null) {
      if(link !== '') setLink('');  return;
    }

    setId(data.id); setPlatform(data.platform);
    data = getVideoLinkByIdAndPlatform(data.id, data.platform);
    
    setLink(data);
  }

  async function onSubmit() {
    if(link === '') {
      document.getElementById('vc_link').focus(); 
      alert('잘못된 링크입니다.'); return;
    } else if(content.replace(/ /gi, '').replace(/\n/gi, '') === '') {
      document.getElementById(`vc_content`).focus(); 
      alert('내용을 입력해주세요.'); return;
    }

    var data = {
      linkId : id, platform, content : lineFeedEncoding(content), 
      ups : 0, active : true, replyCount : 0, reply : false, 
      pid : props.user.uid, pname : props.user.name, 
      pimage : props.user.image, plevel : props.user.level,
      registDate : Date.now(), kategorie : property1
    };

    data = await writeCommentPosting(data);
    await setCommentCountUp(data.id);

    alert('게시되었습니다'); setLink(''); setLinkInput(''); setContent('');

    props.setComments([data, ...props.comments]);
  }

  return (
    <Container>
      <Box flex='0.5'>
        <IframeBox>
          {link !== '' &&
            <Iframe src={link} frameborder="0" allowfullscreen="true" />
          }
        </IframeBox>
      </Box>

      <Box flex='0.5'>
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

        <InputBox>
          <Button onClick={() => onSubmit()}>게시</Button>
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
  background-color: white;
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
const IframeBox = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.26%;
`
const Iframe = styled.iframe`
  position: absolute;
  width: 100%;
  height: 100%;
`
const Button = styled.button`
  width: 80%;
  height: 30px;
  margin: 5px auto;
  border: none;
  color: white;
  font-size: 14px;
  font-weight: 700;
  background-color: #f70d1a;

  &:hover {
    background-color: #ff3d3a;
  }
`
// #f70d1a ferrari red
// #ffa6c9 carnation