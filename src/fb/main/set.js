import { storeService } from '../f'
import { getKategories, getKategorieSizeByActive, getUserCount } from './get';

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

// 카테고리 active 전환
export async function toggleKategorieActive(id, active) {
  const number = await getKategorieSizeByActive(active) + 1;
  
  await storeService.collection('main').doc('kategorie').collection('kategories')
    .doc(id).update({
      active, number
    })

  await setStraightNumberKategorieByActive(!active);
}

// 카테고리 active 에 따른 넘버링 정리
export async function setStraightNumberKategorieByActive(active) {
  const data = await getKategories(active);

  for(var i=1; i<=data.length; i++) {
    if(data[i-1].number !== i) {
      await storeService.collection('main').doc('kategorie').collection('kategories')
        .doc(data[i-1].id).update({
          number : i
        })
    }
  } 
}

// 카테고리 넘버 교환
export async function setChangeNumberKategorie(data1, data2) {
  const number = data1.number; data1.number = data2.number; data2.number = number;

  await storeService.collection('main').doc('kategorie').collection('kategories')
    .doc(data1.id).update({
      number : data1.number
    })

  await storeService.collection('main').doc('kategorie').collection('kategories')
    .doc(data2.id).update({
      number : data2.number
    })
}