import React, { useState } from 'react'

import styled from 'styled-components'

import { ImCross, ImPlus, ImMinus } from 'react-icons/im'
import { getVideoLinkByIdAndPlatform } from 'components/effect/function/func_video';

function Video(props) {
  const MIN_SIZE = 360;
  const MAX_SIZE = 1280;

  const [size, setSize] = useState(MIN_SIZE);

  function onCloseClick() {
    document.getElementById("vc_video_box").style.display = "none";
  }

  return (
    <Container id='vc_video_box'>
      <VideoBox size={`${size}px`}>
        <Iframe 
          src={getVideoLinkByIdAndPlatform(props.video.id, props.video.platform)}   
          frameBorder='0'
          allowFullScreen />
      </VideoBox>

      <div>
        <IconBox onClick={() => onCloseClick()}>
          <ImCross size='24' color='white' />
        </IconBox>
        
        {size < MAX_SIZE &&
          <IconBox onClick={() => setSize(size * 1.2)}><ImPlus size='24' color='white' /></IconBox>
        }

        {size > MIN_SIZE &&
          <IconBox onClick={() => setSize(size * 0.8)}><ImMinus size='24' color='white' /></IconBox>
        }
      </div>
    </Container>
  )
}

export default Video

const Container = styled.div`
  display: none;
  position: fixed;
  top: 85px;
  left: 0;
  z-index: 100;
`
const VideoBox = styled.div`
  position: relative;
  width: ${(props) => props.size};
  padding-bottom: 56.25%;
  background-color: red;
`
const Iframe = styled.iframe`
  position: absolute;
  width: 100%;
  height: 100%;
`
const IconBox = styled.div`
  padding: 5px;
  cursor: pointer;
  background-color: #f70d1a;
  margin-bottom: 5px;
`