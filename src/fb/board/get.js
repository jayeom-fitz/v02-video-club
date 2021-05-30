import { storeService } from '../f'

export async function getPostingsByBoardName(board) {
  var data = [];

  await storeService.collection('board').where('board', '==', `${board}`)
    .where('active', '==', true).orderBy('registDate', 'desc')
    .get().then(function (snapshot) {
      snapshot.forEach(function (doc) {
        data.push({
          id: doc.id, ...doc.data()
        })
      })
    })
  
  return data;
}