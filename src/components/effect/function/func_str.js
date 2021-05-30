exports.lineFeedEncoding = function (str) {
  return str.replace(/\n/gi, '#vc_lf#');
}

exports.lineFeedDecoding = function (str) {
  return str.replace(/#vc_lf#/gi, '\n');
}