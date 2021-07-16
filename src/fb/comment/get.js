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