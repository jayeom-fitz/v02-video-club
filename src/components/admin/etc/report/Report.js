import React, { useState, useEffect } from 'react'
import { useHistory, useParams, Link } from "react-router-dom";

import styled, { css } from 'styled-components'

import User from 'components/effect/User';
import Loading from 'components/effect/Loading';
import { lineFeedDecoding, lineFeedEncoding } from 'components/effect/function/func_str';

import { storeService } from 'fb/f';
import { getReportById } from 'fb/report/get';
import { processReport, processReports } from 'fb/report/set';
import { dateToString } from 'components/effect/function/func_time';

function Report(props) {
  const { id } = useParams();
  const history = useHistory();

  const [loaded, setLoaded] = useState(false);
  const [report, setReport] = useState(null);
  const [content, setContent] = useState('');

  const [processContent, setProcessContent] = useState('');
  const [active, setActive] = useState(true);

  async function getReport() {
    var data = await getReportById(id);

    if(data == null) {
      alert('잘못된 접근입니다.');
      window.history.back(); return;
    }

    var dataContent;

    await storeService.collection(data.collection).doc(data.docId).get().then(function (doc) {
      dataContent = doc.data().content;  
    })

    dataContent = lineFeedDecoding(dataContent);
    data.content = lineFeedDecoding(data.content);

    setContent(dataContent); setReport(data);  
    setLoaded(true);
  }

  useEffect(() => {
    getReport();
  }, [id])

  function collectionToString(str) {
    switch(str) {
      case 'reply' : return '댓글';
      case 'board' : return '게시글';
      default : return '';
    }
  }

  async function onSubmit(check) {
    if(processContent.replace(/ /gi, '').replace(/\n/gi, '') === '') {
      document.getElementById('vc_processContent').focus(); 
      alert('처리 내용을 입력해주세요.'); return;
    }

    if(!active) {
      await storeService.collection(report.collection).doc(report.docId).update({
        active : false
      });
    }

    const pcontent = lineFeedEncoding(processContent);

    const processor = {
      processId : props.user.uid,
      processImage: props.user.image,
      processName : props.user.name,
      processLevel : props.user.level,
      processActive : active
    }

    if(check) {
      await processReport(id, pcontent, processor);
    } else {
      await processReports(report.docId, pcontent, processor);
    }

    alert('처리되었습니다.');
    history.push({ pathname: '/admin/reports' });
  }

  return (
    <div style={{width:'100%'}}>
      {loaded ? <>
        <Container>
          <Title>신고 처리</Title>

          <BoxContainer>
            <Box>
              <Text>글 종류</Text>
              <Content>{collectionToString(report.collection)}</Content>
            </Box>

            <Box>
              <Text>작성자</Text>
              <Content>
                <User
                  pid={report.rid}
                  pimage={report.rimage} 
                  pname={report.rname} 
                  plevel={report.rlevel}
                  admin={true}/>
              </Content>
            </Box>

            <Box>
              <Text>글 내용</Text>
              <Content>
                <Pre>{content}</Pre>
              </Content>
            </Box>

            <Box>
              <Text>신고자</Text>
              <Content>
                <User
                  pid={report.pid}
                  pimage={report.pimage} 
                  pname={report.pname} 
                  plevel={report.plevel}
                  admin={true}/>
              </Content>
            </Box>

            <Box>
              <Text>신고 내용</Text>
              <Content>
                <Pre>{report.content}</Pre>
              </Content>
            </Box>
          </BoxContainer>
          
          {report.processContent !== undefined ? 
          <BoxContainer>
            <Box>
              <Text>처리자</Text>
              <Content>
                <User
                  pid={report.processId}
                  pimage={report.processImage} 
                  pname={report.processName} 
                  plevel={report.processLevel}
                  admin={true}/>
              </Content>
            </Box>

            <Box>
              <Text>처리 내용</Text>
              <Content>
                <Pre>{lineFeedDecoding(report.processContent)}</Pre>
              </Content>
            </Box>

            <Box>
              <Text>삭제 여부</Text>
              <Content>
                <label><input type="radio" checked={report.processActive} readOnly
                /> 유지</label>

                <label><input type="radio" checked={!report.processActive} readOnly
                /> 삭제</label>
              </Content>
            </Box>

            <Box>
              <Text>처리 일자</Text>
              <Content>
                {dateToString(report.processDate)}
              </Content>
            </Box>
          </BoxContainer>
          :
          <BoxContainer>
            <Box>
              <Text>처리 내용</Text>
              <Textarea 
                id='vc_processContent'
                value={processContent} 
                onChange={(e) => setProcessContent(e.target.value)}/>
            </Box>

            <Box>
              <Text>삭제 여부</Text>
              <Content>
                <label><input type="radio" id="level" value={true} checked={active}
                          onChange={() => setActive(true)}
                /> 유지</label>

                <label><input type="radio" id="level" value={false} checked={!active}
                          onChange={() => setActive(false)}
                /> 삭제</label>
              </Content>
            </Box>

            <Box style={{justifyContent:'center'}}>
              <Button onClick={() => onSubmit(true)}>단일 처리</Button>
              <Button onClick={() => onSubmit(false)}>전체 처리</Button>
            </Box>
          </BoxContainer>
          }
        </Container>
      </> : <Loading size='72' />}
    </div>
  )
}

export default Report

const Container = styled.div`
  padding: 40px;
`
const Title = styled.h1`
  margin: 0;
`
const BoxContainer = styled.div`
  align-items: center;
  width: 80%;
  margin: 20px auto;
  background-color: white;
  border: 1px solid lightgrey;
  border-radius: 10px;
  box-shadow: 3px 3px 5px grey;
`
const Box = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 10px;
`
const Text = styled.h4`
  flex: 0.2;
  text-align: center;
  margin: 0;
`
const Content = styled.div`
  flex: 0.8;
  padding: 5px;
`
const Pre = styled.pre`
  margin: 0;
`
const Textarea = styled.textarea`
  flex: 0.8;
  height: 100px;
  padding: 5px;
  margin: 0 15px;
  resize: none;
`
const Button = styled.button`
  width: 80px;
  height: 60px;
  margin: 0 10px;
`