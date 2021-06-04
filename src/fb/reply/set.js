import { setUserPointUp } from 'fb/users/set';
import { v4 as uuidv4 } from 'uuid';

import { storeService } from '../f'

// 댓글 작성
export async function writeReply(data) {
  await storeService.collection('reply').doc(`${uuidv4()}`)
    .set({ ...data });
}

// 댓글 업데이트
export async function updateReply(id, data) {
  await storeService.collection('reply').doc(id)
    .update({ ...data });
}

// 댓글 삭제 (active true -> false) 비활성화
export async function deleteBoardPosting(id) {
  await storeService.collection('reply').doc(id)
    .update({active : false});
}