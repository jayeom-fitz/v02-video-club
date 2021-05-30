exports.numberToString = function (number) {
  number = parseInt(number);
  var v = number % 1000; number = parseInt(number/1000);
  for(;number !== 0; number = parseInt(number/1000)) {
    v = number % 1000 + ',' + v;
  }
  return v;
}