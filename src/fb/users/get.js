import { storeService } from '../f'

export async function getUserById(id) {
  var data;

  await storeService.collection('users').doc(id)
    .get().then(function (doc) {
      data = {
        id : doc.id, ...doc.data()
      }
    })
  
  return data;
}

export async function getUsersByLevel(sign, level) {
  var array = [];

  await storeService.collection('users')
    .where('level', `${sign}`, level)
    .limit(50).get().then(function (snapshot) {
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
    .limit(50).get().then(function (snapshot) {
      snapshot.forEach(function (doc) {
        array.push({
          id : doc.id, ...doc.data()
        })
      })
    })
  
  return array;
}

export async function isDuplicatedByName(name) {
  var id;

  await storeService.collection('users').where('name', '==', `${name}`)
    .get().then(function (snapshot) {
      snapshot.forEach(function (doc) {
        id = doc.id;
      })
    })
  
  return id;
}