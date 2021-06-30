import { v4 as uuidv4 } from 'uuid';

import { storeService } from '../f'
import { getCommentCount } from './get';

// 코멘트 등록
export async function setComment(id) {
  await storeService.collection('video').doc(id)
    .set({ 
      commentCount : 0,
      likeCount : 0, disLikeCount : 0,
    });
}

// 코멘트 갯수 증가
export async function setCommentCountUp(id) {
  var data = await getCommentCount(id);

  if(data === -1) {
    await setComment(id); data = 0;
  }

  await storeService.collection('video').doc(id)
    .update({ 
      commentCount : data + 1
    });
}
