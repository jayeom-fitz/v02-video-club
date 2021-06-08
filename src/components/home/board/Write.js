import React, { useState, useEffect } from 'react'
import { useParams, useHistory, useLocation  } from "react-router-dom";

import styled from 'styled-components'

import { lineFeedDecoding, lineFeedEncoding } from 'components/effect/function/func_str';

import { writeBoardPosting, updateBoardPosting } from 'fb/board/set';
import { getPostingById } from 'fb/board/get';
import { setUserPointUp } from 'fb/users/set';
import Loading from 'components/effect/Loading';

function Write(props) {
  const { property1 } = useParams();
  const history = useHistory();

  const location = useLocation();
 
  const [loaded, setLoaded] = useState(false);
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  function goBack(sel) {
    if(sel === 1) {
      history.push({ pathname: `/board/${property1}/${location.state.id}` })
    } else {
      history.push({ pathname: `/board/${property1}` })
    }
  }

  async function init() {
    if(!props.user) {
      alert('로그인 후 이용바랍니다.'); goBack(0);      
    }
    
    if(!props.edit) {
      
    } else {
      var data = await getPostingById(location.state.id);
    
      if(data.pid === null || data.pid === undefined) {
        alert('잘못된 경로입니다.'); goBack(0); return;
      }
  
      data.content = lineFeedDecoding(data.content);
      setTitle(data.title); setContent(data.content);
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
      await updateBoardPosting(location.state.id, {
        title, content: str
      });
      alert('수정이 완료되었습니다.');
    } else {
      await writeBoardPosting({
        board: property1,
        title, content: str, registDate: Date.now(), active: true, views: 0, ups: 0, replyCount: 0,
        pid: props.user.uid, pname: props.user.name, pimage: props.user.image, 
        plevel: props.user.level
      })

      await setUserPointUp(props.user.uid, 5);
      alert('작성이 완료되었습니다.');
    }

    goBack(0);
  }

  return (
    <Container>
      {loaded ? <>
        <Title>{props.edit ? '글 수정': '글 쓰기'}</Title>

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
              <Button color='#CC0000' onClick={() => goBack(props.edit ? 1 : 0)}>
                취소
              </Button>
            </div>
          </InputBox>
        </BoxContainer>
      </> : <Loading size='72'/>}
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