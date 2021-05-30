import { v4 as uuidv4 } from 'uuid';

import { storeService } from '../f'

export async function writeBoardPosting(data) {
  await storeService.collection('board').doc(`${uuidv4()}`)
    .set({ ...data });
}

export async function updateBoardPosting(id, data) {
  await storeService.collection('board').doc(id)
    .update({ ...data });
}