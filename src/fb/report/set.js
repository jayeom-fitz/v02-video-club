import { storeService } from '../f'

import { v4 as uuidv4 } from 'uuid';

// 신고 작성
export async function writeReport(data) {
  const id = uuidv4();

  await storeService.collection('report').doc(id)
    .set({ ...data });

  return id;
}