import React, { useState } from 'react'

import styled from 'styled-components'

import User from 'components/effect/User';

import { dateToString } from 'components/effect/function/func_time';

import { toggleKategorieActive } from 'fb/main/set';

import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai'

function Kategorie(props) {
  async function toggleActive() {
    await toggleKategorieActive(props.kategorie.id, !props.kategorie.active); 
    props.straightNumber(props.kategorie);
    alert('처리되었습니다');
  }

  return (
    <>
      <Line>
        <Column flex='0.1'>{props.kategorie.number}</Column>
        <Column flex='0.1'>{props.kategorie.id}</Column>
        <Column flex='0.1'>{props.kategorie.name}</Column>
        <Column flex='0.1'>{props.kategorie.commentCount}</Column>
        <Column flex='0.2'>
          <User
            pid={props.kategorie.pid}
            pimage={props.kategorie.pimage} 
            pname={props.kategorie.pname} 
            plevel={props.kategorie.plevel}
            admin={true}/>
        </Column>
        <Column flex='0.2'>{dateToString(props.kategorie.registDate)}</Column>
        <Column flex='0.2'>
          <ArrowButton onClick={async () => await props.changeNumber(props.kategorie, -1)}>
            <AiOutlineArrowUp size='16' />
          </ArrowButton>
          <ArrowButton onClick={async () => await props.changeNumber(props.kategorie, 1)}>
            <AiOutlineArrowDown size='16' />
          </ArrowButton>
          <Button onClick={() => toggleActive()}>{props.kategorie.active ? '금지' : '복구'}</Button>
        </Column>
      </Line>
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