
function sendPacket(ipAddress, deviceId, command){
  var url = 'http://'+ ipAddress +'/arduino/'+ deviceId +'/'+ command;

  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      console.log(xmlHttp.responseText);
  };
  xmlHttp.open("GET", url, true); // true for asynchronous
  //xmlHttp.setRequestHeader( 'Access-Control-Allow-Origin', '*' );
  xmlHttp.send(null);

}
