
// ------------------------------------- SUBJECT - OBSERVER SETUP ------------------------------ //

// SUBJECT BASE CLASS
// Keeps track of subscribed observers
function Subject() {
  this._observerList = [];
}

Subject.prototype.attachObserver = function(observer) {
  this._observerList.push(observer);
};

Subject.prototype.detachObserver = function(observer) {
  var len = this._observerList.length;
  for (var i= 0; i<len; i++) {
    if (this._observerList[i] === observer) {
      this._observerList.splice(i,1);
      return true;
    }
  }
  // else observer not in list
  return false;
};

Subject.prototype.updateObservers = function(args) {
  if(args === void 0) {
    args = {};
  }

  var len = this._observerList.length;
  for (var i= 0; i<len; i++) {
    this._observerList[i].update(args);
  }
};

// OBSERVER BASE CLASS
// Each component will expand on this base
function Observer() {}

Observer.prototype.toString = function() {
  return 'Basic Observer';
};

Observer.prototype.update = function(args) {
  if(args === void 0) {
    args = {};
  }

  console.log('Generic Observer update called');
};


// ------------------------------------- BASE CLASS DEFINITIONS -------------------------------- //

// CONTEXT ---------------------------------------------------------------
// Context is the base class of this app and tracks observers
function Context() {

  var subject = new Subject();

  this.attachObserver = function attachObserver(observer) {
    subject.attachObserver(observer);
  };

  this.detachObserver = function detachObserver(observer) {
    subject.detachObserver(observer);
  };

  this.updateObservers = function update(args) {
    if (args === void 0) {
      args = {};
    }
    subject.updateObservers(args);
  };
}

// SWITCH ----------------------------------------------------------------
// Switch is parent of each 'smart switch' component
function Switch(Obj) {
  if(Obj === void 0) {
    Obj = {};
  }

  Obj.name !== void 0 ? this.name = Obj.name : this.name = 'genericSwitch';
  Obj.ipAddr !== void 0 ? this.ipAddr = Obj.ipAddr : this.ipAddr = '127.0.0.1';
  Obj.deviceNum !== void 0 ? this.deviceNum = Obj.deviceNum : this.deviceNum = 'deviceNum';
  Obj.state !== void 0 ? this.state = Obj.state : this.state = false;
}

// returns DOM element for a switch
Switch.prototype.createElement = function () {

  var container = document.createElement('div');
  addClass(container,'switch');

  var leftDiv = document.createElement('div');
  addClass(leftDiv, 'info');
  var nameNode = document.createElement('div');
  addClass(nameNode, 'info-node');
  addClass(nameNode, 'name');
  var ipNode = document.createElement('div');
  addClass(ipNode, 'info-node');
  addClass(ipNode, 'ip');
  var delNode = document.createElement('div');
  addClass(delNode, 'info-node');
  addClass(delNode, 'delete');
  nameNode.appendChild(document.createTextNode(this.name));
  ipNode.appendChild(document.createTextNode(this.ipAddr + ' --> ' + this.deviceNum));
  delNode.appendChild(document.createTextNode('Delete'));
  leftDiv.appendChild(nameNode);
  leftDiv.appendChild(ipNode);
  leftDiv.appendChild(delNode);
  container.appendChild(leftDiv);

  var stateStr;
  this.state ? stateStr = 'on' : stateStr = 'off';
  var rightDiv = document.createElement('div');
  addClass(rightDiv, 'actions');
  var button = document.createElement('button');
  button.appendChild(document.createTextNode(stateStr));
  addClass(button, stateStr);
  rightDiv.appendChild(button);
  container.appendChild(rightDiv);

  var s = this;

  // Toggle State
  button.addEventListener('click', function() {
    s.state = !s.state;

    if(s.state){
      sendPacket(s.ipAddr, s.deviceNum, 'on');
    }
    else {
      sendPacket(s.ipAddr, s.deviceNum, 'off');
    }

    componentObserver.updateContext();
  });

  // Delete switch
  delNode.addEventListener('click', function() {
    console.log('delete');
    componentObserver.removeSwitch(s);
  });

  return container;
};


// ------------------------------------- INITIALIZE PAGE --------------------------------------- //

var context = new Context();
var storageObserver = new Observer();
var componentObserver = new Observer();

window.onload = function() {
  context.attachObserver(storageObserver);
  context.attachObserver(componentObserver);

  storageObserver.updateContext();
  //context.updateObservers();
};


// ------------------------------------- COMPONENT FUNCTIONALITY ------------------------------- //

(function() {

  var switchList = [];

  function init() {
    document.getElementById('add_button').addEventListener('click', addSwitch);
  }

  function addSwitch() {
    console.log('addSwitch()');

    var nameField = document.getElementById('name_input').value;
    var ipField = document.getElementById('ip_input').value;
    var deviceField = document.getElementById('device_input').value;

    if(nameField == '' || ipField == '' || deviceField == ''){
      return false;
    }

    switchList.push( new Switch(
      {
        'name': nameField,
        'ipAddr': ipField,
        'deviceNum': deviceField,
        'state': false
      }));

    document.getElementById('name_input').value = '';
    document.getElementById('ip_input').value = '';

    componentObserver.updateContext();
  }

  componentObserver.removeSwitch = function(s) {
    var i = switchList.indexOf(s);
    if(i != -1) {
      switchList.splice(i, 1);
      componentObserver.updateContext();
    }
  };

  // Observer Functionality
  componentObserver.toString = function() {
    return 'componentObserver';
  };

  componentObserver.update = function(args) {
    // console.log('componentObserver.update()');
    if(args === void 0) {
      args = {};
    }

    // Reset
    switchList = [];
    var containerDiv = document.getElementById('list_container');
    removeChildNodes(containerDiv);

    // Draw switches
    if(args.switchList !== void 0 && args.switchList.length > 0) {
      for(var i=0; i<args.switchList.length; i++) {
        switchList.push(args.switchList[i]);
        var domSwitch = args.switchList[i].createElement();
        containerDiv.insertBefore(domSwitch, containerDiv.firstChild);
      }
    }

    init();
  };

  componentObserver.updateContext = function() {
    //console.log('componentObserver.updateContext()');
    var args = {
      'switchList': switchList
    };

    context.updateObservers(args);
  };

})();


// ------------------------------------- STORAGE FUNCTIONALITY --------------------------------- //

(function() {

  storageObserver.toString = function() {
    return 'storageObserver';
  };

  storageObserver.update = function(args) {
    // console.log('storageObserver.update()');
    if(args === void 0) {
      args = {};
    }

    if(args.switchList !== void 0 && args.switchList.length > 0) {
      localStorage.setItem('switchList', JSON.stringify(args.switchList));
    }
  };

  storageObserver.updateContext = function() {
    //console.log('storageObserver.updateContext()');

    var list = [];
    try{
      // Convert from json string to array of Switches
      var objList = JSON.parse(localStorage.getItem('switchList'));
      for(var i=0; i<objList.length; i++) {
        list.push(new Switch(objList[i]));
      }
    }
    catch (e) {
      console.log('Error parsing local storage: ' + e);
    }

    var data = {
      'switchList': list
    };
    context.updateObservers(data);
  };

})();

