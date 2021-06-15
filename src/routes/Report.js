import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import styled from 'styled-components'

import queryString from 'query-string'

import { storeService } from 'fb/f';

import { writeReport } from 'fb/report/set';
import { isDuplicatedReport } from 'fb/report/get';
import { setUserReportCountUp } from 'fb/users/set';

import { lineFeedEncoding } from 'components/effect/function/func_str';

import Loading from 'components/effect/Loading';

function Report(props) {
  const history = useHistory();

  const [loaded, setLoaded] = useState(false);
  const [id, setId] = useState('');
  const [col, setCol] = useState('');
  const [content, setContent] = useState('');

  const [rdata, setRdata] = useState(null);

  async function init() {
    if(!props.user) {
      alert('로그인 후 이용 가능합니다.'); window.close();
      return;
    }

    const queryObj = queryString.parse(history.location.search);
    const { docId, collection } = queryObj;
    
    var check = false;

    await storeService.collection(`${collection}`).doc(`${docId}`).get()
        .then(function (doc) {
          if(!doc.exists) check = true;
          else setRdata(doc.data());
        }).catch(function (error) {
          alert(error); check = true;
        })
    
    if(check) {
      alert('잘못된 경로입니다.'); window.close();
      return;
    }

    setId(docId); setCol(collection); setLoaded(true);
  }

  useEffect(() => {
    init()
  }, [history])

  const onSubmit = async () => {
    if(content.replace(/ /gi, '').replace(/\n/gi, '') === '') {
      document.getElementById(`vc_reportContent`).focus(); 
      alert('내용을 입력해주세요.'); return;
    }

    var check = await isDuplicatedReport(id, props.user.uid);
    if(check) {
      alert('이미 신고를 하셨습니다.'); window.close();
      return;
    }

    const str = lineFeedEncoding(content);

    var reportData = {
      collection: col, docId: id, content: str, 
      registDate: Date.now(), active: true,
      rid: rdata.pid, rname: rdata.pname, 
      rimage: rdata.pimage, rlevel: rdata.plevel,
      pid: props.user.uid, pname: props.user.name, 
      pimage: props.user.image, plevel: props.user.level
    }

    await writeReport(reportData);

    await setUserReportCountUp(rdata.pid);

    alert('신고가 처리되었습니다.'); window.close();
  }

  return (
    <div style={{width:'100%',height:'100vh',backgroundColor:'#ffa6c9', alignItems:'center'}}>
      {loaded ? <>
        <Container>
          <Box>
            <Title>신고하기</Title>

            <div style={{paddingTop:'30px'}}>
              <SubTitle>신고내용</SubTitle>
              <Textarea 
                id='vc_reportContent'
                value={content} onChange={(e) => setContent(e.target.value)}/>
            </div>


            <div style={{textAlign:'center'}}>
              <Button onClick={onSubmit}>신고</Button>
              <Button onClick={() => window.close()}>취소</Button>
            </div>
          </Box>
        </Container>
      </> : <Loading size='72' /> }
    </div>
  )
}

export default Report

const Container = styled.div`
  position: fixed;
  width: 460px;
  height: 550px;
  top: 50%;
  left: 50%;
  margin: -275px 0 0 -230px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 5px 5px 5px grey;
`

const Box = styled.div`
  padding: 20px;
`
const Title = styled.h2`
  margin: 0;
`
const SubTitle = styled.h4`
  margin: 0;
`
const Textarea = styled.textarea`
  margin: 10px 0;
  width: 100%;
  height: 300px;
  resize: none;

  &:focus { 
    outline: none; 
  }
`
const Button = styled.button`
  width: 80px;
  height: 40px;
  margin: 10px;
`