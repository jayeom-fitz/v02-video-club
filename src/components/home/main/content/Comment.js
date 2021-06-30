import React, { useState } from 'react'

import styled from 'styled-components'

import { getImageLinkByIdAndPlatform } from 'components/effect/function/func_video'

function Comment(props) {
  console.log(props.comment)
  return (
    <Container>
      <Box flex='0.5'>
        <ImageBox>
          <Image src={getImageLinkByIdAndPlatform(props.comment.linkId, props.comment.platform)} />
        </ImageBox>
      </Box>
    </Container>
  )
}

export default Comment

const Container = styled.div`
  display: flex;
  width: 80%;
  margin: 20px auto;
  align-items: center;
  border: 1px solid lightgrey;
  box-shadow: 5px 5px 5px grey;
`
const Box = styled.div`
  flex: ${(props) => props.flex || 1};
  padding: 10px;
`
const ImageBox = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.26%;
`
const Image = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
`


const InputBox = styled.div`
  width: 100%;
  text-align: center;
`
const Input = styled.input`
  width: 80%;
  height: 30px;
  margin: 5px auto;
  padding: 0 10px;
  border: none;
  border-bottom: 1px solid grey;

  &:focus {
    outline: none;
  }
`
const Textarea = styled.textarea`
  width: 80%;
  height: 150px;
  resize: none;
  padding: 10px;
  margin: 5px auto;
  border: 1px solid grey;

  &:focus {
    outline: none;
  }
`


const Button = styled.button`
  width: 80%;
  height: 30px;
  margin: 5px auto;
  border: none;
  color: white;
  font-size: 14px;
  font-weight: 700;
  background-color: #f70d1a;

  &:hover {
    background-color: #ff3d3a;
  }
`
// #f70d1a ferrari red
// #ffa6c9 carnation