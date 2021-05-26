import React from 'react'
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { authService } from 'fb/f'

import Avatar from "@material-ui/core/Avatar";

function UserIcon(props) {
  const onIconClick = () => {    
    const ref = document.getElementById("vc_userIcon_dropdown");

    if(ref.style.display === 'none' || ref.style.display === '') {
      ref.style.display='block';
    } else {
      ref.style.display='none';
    }
  }

  const onLinkClick = () => {
    const ref = document.getElementById("vc_userIcon_dropdown");

    if(ref === null) return;
    ref.style.display='none';
  }

  return (
    <Container>
      <Avatar 
        onClick={() => onIconClick()}
        src={props.user.image}
        style={{cursor:'pointer', border:'1px solid lightgrey'}}
      />

      <Dropdown id="vc_userIcon_dropdown">
        {props.user.level >= 4 &&
          <Link 
            to={`/admin`} style={{textDecoration:'none'}}
            onClick={onLinkClick()}>
            <Content>관리자 페이지</Content>
          </Link>
        }

        <Link 
          to={`/`} style={{textDecoration:'none'}}
          onClick={onLinkClick()}>
          <Content>내 정보</Content>
        </Link>

        <Content
          onClick={() => {
            authService.signOut();
            window.location.reload();
          }}>로그아웃</Content>
      </Dropdown>
    </Container>
  )
}

export default UserIcon

const Container = styled.div`
  position: relative;
  display: inline-block;
`
const Dropdown = styled.div`
  display: none;
  position: absolute;
  right:0;
  background-color: #f1f1f1;
  min-width: 160px;
  border: 1px solid lightgray;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
`
const Content = styled.span`
  color: black;
  padding: 6px 8px;
  text-decoration: none;
  display: block;
  text-align: center;
  &:hover {
    background-color: lightgray;
  }
`