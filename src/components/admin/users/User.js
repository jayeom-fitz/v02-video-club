import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

import styled from 'styled-components'

import Avatar from "@material-ui/core/Avatar";
import Loading from 'components/effect/Loading';

import { dateToString, dateToString2, numberToString } from 'components/effect/func';

import { getUserById, isDuplicatedByName } from 'fb/users/get';

function User(props) {
  const { id } = useParams();

  const [loaded, setLoaded] = useState(false);

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [level, setLevel] = useState(0);
  const [point, setPoint] = useState(0);

  const [joinDate, setJoinDate] = useState(0);
  const [lastLoginDate, setLastLoginDate] = useState(0);

  const [banReason, setBanReason] = useState('');
  const [banDate, setBanDate] = useState(0);
  const [releaseDate, setReleaseDate] = useState(0);

  async function getUserData() {
    var user = await getUserById(id);

    setName(user.name); setImage(user.image);
    setLevel(user.level); setPoint(user.point);
    setJoinDate(user.joinDate); setLastLoginDate(user.lastLoginDate);

    if(user.banReason !== undefined) setBanReason(user.banReason);
    if(user.banDate !== undefined) setBanDate(user.banDate);

    setLoaded(true);
  }

  useEffect(() => {
    getUserData();
  }, [id])

  const onSubmit = async () => {
    var checkId = await isDuplicatedByName(name);

    // var ban = 0;
    
    // if(verified === -1 && banDate === 0) ban = Date.now();

    // await storeService.collection('users').doc(id).update({
    //   nickname, photoURL, verified, banReason, banDate : ban
    // });
    
    // setBanDate(ban);
    // alert('수정되었습니다.')
  }

  return (
    <div style={{width:'100%'}}>
      {loaded ? <> 
        <Container>
          <Title>유저 관리</Title>

          <BoxContainer>
            <Box flex='0.3'>
              <StyledAvatar src={image} alt="" />
            </Box>

            <Box flex='0.7'>
              <InputBox>
                <Text>가입일</Text>
                <Box flex='0.8'>
                  <Text>{dateToString(joinDate)} - {dateToString2(joinDate)}</Text>
                </Box>
              </InputBox>

              <InputBox>
                <Text>최근 로그인</Text>
                <Box flex='0.8'>
                  <Text>{dateToString(lastLoginDate)} - {dateToString2(lastLoginDate)}</Text>
                </Box>
              </InputBox>

              <InputBox>
                <Text>포인트</Text>
                <Box flex='0.8'>
                  <Text>{numberToString(point)} 점</Text>
                </Box>
              </InputBox>

              <InputBox>
                <Text>닉네임</Text>
                <Input value={name} onChange={(v) => setName(v.target.value)}/>
              </InputBox>

              <InputBox>
                <Text>이미지</Text>
                <Input value={image} onChange={(v) => setImage(v.target.value)}/>
              </InputBox>

              {!(props.user.level === 1 && level === 1) && level !== 2 && 
              <InputBox>
                <Text>등급</Text>
                <Box flex='0.8' style={{display:'flex'}}>
                  {props.user.level === 2 &&
                    <Label><input type="radio" id="level" value="1" checked={level === 1}
                              onChange={(e) => setLevel(parseInt(e.target.value))}
                    /> 관리자</Label>
                  }

                  <Label><input type="radio" id="level" value="0" checked={level === 0}
                            onChange={(e) => setLevel(parseInt(e.target.value))}
                  /> 일반</Label>

                  <Label><input type="radio" id="level" value="-1" checked={level === -1}
                            onChange={(e) => setLevel(parseInt(e.target.value))}
                  /> 정지</Label>
                </Box>
              </InputBox>
              }

                {level === -1 && <>
                  <InputBox>
                    <Text>정지사유</Text>
                    <Input value={banReason} onChange={(v) => setBanReason(v.target.value)}/>
                  </InputBox>

                  <InputBox>
                    <Number type='number' />
                    <NumberString> 년 </NumberString>
                    <Number type='number' />
                    <NumberString>개월</NumberString>
                    <Number type='number' />
                    <NumberString> 일 </NumberString>
                  </InputBox>
                </>}
                {banDate > 0 && <>
                  <InputBox>
                    <Text>정지일자</Text>
                    <Box flex='0.8'>
                      <Text>{dateToString(banDate)}</Text>
                    </Box>
                  </InputBox>
                  <InputBox>
                    <Text>해제일자</Text>
                    <Box flex='0.8'>
                      <Text>{dateToString(releaseDate)}</Text>
                    </Box>
                  </InputBox>
                </>}

              <InputBox>
                <Button onClick={onSubmit}>수정</Button>
              </InputBox>
            </Box>
          </BoxContainer>
        </Container>
      </> : <Loading size='72'/>}
      
    </div>
  )
}

export default User

const Container = styled.div`
  padding: 40px;
`
const Title = styled.h1`
  margin: 0;
`
const BoxContainer = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  margin: 50px auto;
`
const Box = styled.div`
  flex: ${(props) => props.flex};
  text-align: center;
`
const StyledAvatar = styled(Avatar)`
  width: 200px !important;
  height: 200px !important;
  margin: auto;
  border: 1px solid grey;
`
const InputBox = styled.div`
  display: flex;
  align-items: center;
`
const Text = styled.h4`
  flex: 0.2;
  text-align: center;
  margin: 15px 0;
`
const Input = styled.input`
  flex: 0.8;
  height: 30px;
  margin: 5px 0;
  padding-left: 5px;
  border: 1px solid lightgrey;
  &:focus {
    outline: 2px solid #20B2AA;
  }
`
const Label = styled.label`
  flex: 0.2;
`
const Button = styled.button`
  width: 75px;
  height: 50px;
  margin: auto;
  border: none;
  transition-duration: 0.4s;
  background-color: #00C851;
  &:hover {
    color: white;
    background-color: #007E33;
  }
`
const Number = styled.input`
  flex: 0.1;
  height: 30px;
  margin: 10px 0;
  padding-left: 5px;
  border: 1px solid lightgrey;
  &:focus {
    outline: 2px solid #20B2AA;
  }
`
const NumberString = styled.h4`
  flex: 0.2;
  text-align: center;
  padding: 0 10px;
`