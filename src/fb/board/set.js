import { setUserPointUp } from 'fb/users/set';
import { v4 as uuidv4 } from 'uuid';

import { storeService } from '../f'
import { getPostingById, getReplyCount, isClickedUp } from './get';

// 게시글 작성
export async function writeBoardPosting(data) {
  await storeService.collection('board').doc(`${uuidv4()}`)
    .set({ ...data });
}

// 게시글 업데이트
export async function updateBoardPosting(id, data) {
  await storeService.collection('board').doc(id)
    .update({ ...data });
}

// 게시글 삭제 (active true -> false) 비활성화
export async function deleteBoardPosting(id) {
  await storeService.collection('board').doc(id)
    .update({active : false});
}

// 게시글 추천 수 증가
export async function plusUp(bid, pid) { 
  var check = await isClickedUp(bid, pid);

  if(check) return -1;

  await storeService.collection('board').doc(bid).collection('upClicked')
    .doc(pid).set({
      clickedDate: Date.now()
    })

  var data = await getPostingById(bid);

  data.ups = data.ups + 1;
  await updateBoardPosting(bid, data);

  await setUserPointUp(data.pid, 1);

  return data.ups;
}

// 게시글 댓글 수 변화
export async function updateReplyCount(id, value) { 
  var count = await getReplyCount(id);
  count = count + value;

  await storeService.collection('board').doc(id)
    .update({
      replyCount: count
    })
}