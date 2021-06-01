import React from 'react'
import { Link, useParams } from "react-router-dom";

import styled from 'styled-components'

function WriteButton(props) {
  const { property1 } = useParams();

  return (
    <>
      {props.user && ((props.user.level >= props.postingLevel)) && 
        <div>
          <Link to={`/board/${property1}/write`}>
            <Button>글쓰기</Button>
          </Link>
        </div>
      }
    </>
  )
}

export default WriteButton

const Button = styled.button`
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