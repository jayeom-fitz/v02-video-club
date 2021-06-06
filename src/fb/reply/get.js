import { storeService } from '../f'

// post id 에 대한 댓글 가져오기
export async function getReplysByPostId(id) {
  var data = [];

  await storeService.collection('reply').where('postId', '==', `${id}`)
    .where('active', '==', true).orderBy('registDate', 'desc')
    .get().then(function (snapshot) {
      snapshot.forEach(function (doc) {
        data.push({
          id: doc.id, ...doc.data()
        })
      })
    })
  
  return data;
}

// 추천 눌렀는지 체크
export async function isClikedLike(rid, pid) {
  var data = false;
  
  await storeService.collection('reply').doc(rid).collection('upClicked')
    .doc(pid).get().then(function (doc) {
      if(doc.exists) {
        data = true;
      }
    })

  return data;
}

// 추천 갯수 가져오기
export async function getReplyUps(id) {
  var data;
  
  await storeService.collection('reply').doc(id)
    .get().then(function (doc) {
      data = doc.data().ups;
    })

  return data;
}