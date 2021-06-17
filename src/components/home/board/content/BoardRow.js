import React from 'react'
import { Link } from "react-router-dom";

import styled from 'styled-components'

import { dateToString2 } from 'components/effect/function/func_time';

import User from 'components/effect/User';

function BoardRow(props) {
  return (
    <Line>
      <Column flex='0.5'>
        <StyledLink to={`/board/${props.posting.board}/${props.posting.id}`}>
          {props.posting.title} {props.posting.replyCount ? `[${props.posting.replyCount}]` : null}
        </StyledLink>
      </Column>
        
      <Column flex='0.2'>
        <User 
          pid={props.posting.pid}
          pimage={props.posting.pimage} 
          pname={props.posting.pname} 
          plevel={props.posting.plevel}/>
      </Column>
       
      <Column flex='0.1'>{dateToString2(props.posting.registDate)}</Column>
       
      <Column flex='0.1'>{props.posting.views}</Column>
        
      <Column flex='0.1'>{props.posting.ups}</Column>
    </Line>
  )
}

export default BoardRow

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;

  &:visited {
    color: #f70d1a;
  }
`
const Line = styled.div`
  width: 100%;
  display: flex;
  padding: 5px;
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
