import { storeService } from '../f'
import { getUserCount } from './get';

// 유저 수 증가
export async function userCountUp() {
  var count = await getUserCount();

  await storeService.collection('main').doc('info')
    .update({
      userCount : count
    })
}

// 카테고리 등록
export async function registKategorie(id, data) {
  await storeService.collection('main').doc('kategorie').collection('kategories')
    .doc(id).set({
      ...data
    })
}