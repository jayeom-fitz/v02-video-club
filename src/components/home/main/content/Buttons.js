import React from 'react'

import styled from 'styled-components'

import { GoThumbsup } from 'react-icons/go'
import { ImBubble } from 'react-icons/im'
import { RiExternalLinkLine } from 'react-icons/ri'
import { getVideoLinkByIdAndPlatform } from 'components/effect/function/func_video';

function Buttons(props) {

  function onLinkClick() {
    const link = getVideoLinkByIdAndPlatform(props.comment.linkId, props.comment.platform);

    const win = window.open(link, "_blank");
    win.focus();
  }

  return (
    <Container>
      <Button>
        <ButtonBox>
          <ButtonContent>
            <ButtonIcon>
              <GoThumbsup size='20' color='grey' style={{verticalAlign: 'middle', paddingBottom: '5px'}}/>
            </ButtonIcon>
        
            <ButtonText> 추천 </ButtonText>
          </ButtonContent>
        </ButtonBox>
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
  color: grey;
  font-weight: 800;
  padding-left: 10px;
`