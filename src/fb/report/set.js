import { storeService } from '../f'

import { v4 as uuidv4 } from 'uuid';
import { getReportsByDocId } from './get';

// 신고 작성
export async function writeReport(data) {
  const id = uuidv4();

  await storeService.collection('report').doc(id)
    .set({ ...data });

  return id;
}

// 신고 단일 처리
export async function processReport(id, processContent, processor) {
  const processDate = Date.now();

  await storeService.collection('report').doc(id)
    .update({
      active: false,
      processContent,
      processDate,
      ...processor
    });
}

// 신고 전체 처리
export async function processReports(docId, processContent, processor) {
  const data = await getReportsByDocId(docId);
  const processDate = Date.now();

  for(var i=0; i<data.length; i++) {
    await storeService.collection('report').doc(data[i])
      .update({
        active: false,
        processContent,
        processDate,
        ...processor
      });
  }
}