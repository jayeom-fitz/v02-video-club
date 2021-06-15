import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom";

import styled, { css } from 'styled-components'

import Loading from 'components/effect/Loading';
import { getReportsByActive } from 'fb/report/get';

function Reports() {
  const { id } = useParams();

  const [loaded, setLoaded] = useState(false);
  const [reports, setReports] = useState([]);

  async function getReports() {
    var data = await getReportsByActive(id === undefined || id === 'active') ;

    setReports(data); setLoaded(true);
  }

  useEffect(() => {
    getReports();
  }, [id])

  return (
    <div style={{width:'100%'}}>
      {loaded ? <>
        <Container>
          <Title>신고 관리</Title>

          <div>
            <div>
              
            </div>

            <div style={{paddingTop:'20px'}}>
              <Line top='true'>
                <Column flex='0.1'>이미지</Column>
                <Column flex='0.3'>아이디</Column>
                <Column flex='0.2'>닉네임</Column>
                <Column flex='0.2'>최근 로그인</Column>
                <Column flex='0.2'>가입일</Column>
              </Line>

              {reports.length !== 0 ? reports.map((report) => 
                console.log(report)
              ) : <Line>신고된 내용이 없습니다</Line>}
            </div>
          </div>
        </Container>
      </> : <Loading size='72' />}
    </div>
  )
}

export default Reports

const Container = styled.div`
  padding: 40px;
`
const Title = styled.h1`
  margin: 0;
`

const Line = styled.div`
  width: 100%;
  display: flex;
  padding: 10px;
  transition-duration: 0.2s;
  border-bottom: 1px solid lightgrey;
  align-items: center;
  
  ${(props) => {
    if(props.top) {
      return css`
        color: white;
        background-color: black;
      `;
    } else {
      return css`
        &:hover {
          background-color: lightgrey;
        }
      `;
    }
  }}
`
const Column = styled.div`
  flex: ${(props) => props.flex || '0.1'};
  text-align: center;
`