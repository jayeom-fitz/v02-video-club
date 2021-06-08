import { storeService } from '../f'

// 게시판 이름에 대한 게시글 가져오기
export async function getPostingsByBoardName(board) {
  var data = [];

  await storeService.collection('board').where('board', '==', `${board}`)
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

// 게시글 id로 게시글 가져오기
export async function getPostingById(id) {
  var data;

  await storeService.collection('board').doc(id)
    .get().then(function (doc) {
      data = { id, ...doc.data() }
    })
  
  return data;
}

// 해당 유저(pid)가 게시글(bid) 추천 버튼 눌렀는 지
export async function isClickedUp(bid, pid) {
  var data = false;
  
  await storeService.collection('board').doc(bid).collection('upClicked')
    .doc(pid).get().then(function (doc) {
      if(doc.exists) {
        data = true;
      }
    })

  return data;
}

// 댓글 갯수 가져오기
export async function getReplyCount(id) {
  var data;
  
  await storeService.collection('board').doc(id)
    .get().then(function (doc) {
      data = doc.data().replyCount
    })

  return data;
}