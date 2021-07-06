import React, { useState } from 'react'

import styled, { css } from 'styled-components'

import User from 'components/effect/User';

import { dateToString } from 'components/effect/function/func_time';

function Kategorie(props) {
  const [active, setActive] = useState(true);

  return (
    <div style={{width:'100%'}}>
          aaa
    </div>
  )
}

export default Kategorie

const Container = styled.div`
  padding: 40px;
`
const Title = styled.h1`
  margin: 0;
`
const BoxContainer = styled.div`
  align-items: center;
  width: 80%;
  margin: 20px auto;
  background-color: white;
  border: 1px solid lightgrey;
  border-radius: 10px;
  box-shadow: 3px 3px 5px grey;
`
const Box = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 10px;
`
const Text = styled.h4`
  flex: 0.2;
  text-align: center;
  margin: 0;
`
const Content = styled.div`
  flex: 0.8;
  padding: 5px;
`
const Pre = styled.pre`
  margin: 0;
`
const Textarea = styled.textarea`
  flex: 0.8;
  height: 100px;
  padding: 5px;
  margin: 0 15px;
  resize: none;
`
const Button = styled.button`
  width: 80px;
  height: 60px;
  margin: 0 10px;
`