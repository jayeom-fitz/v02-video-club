import { v4 as uuidv4 } from 'uuid';

import { storeService } from '../f'

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