import { storeService } from '../f'

// id 로 유저 정보 가져오기
export async function getUserById(id) {
  var data;

  await storeService.collection('users').doc(id)
    .get().then(function (doc) {
      data = {
        id : doc.id, ...doc.data()
      }
    })
  
  return data;
}

// 관리 레벨에 따른 유저 정보 가져오기
export async function getUsersByLevel(sign, level) {
  var array = [];

  await storeService.collection('users')
    .where('level', `${sign}`, level)
    .limit(50).get().then(function (snapshot) {
      snapshot.forEach(function (doc) {
        array.push({
          id : doc.id, ...doc.data()
        })
      })
    })
  
  return array;
}

// 부등호, 레벨, 이름으로 유저 정보 가져오기
export async function getUsersByLevelAndName(sign, level, name) {
  var array = [];

  await storeService.collection('users')
    .where('level', `${sign}`, level).where('name', '==', `${name}`)
    .limit(50).get().then(function (snapshot) {
      snapshot.forEach(function (doc) {
        array.push({
          id : doc.id, ...doc.data()
        })
      })
    })
  
  return array;
}

// 이름으로 유저 id 검색 (중복 검사)
export async function isDuplicatedByName(name) {
  var id;

  await storeService.collection('users').where('name', '==', `${name}`)
    .get().then(function (snapshot) {
      snapshot.forEach(function (doc) {
        id = doc.id;
      })
    })
  
  return id;
}

// 유저의 점수 가져오기
export async function getUserPoint(id) {
  var point;

  await storeService.collection('users').doc(id)
    .get().then(function (doc) {
      point = doc.data().point;
    })
  
  return point;
}

// 유저의 신고 당한 횟수 가져오기
export async function getUserReportCount(id) {
  var reportCount;

  await storeService.collection('users').doc(id)
    .get().then(function (doc) {
      reportCount = doc.data().reportCount;
    })
  
  return reportCount;
}