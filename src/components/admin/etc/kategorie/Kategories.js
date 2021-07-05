import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom";

import styled, { css } from 'styled-components'

import Loading from 'components/effect/Loading';
import { dateToString } from 'components/effect/function/func_time';
import { lineFeedDecoding } from 'components/effect/function/func_str';

import { getKategories } from 'fb/main/get';



function Kategories() {
  const { id } = useParams();

  const [loaded, setLoaded] = useState(false);
  const [kategories, setKategories] = useState([]);

  async function getKategoriesData() {
    var data = await getKategories();

    setKategories(data); setLoaded(true);
  }

  useEffect(() => {
    getKategoriesData();
  }, [id])

  function collectionToString(str) {
    switch(str) {
      case 'reply' : return '댓글';
      case 'board' : return '게시글';
      default : return '';
    }
  }

  function contentToString(str) {
    str = lineFeedDecoding(str)

    if(str.length > 20) {
      str = str.substring(0, 20) + '...';
    }
  
    return str;
  }

  return (
    <div style={{width:'100%'}}>
      {loaded ? <>
        <Container>
          <Title>카테고리 관리</Title>

          <div style={{paddingTop:'20px'}}>
            
          </div>
        </Container>
      </> : <Loading size='72' />}
    </div>
  )
}

export default Kategories

const Container = styled.div`
  padding: 40px;
`
const Title = styled.h1`
  margin: 0;
`
const Button = styled.button`
  width: 100px;
  height: 60px;
  margin: 0 20px;
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
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`