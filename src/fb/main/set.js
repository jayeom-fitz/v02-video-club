import { storeService } from '../f'
import { getUserCount } from './get';

export async function userCountUp() {
  var count = await getUserCount();

  await storeService.collection('main').doc('info')
    .update({
      userCount : count
    })
}