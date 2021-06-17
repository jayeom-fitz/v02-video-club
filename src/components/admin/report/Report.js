import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom";

import styled, { css } from 'styled-components'

import User from 'components/effect/User';
import Loading from 'components/effect/Loading';
import { lineFeedDecoding } from 'components/effect/function/func_str';

import { getReportById } from 'fb/report/get';
import { storeService } from 'fb/f';

function Report() {
  const { id } = useParams();

  const [loaded, setLoaded] = useState(false);
  const [report, setReport] = useState(null);
  const [content, setContent] = useState('');

  async function getReport() {
    var data = await getReportById(id);

    var dataContent;

    await storeService.collection(data.collection).doc(data.docId).get().then(function (doc) {
      dataContent = doc.data().content;  
    })

    dataContent = lineFeedDecoding(dataContent);
    data.content = lineFeedDecoding(data.content);

    console.log(data);

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
          {report.id}
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