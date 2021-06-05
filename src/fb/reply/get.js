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