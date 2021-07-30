import { v4 as uuidv4 } from 'uuid';

import { storeService } from '../f'
import { getRecommendCount, getReplyCount } from './get';

import { setUserPointUp } from 'fb/users/set';

// 글 작성
export async function writeCommentPosting(data) {
  const id = `${uuidv4()}`;

  await storeService.collection('comment').doc(id)
    .set({ ...data });
  
  return {id, ...data};
}

// 글 삭제 (active true -> false) 비활성화
export async function deleteComment(id) {
  await storeService.collection('comment').doc(id)
    .update({active : false});
}

// 추천
export async function commentRecommend(data, uid) {
  data.ups = await getRecommendCount(data.id) + 1;

  await storeService.collection('comment').doc(data.id)
    .update({ ups : data.ups });

  await storeService.collection('comment').doc(data.id)
    .collection('recommended').doc(uid)
    .set({
      registDate : Date.now()
    })

  setUserPointUp(data.pid, 1);
  
  return data;
}

// 게시글 댓글 수 변화
export async function updateReplyCount(id, value) { 
  var count = await getReplyCount(id);
  count = count + value;

  await storeService.collection('comment').doc(id)
    .update({
      replyCount: count
    })
}