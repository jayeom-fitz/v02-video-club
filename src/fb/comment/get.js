import { storeService } from '../f'

// 최신 코멘트 가져오기
export async function getRecentlyComments() {
  var data = [];

  await storeService.collection('comment')
    .where('active', '==', true).orderBy('registDate', 'desc').limit(10)
    .get().then(function (snapshot) {
      snapshot.forEach(function (doc) {
        data.push({
          id: doc.id, ...doc.data()
        })
      })
    })
  
  return data;
}

// 최신 코멘트 가져오기 More
export async function getMoreRecentlyComments(registDate) {
  var data = [];

  await storeService.collection('comment')
    .where('active', '==', true).orderBy('registDate', 'desc')
    .startAfter(registDate).limit(10)
    .get().then(function (snapshot) {
      snapshot.forEach(function (doc) {
        data.push({
          id: doc.id, ...doc.data()
        })
      })
    })
  
  return data;
}

// 최신 카테고리별 코멘트 가져오기 
export async function getRecentlyCommentsByKategorie(kategorie) {
  var data = [];

  await storeService.collection('comment')
    .where('active', '==', true).where('kategorie', '==', `${kategorie}`)
    .orderBy('registDate', 'desc')
    .limit(10)
    .get().then(function (snapshot) {
      snapshot.forEach(function (doc) {
        data.push({
          id: doc.id, ...doc.data()
        })
      })
    })
  
  return data;
}

// 최신 카테고리별 코멘트 가져오기 More
export async function getMoreRecentlyCommentsByKategorie(kategorie, registDate) {
  var data = [];

  await storeService.collection('comment')
    .where('active', '==', true).where('kategorie', '==', `${kategorie}`)
    .orderBy('registDate', 'desc')
    .startAfter(registDate).limit(10)
    .get().then(function (snapshot) {
      snapshot.forEach(function (doc) {
        data.push({
          id: doc.id, ...doc.data()
        })
      })
    })
  
  return data;
}

// 좋아요 눌렀는지 체크
export async function isClickedRecommend(commentId, userId) {
  var check;

  await storeService.collection('comment').doc(commentId)
    .collection('recommended').doc(userId)
    .get().then(function (doc) {
      check = doc.exists;
    })
  
  return check;
}

// 추천 수 가져오기
export async function getRecommendCount(id) {
  var count;

  await storeService.collection('comment').doc(id)
    .get().then(function (doc) {
      count = doc.data().ups;
    })
  
  return count;
}