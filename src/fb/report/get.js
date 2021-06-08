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