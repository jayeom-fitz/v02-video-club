import { v4 as uuidv4 } from 'uuid';

import { storeService } from '../f'
import { getRecommendCount } from './get';

import { setUserPointUp } from 'fb/users/set';

// 글 작성
export async function writeCommentPosting(data) {
  const id = `${uuidv4()}`;

  await storeService.collection('comment').doc(id)
    .set({ ...data });
  
  return {id, ...data};
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