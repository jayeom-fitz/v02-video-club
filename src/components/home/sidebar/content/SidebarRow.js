import React from 'react'
import { Link } from 'react-router-dom';

import styled from 'styled-components';

const MaterialIcon = (props) => (
  <props.icon color='white' />
);

const Icon = styled(MaterialIcon)`
  font-size: large !important;
`

function SidebarRow({ item }) {  
  return (
    <Link to={`${item.path}`} style={{textDecoration:'none'}}>
      <Container>
        <Icon icon={item.icon} />
        <Content>{item.title}</Content>
      </Container>
    </Link>
  )
}

export default SidebarRow

const Content = styled.h2`
  flex: 1;
  margin-left: 20px;
  font-size: 14px;
  font-weight: 500;
  color: white;
`
const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 20px;
  
  &:hover {
    background-color: white;
    cursor: pointer;
    * {
      color: #f70d1a;
    }
    ${Content} {
      color: #f70d1a;
      font-weight: bold;
    }
  }
`