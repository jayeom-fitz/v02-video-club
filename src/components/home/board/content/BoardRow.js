import React from 'react'
import { Link } from "react-router-dom";

import styled from 'styled-components'

import Avatar from "@material-ui/core/Avatar";

import { dateToString2 } from 'components/effect/function/func_time';

function BoardRow(props) {
  return (
    <StyledLink to={`/board/${props.posting.board}/${props.posting.id}`}>
      <Line>
        <Column flex='0.4'>{props.posting.title}</Column>
        
        <Column flex='0.2'>
          <div style={{display:'flex', alignItems:'center'}}>
            <Column flex='0.4'>
              <StyledAvatar src={props.posting.pimage}/>
            </Column>
            <Column flex='0.6'>
              <h4 style={{margin:'auto 0'}}>{props.posting.pname}</h4>
            </Column>
          </div>
          
        </Column>
        
        <Column flex='0.2'>{dateToString2(props.posting.registDate)}</Column>
        
        <Column flex='0.1'>{props.posting.views}</Column>
        
        <Column flex='0.1'>{props.posting.ups}</Column>
      </Line>
    </StyledLink>
  )
}

export default BoardRow

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
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
const StyledAvatar = styled(Avatar)`
  width: 30px !important;
  height: 30px !important;
  margin: auto 10px;
  border: 1px solid lightgrey;
  float: right;
`
