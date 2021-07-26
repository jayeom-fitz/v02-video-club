import React, { useState } from 'react'

import styled from 'styled-components'

import User from 'components/effect/User'
import { getImageLinkByIdAndPlatform } from 'components/effect/function/func_video'
import { lineFeedDecoding } from 'components/effect/function/func_str'

import Buttons from './Buttons';
import ReplyList from './ReplyList'

function Comment(props) {
  const [comment, setComment] = useState(props.comment);
  const [activeReply, setActiveReply] = useState(false);

  function imageClick() {
    props.setVideo({
      id : comment.linkId,
      platform : comment.platform
    })

    if(document.getElementById("vc_video_box").style.display !== 'flex')
      document.getElementById("vc_video_box").style.display = "flex";
  }

  return (
    <Container>
      <Content>
        <Box flex='0.5' style={{alignItems: 'center'}}>
          <ImageBox>
            <Image 
              src={getImageLinkByIdAndPlatform(comment.linkId, comment.platform)} 
              onClick={() => imageClick()}
            />
          </ImageBox>
        </Box>

        <Box flex='0.5'>
          <div>
            <User
              pid={comment.pid}
              pimage={comment.pimage} 
              pname={comment.pname} 
              plevel={comment.plevel}/>

            <Text>
              <Pre>{lineFeedDecoding(comment.content)}</Pre>
            </Text>

          </div>
        </Box>

      </Content>

      <Buttons comment={comment} setComment={setComment}
              user={props.user}
              setActiveReply={setActiveReply} />

      {activeReply && 
        <ReplyList user={props.user} comment={comment} />
      }
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
  cursor: pointer;
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

// #f70d1a ferrari red
// #ffa6c9 carnation