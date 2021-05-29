import { storeService } from '../f'

export async function setUserData(id, data) {
  await storeService.collection('users').doc(id)
    .update({ ...data });
}

export async function setUserRelease(id) {
  await storeService.collection('users').doc(id)
    .update({
      level : 0,
      banDate : 0,
      banReason : '',
      releaseDate : 0
     });
}