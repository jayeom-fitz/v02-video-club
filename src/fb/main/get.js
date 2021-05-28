import { storeService } from '../f'

export async function getUserCount() {
  var count;

  await storeService.collection('main').doc('info')
    .get().then(function (doc) {
      count = doc.data().userCount;
    })
  
  return count;
}

export async function isPossibleName(name) {
  var check = false;

  await storeService.collection('main').doc('check').collection('nameFilter')
    .get().then(function (snapshot) {
      snapshot.forEach(function (doc) {
        if(name.toLowerCase().includes(doc.data().value.toLowerCase()))
          check = true;
      })
    })
  
  return check;
}