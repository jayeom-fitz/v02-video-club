import  { AiFillHome, AiFillFire, AiFillNotification } from 'react-icons/ai';
import  { HiOutlineClipboardCopy } from 'react-icons/hi';

export const SidebarData = [
  {
    title: '홈',
    path: '/',
    icon: AiFillHome
  },
  {
    title: '공지',
    path: '/board/notice',
    icon: AiFillNotification
  },  
  {
    title: '인기',
    path: '/',
    icon: AiFillFire
  },  
  {
    title: '건의',
    path: '/board/suggest',
    icon: HiOutlineClipboardCopy
  },  
  // {
  //   title: 'TEST',
  //   path: '#',
  //   subNav: [
  //     {
  //       title: 'TEST 1',
  //       path: '#'
  //     },
  //     {
  //       title: 'TEST 2',
  //       path: '#'
  //     },
  //     {
  //       title: 'TEST 3',
  //       path: '#'
  //     },
  //     {
  //       title: 'TEST 4',
  //       path: '#'
  //     },
  //   ]
  // },
]