import { v4 as uuidv4 } from 'uuid';

import { storeService } from '../f'

// 글 작성
export async function writeCommentPosting(data) {
  const id = `${uuidv4()}`;

  await storeService.collection('comment').doc(id)
    .set({ ...data });
  
  return {id, ...data};
}