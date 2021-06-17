import React from 'react'
import { Link } from "react-router-dom";

import styled from 'styled-components'

import Avatar from "@material-ui/core/Avatar";

function User(props) {
  return (
    <StyledLink to={props.admin ? `/admin/user/${props.pid}` : `/user/${props.pid}`}>
      <Container>
        <StyledAvatar src={props.pimage} />
        <Text
          bold={props.plevel >= 1 ? '900' : '100'}
          color={props.plevel === 2 ? '#f70d1a' : props.plevel === 1 ? '#0f52ba' : 'black'}
        >{props.pname}</Text>
      </Container>
    </StyledLink>
  )
}

export default User

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`
const Container = styled.div`
  display: flex;
  align-items: center;
`
const StyledAvatar = styled(Avatar)`
  width: 30px !important;
  height: 30px !important;
  margin: auto 10px;
  border: 1px solid lightgrey;
`
const Text = styled.span`
  margin: 0 10px;
  font-size: 0.9rem;
  font-weight: ${(props) => `${props.bold}` || '500' };
  color: ${(props) => `${props.color}` || 'black' };
`

