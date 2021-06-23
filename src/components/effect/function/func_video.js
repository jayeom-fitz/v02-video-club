exports.getVideoIdByLink = function (link) {
  if(link.substring(0, 8) !== 'https://') return null; 
  
  link = link.substring(8);

  if(link.substring(0, 22) === 'www.youtube.com/watch?') {
    link = link.substring(22).split('&');
    
    for(var i=0; i<link.length; i++) {
      if(link[i][0] === 'v') {
        return {
          platform : 'youtube', id : link[i].substring(2)
        }
      }
    }

    return null;
  } else if(link.substring(0, 33) === 'vod.afreecatv.com/PLAYER/STATION/') {
    return {
      platform : 'afreecatv', id : link.substring(33)
    }
  } else return null;
}