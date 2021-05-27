import { storeService } from '../f'

export async function getUsersByLevel(sign, level) {
  var array = [];

  await storeService.collection('users')
    .where('level', `${sign}`, level)
    .limit(20).get().then(function (snapshot) {
      snapshot.forEach(function (doc) {
        array.push({
          id : doc.id, ...doc.data()
        })
      })
    })
  
  return array;
}

export async function getUsersByLevelAndName(sign, level, name) {
  var array = [];

  await storeService.collection('users')
    .where('level', `${sign}`, level).where('name', '==', `${name}`)
    .limit(20).get().then(function (snapshot) {
      snapshot.forEach(function (doc) {
        array.push({
          id : doc.id, ...doc.data()
        })
      })
    })
  
  return array;
}