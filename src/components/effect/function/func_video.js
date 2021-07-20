exports.getVideoIdByLink = function (link) {
  if(link.substring(0, 8) !== 'https://') return null; 
  
  link = link.substring(8);

  if(link.substring(0, 22) === 'www.youtube.com/watch?') {
    link = link.substring(22).split('&');
    
    for(var i=0; i<link.length; i++) {
      if(link[i][0] === 'v') {
        if(link[i].substring(2).length !== 11) return null;
        
        return {
          platform : 'youtube', id : link[i].substring(2)
        }
      }
    }

    return null;
  } else return null;
}

exports.getVideoLinkForIframeByIdAndPlatform = function (id, platform) {
  switch(platform) {
    case 'youtube' : 
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    default :
      return null;
  }
}

exports.getImageLinkByIdAndPlatform = function (id, platform) {
  switch(platform) {
    case 'youtube' : 
      return `http://img.youtube.com/vi/${id}/0.jpg`;
    default :
      return null;
  }
}

exports.getVideoLinkByIdAndPlatform = function (id, platform) {
  switch(platform) {
    case 'youtube' : 
      return `https://www.youtube.com/watch?v=${id}`;
    default :
      return null;
  }
}