

exports.setTitleByPageName = function (pageName) {
  switch(pageName) {
    case 'notice' : return '공지사항';
    default : return;
  }
}

exports.setPostingLevelByPageName = function (pageName) {
  switch(pageName) {
    case 'notice' : return 1;
    default : return;
  }
}