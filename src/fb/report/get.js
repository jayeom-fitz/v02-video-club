import { storeService } from '../f'

// 중복된 신고 체크하기
export async function isDuplicatedReport(docId, pid) {
  var check = false;

  await storeService.collection('report')
    .where('docId', '==', `${docId}`)
    .where('pid', '==', `${pid}`)
    .get().then(function (snapshot) {
      if(snapshot.size !== 0) check = true;
    })
  
  return check;
}

// 신고 가져오기
export async function getReportById(id) {
  var data;

  await storeService.collection('report').doc(id).get().then(function (doc) {
    data = {
      id : doc.id, ...doc.data()
    }    
  })
  
  return data;
}

// 신고 목록 가져오기
export async function getReportsByActive(active) {
  var data = [];

  await storeService.collection('report').where('active', '==', active)
    .orderBy('registDate', 'desc')
    .limit(50).get().then(function (snapshot) {
      snapshot.forEach(function (doc) {
        data.push({
          id: doc.id, ...doc.data()
        })
      })
    })
  
  return data;
}