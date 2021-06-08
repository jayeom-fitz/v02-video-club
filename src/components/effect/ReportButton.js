import React from 'react'

import styled from 'styled-components'

import { RiAlarmWarningLine } from 'react-icons/ri';

function ReportButton(props) {
  const onClickReport = () => {
    if(props.user === undefined) {
      alert('로그인 후 이용 가능합니다.'); return;
    }

    window.open(`/report?collection=${props.collection}&docId=${props.docId}`, '_blank', 'width=500,height=600,left=50,top=50')
  }

  return (
    <Container onClick={onClickReport}>
      <RiAlarmWarningLine color='red' size='16'/> 
      <Text>신고</Text>
    </Container>
  )
}

export default ReportButton

const Container = styled.div`
  display: flex;
  padding: 2px;
  border: 1px solid grey;
  border-radius: 5px;
  box-shadow: 3px 3px 3px grey;
  align-items: center;
  cursor: pointer;
`
const Text = styled.div`
  font-size: 0.7rem;
  padding-left: 5px;
`
