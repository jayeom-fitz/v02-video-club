const { isPossibleName } = require("fb/main/get");

exports.userNameFilter = async function (name) {
  var check = await isPossibleName(name);

  if(check) return true;

  if(name.length < 1 || name.length > 16) return true;

  return false;
}