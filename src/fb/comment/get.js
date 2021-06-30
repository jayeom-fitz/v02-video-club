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