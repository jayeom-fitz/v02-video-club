import React, { useState } from 'react'

import styled from 'styled-components'

import User from 'components/effect/User'
import { getImageLinkByIdAndPlatform } from 'components/effect/function/func_video'
import { lineFeedDecoding } from 'components/effect/function/func_str'

function Comment(props) {
  return (
    <Container>
      <Content>
        <Box flex='0.5' style={{alignItems: 'center'}}>
          <ImageBox>
            <Image src={getImageLinkByIdAndPlatform(props.comment.linkId, props.comment.platform)} />
          </ImageBox>
        </Box>

        <Box flex='0.5'>
          <div>
            <User
              pid={props.comment.pid}
              pimage={props.comment.pimage} 
              pname={props.comment.pname} 
              plevel={props.comment.plevel}/>

            <Text>
              <Pre>{lineFeedDecoding(props.comment.content)}</Pre>
            </Text>

          </div>
        </Box>

      </Content>
    </Container>
  )
}

export default Comment

const Container = styled.div`
  width: 60%;
  margin: 20px auto;
  border: 1px solid lightgrey;
  box-shadow: 5px 5px 5px grey;
  background-color: white;
`
const Content = styled.div`
  display: flex;
`
const Box = styled.div`
  flex: ${(props) => props.flex || 1};
  padding: 10px;
`
const ImageBox = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 75%;
`
const Image = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
`
const Text = styled.div`
  width: 80%;
  padding: 10px 5px;
  margin: 5px auto;
`
const Pre = styled.pre`
  line-height: 150%;
  white-space: pre-wrap;
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