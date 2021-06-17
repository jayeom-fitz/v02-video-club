import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom";

import styled, { css } from 'styled-components'

import Loading from 'components/effect/Loading';
import { dateToString } from 'components/effect/function/func_time';
import { lineFeedDecoding } from 'components/effect/function/func_str';

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

  function collectionToString(str) {
    switch(str) {
      case 'reply' : return '댓글';
      case 'board' : return '게시글';
      default : return '';
    }
  }

  function contentToString(str) {
    str = lineFeedDecoding(str)

    if(str.length > 20) {
      str = str.substring(0, 20) + '...';
    }
  
    return str;
  }

  return (
    <div style={{width:'100%'}}>
      {loaded ? <>
        <Container>
          <Title>신고 관리</Title>

          <div style={{paddingTop:'20px'}}>
            <div>
              <Link to='/admin/reports/active'>
                <Button>처리 중</Button>
              </Link>
              <Link to='/admin/reports/process'>
                <Button>처리 완료</Button>
              </Link>
            </div>

            <div style={{paddingTop:'20px'}}>
              <Line top='true'>
                <Column flex='0.2'>종류</Column>
                <Column flex='0.5'>내용</Column>
                <Column flex='0.3'>신고일</Column>
              </Line>

              {reports.length !== 0 ? reports.map((report) => 
                <StyledLink key={report.id} to={`/admin/report/${report.id}`}>
                  <Line>
                    <Column flex='0.2'>{collectionToString(report.collection)}</Column>
                    <Column flex='0.5'>{contentToString(report.content)}</Column>
                    <Column flex='0.3'>{dateToString(report.registDate)}</Column>
                  </Line>
                </StyledLink>
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
const Button = styled.button`
  width: 100px;
  height: 60px;
  margin: 0 20px;
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
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`