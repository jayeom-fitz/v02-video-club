import React, { useState, useEffect } from 'react'

import styled from 'styled-components'

import { GoThumbsup } from 'react-icons/go'
import { ImBubble } from 'react-icons/im'
import { RiExternalLinkLine } from 'react-icons/ri'

import { getVideoLinkByIdAndPlatform } from 'components/effect/function/func_video';

import { isClickedRecommend } from 'fb/comment/get'
import { commentRecommend } from 'fb/comment/set'

function Buttons(props) {
  const [loaded, setLoaded] = useState(false);
  const [recommend, setRecommend] = useState(false);

  async function checkRecommend() {
    if(props.user === undefined) return;

    const data = await isClickedRecommend(props.comment.id, props.user.uid);
    
    setRecommend(data); setLoaded(true);
  }

  useEffect(() => {
    checkRecommend(); 
  }, [])

  async function onRecommendClick() {
    if(recommend) return;

    const data = await commentRecommend(props.comment, props.user.uid);
    
    props.setComment(data); setRecommend(true);
  }

  function onLinkClick() {
    const link = getVideoLinkByIdAndPlatform(props.comment.linkId, props.comment.platform);

    const win = window.open(link, "_blank");
    win.focus();
  }

  return (
    <Container>
      <Button>
      {loaded &&
        <ButtonBox>
          <ButtonContent onClick={() => onRecommendClick()}>
            <ButtonIcon>
              <GoThumbsup size='20' 
                color={recommend ? '#0f52ba' : 'grey'} 
                style={{verticalAlign: 'middle', paddingBottom: '5px'}}/>
            </ButtonIcon>
        
            <ButtonText color={recommend ? '#0f52ba' : 'grey'}> 추천 {
              props.comment.ups !== 0 && props.comment.ups
            }</ButtonText>
          </ButtonContent>
        </ButtonBox>
      }
      </Button>

      <Button>
        <ButtonBox>
          <ButtonContent>
            <ButtonIcon>
              <ImBubble size='20' color='grey' style={{verticalAlign: 'middle', paddingBottom: '5px'}}/>
            </ButtonIcon>
      
            <ButtonText> 댓글 </ButtonText>
          </ButtonContent>
        </ButtonBox>
      </Button>

      <Button>
        <ButtonBox>
          <ButtonContent onClick={() => onLinkClick()}>
            <ButtonIcon>
              <RiExternalLinkLine size='20' color='grey' style={{verticalAlign: 'middle', paddingBottom: '5px'}}/>
            </ButtonIcon>
      
            <ButtonText> 링크 </ButtonText>
          </ButtonContent>
        </ButtonBox>
      </Button>
    </Container>
  )
}

export default Buttons

const Container = styled.div`
  display: flex;
  border-top: 1px solid lightgrey;
`
const Button = styled.div`
  flex: 1;
  height: 40px;
  line-height: 40px;
`
const ButtonBox = styled.div`
  width: 40%;
  margin: auto;
`
const ButtonContent = styled.div`
  display: flex;
  cursor: pointer;
`
const ButtonIcon = styled.div`
  height: 100%;
`
const ButtonText = styled.div`
  color: ${(props) => props.color || 'grey'};
  font-weight: 800;
  padding-left: 10px;
`

// #0f52ba sapphire