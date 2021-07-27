import { v4 as uuidv4 } from 'uuid';

import { storeService } from '../f'
import { getReplyUps } from './get';
import { setUserPointUp } from 'fb/users/set';

// 댓글 작성
export async function writeReply(data) {
  const id = uuidv4();

  await storeService.collection('reply').doc(id)
    .set({ ...data });

  return id;
}

// 댓글 업데이트
export async function updateReply(id, data) {
  await storeService.collection('reply').doc(id)
    .update({ ...data });
}

// 댓글 삭제 (active true -> false) 비활성화
export async function deleteReply(id) {
  await storeService.collection('reply').doc(id)
    .update({active : false});
}

// 댓글 내용 업데이트
export async function updateReplyContent(id, content) {
  await storeService.collection('reply').doc(id)
    .update({ content });
}

// 댓글 추천 수 업데이트
export async function updateReplyUps(id, ups) {
  await storeService.collection('reply').doc(id)
    .update({ ups });
}

// 댓글 누른 사람 추가
export async function addReplyUpClickedUser(rid, pid) {
  await storeService.collection('reply').doc(rid).collection('upClicked')
    .doc(pid).set({
      clickedDate: Date.now()
    })
}

// 추천
export async function replyRecommend(data, uid) {
  data.ups = await getReplyUps(data.id) + 1;

  await updateReplyUps(data.id, data.ups);

  await addReplyUpClickedUser(data.id, uid);

  setUserPointUp(data.pid, 1);
  
  return data;
}