import React, { useState, useEffect } from 'react'

import styled from 'styled-components';

import { IoNotifications } from 'react-icons/io5' 

function NotificationIcon(props) {
  const [notiCount, setNotiCount] = useState(0);

  return (
    <Container>
      <Content>
        <StyledIoNotifications size='24'/> 

        <NotificationsCount>
          {notiCount}
        </NotificationsCount>
      </Content>
    </Container>
  )
}

export default NotificationIcon

const Container = styled.div`
  margin-right: 50px;
`
const Content = styled.div`
  position: relative;
`
const StyledIoNotifications = styled(IoNotifications)`
  margin-top: 5px;
  cursor: pointer;
`
const NotificationsCount = styled.span`
  position:absolute;
  top: 0px;
  right: -10px;
  min-width: 8px;
  height: 20px;
  line-height: 20px;
  margin-top: -11px;
  padding: 0 6px;
  font-weight: normal;
  font-size: small;
  color: white;
  text-align: center;
  text-shadow: 0 1px rgba(0, 0, 0, 0.2);
  background: #e23442;
  border: 1px solid #911f28;
  border-radius: 11px;
`