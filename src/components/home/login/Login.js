import React from 'react'

import styled from 'styled-components';

import { firebaseInstance, storeService } from 'fb/f'

import { FcGoogle } from 'react-icons/fc'
import { AiFillGithub, AiFillFacebook } from 'react-icons/ai'

import { getUserCount } from 'fb/main/get';
import { userCountUp } from 'fb/main/set';

function Login() {
  async function onSocialClick(name) {
    let provider;

    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    } else if (name === "facebook") {
      provider = new firebaseInstance.auth.FacebookAuthProvider();
    }

    var data;
    await firebaseInstance.auth().signInWithPopup(provider).then((result) => {
      data = result;
    }).catch(function (error) {
      alert(error.message); window.location.reload();
    });

    if(data.additionalUserInfo.isNewUser) {
      var count = await getUserCount();
      await storeService.collection("users").doc(data.user.uid).set({
        name : `NewUser${count}`,
        image : data.user.photoURL,
        joinDate : Date.now(),
        level : 0,
        point : 0,
        reportCount : 0,
      });
      await userCountUp();
    }   
    
    await storeService.collection("users").doc(data.user.uid).update({
      lastLoginDate : Date.now(),
    });

    window.location.reload();
  }

  return (
    <Container id='vc_login_frame'>
      <Box>
        <Title>로그인</Title>

        <div style={{paddingTop:'20px'}}>
          <LoginButton 
            onClick={() => onSocialClick('google')}
            borderColor='#cfcfcf'>
            <Icon><FcGoogle size='24' /></Icon>
            <Text>구글 로그인</Text>
          </LoginButton>

          <LoginButton
            onClick={() => onSocialClick('github')}
            bgColor='#000' color='#fff'>
            <Icon><AiFillGithub size='24'/></Icon>
            <Text>깃허브 로그인</Text>
          </LoginButton>

          {/* <LoginButton 
            onClick={() => onSocialClick('facebook')}
            bgColor='#3b5998' color='#fff'>
            <Icon><AiFillFacebook size='24'/></Icon>
            <Text>페이스북 로그인</Text>
          </LoginButton> */}
        </div>

        <CancleButton onClick={() => document.getElementById('vc_login_frame').style.display = 'none'}>
          <Text style={{width:'100%'}}>취소</Text>
        </CancleButton>
      </Box>
    </Container>
  )
}

export default Login

const Container = styled.div`
  display: none;
  position: fixed;
  width: 300px;
  height: 400px;
  top: 50%;
  left: 50%;
  margin:-200px 0 0 -150px;
  background-color: white;
  border-radius: 10px;
  box-shadow : rgba(0,0,0,0.5) 0 0 0 9999px, 3px 3px 5px grey;
  z-index: 200;
`
const Box = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 5px;
`
const Title = styled.h3`
  display: block;
  width: 80%;
  margin: auto;
  text-align: center;
  padding: 10px 0;
`
const LoginButton = styled.div`
  display: flex;
  width: 80%;
  height: 40px;
  margin: auto;
  margin-bottom: 20px;
  align-items: center;
  text-align: center;
  cursor: pointer;
  border: 1px solid ${(props) => props.borderColor || 'white'};
  background-color: ${(props) => props.bgColor || 'white'};
  color: ${(props) => props.color || 'black'};
`
const Icon = styled.div`
  width: 20%;
  height: 24px;
`
const Text = styled.div`
  width: 80%;
  font-size: 14px;
`
const CancleButton = styled.div`
  display: flex;
  width: 80%;
  height: 40px;
  margin: auto;
  align-items: center;
  text-align: center;
  cursor: pointer;
  border: 1px solid red;
  color: red;
  background-color: white;
  transition: 0.5s;

  &:hover {
    color: white;
    background-color: red;
  }
`