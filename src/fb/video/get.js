import { storeService } from '../f'

// 코멘트 갯수 가져오기
export async function getCommentCount(id) {
  var data;
  
  await storeService.collection('video').doc(id)
    .get().then(function (doc) {
      data = doc.data().commentCount
    }).catch(function () {
      data = -1;
    })

  return data;
}