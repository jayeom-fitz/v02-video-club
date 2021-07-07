import React, { useState } from 'react'

import styled from 'styled-components'

import User from 'components/effect/User';

import { dateToString } from 'components/effect/function/func_time';

function Kategorie(props) {
  const [edit, setEdit] = useState(false);

  return (
    <>
    {edit ? <></> :
      <Line>
        <Column flex='0.2'>{props.kategorie.id}</Column>
        <Column flex='0.2'>{props.kategorie.name}</Column>
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
        <Column flex='0.1'>수정</Column>
      </Line>
    }
    </>
  )
}

export default Kategorie

const Container = styled.div`
  padding: 40px;
`
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