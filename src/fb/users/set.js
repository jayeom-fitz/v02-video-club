import { storeService } from '../f'
import { getUserPoint, getUserReportCount } from './get';

// 유저 데이터 업데이트
export async function setUserData(id, data) {
  await storeService.collection('users').doc(id)
    .update({ ...data });
}

// 유저 밴 해제
export async function setUserRelease(id) {
  await storeService.collection('users').doc(id)
    .update({
      level : 0,
      banDate : 0,
      banReason : '',
      releaseDate : 0
     });
}

// 유저 포인트 증가
export async function setUserPointUp(id, p) {
  var point = await getUserPoint(id);

  await storeService.collection('users').doc(id)
    .update({ point : point + p });
}

// 유저 신고 횟수 증가
export async function setUserReportCountUp(id) {
  var reportCount = await getUserReportCount(id);

  await storeService.collection('users').doc(id)
    .update({ reportCount : reportCount + 1 });
}
