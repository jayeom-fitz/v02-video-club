import React, { useState } from 'react'

import styled from 'styled-components'

import User from 'components/effect/User';

import { dateToString } from 'components/effect/function/func_time';

import { setChangeNumberKategorie, toggleKategorieActive } from 'fb/main/set';

import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai'

function Kategorie(props) {
  function straightNumber(data) {
    var array = [];

    for(var i=0; i<props.kategories.length; i++) {
      if(props.kategories[i].id !== data.id) {
        var k = props.kategories[i]; 
        if(array.length === 0) k.number = 1;
        else k.number = array[array.length - 1].number + 1;
        array.push(k);
      }
    }

    props.setKategories(array);
  }

  async function toggleActive(kategorie) {
    await toggleKategorieActive(kategorie.id, !kategorie.active); 
    straightNumber(kategorie);
    alert('처리되었습니다');
  }

  async function changeNumber(data, value) {
    const number = data.number + value; 
    
    if(number === 0 || number > props.kategories.length) return; 

    await setChangeNumberKategorie(data, props.kategories[number - 1]);
    
    await props.getKategoriesData();
  }

  return (
    <>
      {props.kategories.length !== 0 ? 
        props.kategories.map((kategorie) => 
          <Line key={`vc_kategorie_${kategorie.id}`}>
            <Column flex='0.1'>{kategorie.number}</Column>
            <Column flex='0.1'>{kategorie.id}</Column>
            <Column flex='0.1'>{kategorie.name}</Column>
            <Column flex='0.1'>{kategorie.commentCount}</Column>
            <Column flex='0.2'>
              <User
                pid={kategorie.pid}
                pimage={kategorie.pimage} 
                pname={kategorie.pname} 
                plevel={kategorie.plevel}
                admin={true}/>
            </Column>
            <Column flex='0.2'>{dateToString(kategorie.registDate)}</Column>
            <Column flex='0.2'>
              <ArrowButton onClick={async () => await changeNumber(kategorie, -1)}>
                <AiOutlineArrowUp size='16' />
              </ArrowButton>
              <ArrowButton onClick={async () => await changeNumber(kategorie, 1)}>
                <AiOutlineArrowDown size='16' />
              </ArrowButton>
              <Button onClick={() => toggleActive(kategorie)}>{kategorie.active ? '금지' : '복구'}</Button>
            </Column>
          </Line>
      ) : <Line>등록된 카테고리가 없습니다</Line>}
    </>
  )
}

export default Kategorie

const Line = styled.div`
  width: 100%;
  display: flex;
  padding: 10px;
  transition-duration: 0.2s;
  border-bottom: 1px solid lightgrey;
  align-items: center;
  
  &:hover {
    background-color: lightgrey;
  }   
`
const Column = styled.div`
  flex: ${(props) => props.flex || '0.1'};
  text-align: center;
`
const Button = styled.button`
  width: 75px;
  height: 30px;
  margin: auto;
  border: none;
  transition-duration: 0.4s;
  background-color: #00C851;

  &:hover {
    color: white;
    background-color: #007E33;
  }
`
const ArrowButton = styled.button`
  width: 30px;
  height: 30px;
  margin-right: 5px;
  border: none;
  border-radius: 50%;
  transition-duration: 0.4s;
  background-color: #f70d1a;
  vertical-align: middle;

  &:hover {
    color: black;
    background-color: #ffa6c9;
  }
`