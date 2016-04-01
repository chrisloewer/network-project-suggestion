
function sendPacket(ipAddress, deviceId, command){
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      console.log(xmlHttp.responseText);
  };
  xmlHttp.open("GET", 'http://'+ ipAddress +'/arduino/'+ deviceId +'/'+ command, true); // true for asynchronous
  xmlHttp.send(null);
}
