import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom";

import styled, { css } from 'styled-components'

import Avatar from "@material-ui/core/Avatar";
import Loading from 'components/effect/Loading';

import { dateToString } from 'components/effect/func';

import { getUsersByLevel, getUsersByLevelAndName } from 'fb/users/get';

function Users() {
  const { startComponent } = useParams();

  const [loaded, setLoaded] = useState(false);
  const [title, setTitle] = useState('');
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  async function getUsers() {
    var array = []; var level;

    switch(startComponent) {
      case 'administrators': 
        level = 1; setTitle('관리자'); break;
      case 'users' : 
        level = 0; setTitle('유저'); break;
      default : 
        level = -1; setTitle('정지 유저'); break;
    }

    array = await getUsersByLevel(level > 0 ? '>=' : '==', level);
    
    setUsers(array); setLoaded(true);
  }

  useEffect(() => {
    getUsers();
  }, [startComponent])

  const nameSearch = async () => {
    var array = []; var level;

    switch(startComponent) {
      case 'administrators': 
        level = 1; setTitle('관리자'); break;
      case 'users' : 
        level = 0; setTitle('유저'); break;
      default : 
        level = -1; setTitle('정지 유저'); break;
    }

    array = await getUsersByLevelAndName(level > 0 ? '>=' : '==', level, search);
    
    setUsers(array);
  }

  return (
    <div style={{width:'100%'}}>
      {loaded ? <>
        <Container>
          <Title>{title} 관리</Title>
          
          <div>
            <div>
              <Input value={search} placeholder='이름 검색' onChange={(e) => setSearch(e.target.value)}/>
              <SearchButton onClick={nameSearch}>검색</SearchButton>
            </div>
            
            <div style={{paddingTop:'20px'}}>
              <Line top='true'>
                <Column flex='0.1'>이미지</Column>
                <Column flex='0.3'>아이디</Column>
                <Column flex='0.2'>닉네임</Column>
                <Column flex='0.2'>최근 로그인</Column>
                <Column flex='0.2'>가입일</Column>
              </Line>
              {users.length !== 0 ? users.map((user) => 
                <StyledLink key={user.id} to={`/admin/user/${user.id}`}>
                  <Line>
                    <Column flex='0.1'>
                      <StyledAvatar src={user.image}/>
                    </Column>
                    <Column flex='0.3'>{user.id}</Column>
                    <Column flex='0.2'>{user.name}</Column>
                    <Column flex='0.2'>{dateToString(user.lastLoginDate)}</Column>
                    <Column flex='0.2'>{dateToString(user.joinDate)}</Column>
                  </Line>
                </StyledLink>
              ) : <Line>{title}이(가) 없습니다</Line>}

            </div>
          </div>
        </Container>
      </> : <Loading size='72'/>}
    </div>
  )
}

export default Users

const Container = styled.div`
  padding: 40px;
`
const Title = styled.h1`
  margin: 0;
`
const Input = styled.input`
  padding: 10px;
  margin-top: 20px;
  border: none;
  border-bottom: 1px solid lightgrey;
  &:focus {
    outline: 2px solid #3CAEA3
  }
`
const SearchButton = styled.button`
  padding: 10px 20px;
  margin-left: 10px;
  color: #f70d1a;
  border: 1px solid #f70d1a;
  background-color: white;

  &:hover {
    color: white;
    background-color: #f70d1a;
  }
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
const StyledAvatar = styled(Avatar)`
  width: 50px !important;
  height: 50px !important;
  margin: auto;
  border: 1px solid lightgrey;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`