import { storeService } from '../f'

// 유저 수 가져오기
export async function getUserCount() {
  var count;

  await storeService.collection('main').doc('info')
    .get().then(function (doc) {
      count = doc.data().userCount;
    })
  
  return count;
}

// 닉네임 사용 불가 단어 체크
export async function isPossibleName(name) {
  var check = false;

  await storeService.collection('main').doc('check').collection('nameFilter')
    .get().then(function (snapshot) {
      snapshot.forEach(function (doc) {
        if(name.toLowerCase().includes(doc.data().value.toLowerCase()))
          check = true;
      })
    })
  
  return check;
}

// 카테고리 목록 가져오기
export async function getKategories() {
  var data;

  await storeService.collection('main').doc('kategorie').collection('kategories')
    .get().then(function (snapshot) {
      snapshot.forEach(function (doc) {
        data.push({
          id : doc.id, ...doc.data()
        })
      })
    })
  
  return data;
}