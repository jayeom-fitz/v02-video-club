const { isPossibleName } = require("fb/main/get");

exports.dateToString = function (time) {
  var date = new Date(time).toString().split(' ');
  var month;
  switch (date[1]) {
    case 'Jan': month = 1; break;
    case 'Feb': month = 2; break;
    case 'Mar': month = 3; break;
    case 'Apr': month = 4; break;
    case 'May': month = 5; break;
    case 'Jun': month = 6; break;
    case 'Jul': month = 7; break;
    case 'Aug': month = 8; break;
    case 'Sep': month = 9; break;
    case 'Oct': month = 10; break;
    case 'Nov': month = 11; break;
    default: month = 12; break;
  }
  return date[3] + '. ' + month + '. ' + date[2] + '. ' + date[4];
}

exports.dateToString2 = function (time) {
  var gap = Date.now() - time;

  if(gap < 1000 * 60) { // 1 분 미만
    return Math.floor(gap / 1000) + ' 초 전';
  } else if(gap < 1000 * 60 * 60) { // 1 시간 미만
    return Math.floor(gap / (1000 * 60)) + ' 분 전';
  } else if(gap < 1000 * 60 * 60 * 24) { // 24 시간 미만
    return Math.floor(gap / (1000 * 60 * 60)) + ' 시간 전';
  } else if(gap < 1000 * 60 * 60 * 24 * 7) { // 1 주일 미만
    return Math.floor(gap / (1000 * 60 * 60 * 24)) + ' 일 전';
  } else if(gap < 1000 * 60 * 60 * 24 * 7 * 4) { // 1 개월 미만
    return Math.floor(gap / (1000 * 60 * 60 * 24 * 7)) + ' 주 전';
  } else if(gap < 1000 * 60 * 60 * 24 * 7 * 4 * 12) { // 1 년 미만
    return Math.floor(gap / (1000 * 60 * 60 * 24 * 7 * 4)) + ' 개월 전';
  } else {
    return Math.floor(gap / (1000 * 60 * 60 * 24 * 7 * 4 * 12)) + ' 년 전';
  }
}

exports.numberToString = function (number) {
  number = parseInt(number);
  var v = number % 1000; number = parseInt(number/1000);
  for(;number !== 0; number = parseInt(number/1000)) {
    v = number % 1000 + ',' + v;
  }
  return v;
}

exports.userNameFilter = async function (name) {
  var check = await isPossibleName(name);

  if(check) return true;

  if(name.length < 1 || name.length > 16) return true;

  return false;
}