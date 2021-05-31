import React, { useState, useEffect } from 'react'
import { useParams, Link, useHistory } from "react-router-dom";

import styled, { css } from 'styled-components'

import { lineFeedEncoding } from 'components/effect/function/func_str';

import { writeBoardPosting } from 'fb/board/set';

function Write(props) {
  const { property1 } = useParams();
  const history = useHistory();
 
  const [loaded, setLoaded] = useState(false);
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  async function init() {
    if(!props.user) {
      alert('로그인 후 이용바랍니다.');
      window.history.back();
    }else if(!props.edit) {

    }

    setLoaded(true);
  }

  useEffect(() => {
    init();
  }, [])

  async function onSubmit() {
    if(title.replace(/ /gi, '') === '') {
      document.getElementById('vc_title').focus(); alert('제목을 입력해주세요.'); return;
    } else if(content.replace(/ /gi, '').replace(/\n/gi, '') === '') {
      document.getElementById('vc_content').focus(); alert('내용을 입력해주세요.'); return;
    }

    const str = lineFeedEncoding(content);

    if(props.edit) {

      alert('수정이 완료되었습니다.');
    } else {
      writeBoardPosting({
        board: property1,
        title, content: str, registDate: Date.now(), active: true, views: 0, ups: 0,
        pid: props.user.uid, pname: props.user.name, pimage: props.user.image,
      })
      alert('작성이 완료되었습니다.');
    }

    history.push({ pathname: `/${property1}` })
  }

  return (
    <Container>
      <Title>글쓰기</Title>

      <BoxContainer>
        <InputBox>
          <Text>제목</Text>
          <Input id='vc_title' value={title} onChange={(e) => setTitle(e.target.value)}/>
        </InputBox>

        <InputBox>
          <Text>내용</Text>
          <Textarea id='vc_content' value={content} onChange={(e) => setContent(e.target.value)}/>
        </InputBox>

        <InputBox>
          <div style={{width:'100%', textAlign:'center'}}>
            {props.edit ?
              <Button color='#0099CC' onClick={() => onSubmit()} >
                수정
              </Button> :
              <Button color='#007E33' onClick={() => onSubmit()}>
                작성
              </Button>
            }
            <Button color='#CC0000' onClick={() => window.history.back()}>
              취소
            </Button>
          </div>
        </InputBox>
      </BoxContainer>
    </Container>
  )
}

export default Write

const Container = styled.div`
  width: 100%;
  padding: 20px 50px;
`
const Title = styled.h1`
  margin: 0;
`
const BoxContainer = styled.div`
  align-items: center;
  width: 80%;
  margin: 20px auto;
`
const InputBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 10px 0;
`
const Text = styled.h4`
  flex: 0.2;
  text-align: center;
  margin: 15px 0;
`
const Input = styled.input`
  flex: 0.8;
  height: 30px;
  margin: 5px 0;
  padding: 0 10px;
  border: 1px solid grey;

  &:focus {
    outline: 2px solid #f70d1a;
  }
`
const Textarea = styled.textarea`
  flex: 0.8;
  height: 200px;
  resize: none;
  padding: 10px;
  border: 1px solid grey;

  &:focus {
    outline: 2px solid #f70d1a;
  }
`
const Button = styled.button`
  width: 100px;
  height: 60px;
  margin: 0 10px;
  transition: 0.3s;
  font-size: 1.1rem;
  color: white;
  background-color: ${(props) => `${props.color}` || 'black'};
  border: 2px solid ${(props) => `${props.color}` || 'black'};

  &:hover {
    color: black;
    background-color: white;
  }
`