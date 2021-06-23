exports.setTitleByPageName = function (pageName) {
  switch(pageName) {
    case 'notice' : return '공지사항';
    case 'suggest' : return '건의사항';
    default : return;
  }
}

exports.setPostingLevelByPageName = function (pageName) {
  switch(pageName) {
    case 'notice' : return 1;
    case 'suggest' : return 0;
    default : return;
  }
}