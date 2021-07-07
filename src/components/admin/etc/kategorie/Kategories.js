import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom";

import styled, { css } from 'styled-components'

import Kategorie from './Kategorie';

import Loading from 'components/effect/Loading';
import { dateToString } from 'components/effect/function/func_time';
import { lineFeedDecoding } from 'components/effect/function/func_str';

import { getKategories, isDuplicatedByKategorieId } from 'fb/main/get';
import { registKategorie } from 'fb/main/set';

function Kategories(props) {
  const [loaded, setLoaded] = useState(false);
  const [active, setActive] = useState(true);
  const [kategories, setKategories] = useState([]);

  const [kid, setKid] = useState('');
  const [kname, setKname] = useState('');

  async function getKategoriesData() {
    var data = await getKategories(active);

    setKategories(data); setLoaded(true);
  }

  useEffect(() => {
    getKategoriesData();
  }, [active])

  async function onSubmit() {
    if(kid.replace(/ /gi, '') === '') {
      document.getElementById('vc_kid').focus(); alert('아이디를 입력해주세요'); return;
    } else if(kname.replace(/ /gi, '') === '') {
      document.getElementById('vc_kname').focus(); alert('카테고리명을 입력해주세요'); return;
    } 

    var check = await isDuplicatedByKategorieId(kid);

    if(check) {
      document.getElementById('vc_kid').focus(); alert('중복된 아이디 입니다'); return;
    }

    var data = {
      name : kname, commentCount : 0, active : true, registDate : Date.now(),
      pid : props.user.uid, pimage: props.user.image, pname : props.user.name, plevel : props.user.level,
    };

    await registKategorie(kid, data);

    data.id = kid;

    if(active) {
      setKategories([...kategories, data])
    }
    setKid(''); setKname(''); alert('등록되었습니다.');
  }

  return (
    <div style={{width:'100%'}}>
      {loaded ? <>
        <Container>
          <Title>카테고리 관리</Title>

          <div style={{paddingTop:'20px'}}>
            <label><input type="radio" value={true} checked={active}
                        onChange={() => setActive(true)}
            /> 유지</label>

            <label style={{paddingLeft: '10px'}}><input type="radio" value={false} checked={!active}
                        onChange={() => setActive(false)}
            /> 삭제</label>
          </div>

          <div style={{paddingTop:'20px'}}>
            <Line top='true'>
              <Column flex='0.2'>아이디</Column>
              <Column flex='0.2'>카테고리명</Column>
              <Column flex='0.1'>코멘트 수</Column>
              <Column flex='0.2'>생성자</Column>
              <Column flex='0.2'>생성일</Column>
              <Column flex='0.1'></Column>
            </Line>

            {kategories.length !== 0 ? kategories.map((kategorie) => 
              <Kategorie kategorie={kategorie} key={kategorie.id} />
            ) : <Line>등록된 카테고리가 없습니다</Line>}

            <Line top='true'>
              <Column flex='0.2'>
                <Input placeholder='아이디 입력' 
                      value={kid} onChange={(e) => setKid(e.target.value.replace(/ /gi, ''))} 
                      id='vc_kid' />
              </Column>

              <Column flex='0.2'>
                <Input placeholder='카테고리명 입력' 
                      value={kname} onChange={(e) => setKname(e.target.value)} 
                      id='vc_kname' />
              </Column>

              <Column flex='0.5' />

              <Column flex='0.1'>
                <Button onClick={() => onSubmit()}>추가</Button>
              </Column>
            </Line>
          </div>
        </Container>
      </> : <Loading size='72' />}
    </div>
  )
}

export default Kategories

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
const Input = styled.input`
  width: 80%;
  height: 20px;
  
  &:focus {
    outline: none;
  }
`
const Button = styled.button`
  width: 100px;
  height: 30px;
  margin: 0 20px;
`