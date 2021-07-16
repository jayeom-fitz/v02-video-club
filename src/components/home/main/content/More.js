import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

import styled from 'styled-components'

import { AiOutlinePlusCircle } from 'react-icons/ai'
import { getMoreRecentlyComments, getMoreRecentlyCommentsByKategorie } from 'fb/comment/get';

function More(props) {
  const { property1 } = useParams();

  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
  }, [property1])

  async function getMoreData() {
    var array
    var registDate = props.comments[props.comments.length - 1].registDate;

    switch(property1) {
      case undefined : array = await getMoreRecentlyComments(registDate); break;

      case 'best' : array = []; break;

      case 'hot' : array = []; break;

      default : array = await getMoreRecentlyCommentsByKategorie(property1, registDate); break;
    }

    if(array.length === 0) setActive(false);
    else props.setComments([...props.comments, ...array]);
  }

  return (
    <Container>
      { props.comments.length !== 0 && props.comments.length % 10 === 0 && active && <>
        <Button onClick={() => getMoreData()} ><AiOutlinePlusCircle size='36'/></Button>
      </>}
    </Container>
  )
}

export default More

const Container = styled.div`
  width: 60%;
  padding-top: 20px;
  margin: auto;
`
const Button = styled.button`
  width: 100%;
  height: 50px;
`