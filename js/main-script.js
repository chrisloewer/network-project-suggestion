
// ------------------------------------- CLASS DEFINITIONS -------------------------------- //

// CONTEXT ---------------------------------------------------------------
// Context is the base class of this app

function Context() {
  switchList = [];
  this._observerList = [];
}

// Load switchesList from Storage
Context.prototype.loadSwitches = function() {
  console.log('Context.loadSwitches()');

  // TODO get switchesList from Storage
  // TODO update AppComponents (displayed items)
};

// Called when switch is changed - update corresponding switch in Context
Context.prototype.updateContext = function(switchObj) {
  console.log('Context.updateContext()');

  // TODO update switchList
  // TODO storeSwitches in Storage
  // TODO update AppComponents (displayed items)
};

Context.prototype.clearContext = function() {
  console.log('Context.clearContext()');

  // TODO clear Storage
  // TODO update AppComponents (displayed items)
};

// Retrieves data from Storage
Context.prototype.getInfo = function() {
  console.log('Context.getInfo()');

  // TODO get json from Storage
  // TODO update AppComponents (displayed items)
};

// Called after Context changes - update AppComponents with data in Context
Context.prototype.updateInfo = function(jsonObj) {
    console.log('Context.updateInfo()');

  // TODO update AppComponents (displayed items)
};


Context.prototype.storeSwitches = function() {
  console.log('Context.storeSwitches()');

  // TODO setSwitches in Storage
};

// Add observer functionality
Context.prototype.attachObserver = function(observer) {
  this._observerList.push(observer);
};

Context.prototype.detachObserver = function(observer) {
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

Context.prototype.updateObservers = function(args) {
  if(args === void 0) {
    args = {};
  }

  var len = this._observerList.length;
  for (var i= 0; i<len; i++) {
    this._observerList[i].update(args);
  }
};


// COMPONENTS ------------------------------------------------------------
// Components keeps track of GUI and observes Context for changes

function Components() {}

// sets all switches to list in Context
Components.prototype.update = function(args) {
  console.log('Components.update()');
  if(args === void 0) {
    args = {};
  }

  // TODO get each item in switchList in Context
  // TODO redraw display according to new items
};

// Let context know there was a change
Components.prototype.updateContext = function() {
  console.log('Components.updateContext()');

  // TODO update Context that there was a change to one of the components
};


// SWITCH ----------------------------------------------------------------
// Switch is parent of each 'smart switch' component

function Switch(name, ipAddr, state) {
  this.name = name;
  this.ipAddr = ipAddr;
  this.state = state;
  this.timeStamp = new Date().getTime();
}

// Remove this particular switch
Switch.prototype.delete = function() {
  console.log('Switch.delete()');

  // TODO delete switch
  // TODO let Components know this list is to be deleted
};

// flip this particular switch on/off
Switch.prototype.toggleState = function() {
  console.log('Switch.toggleState');

  // TODO toggle switch state
  // TODO let Components know the switch changed
};

Switch.prototype.draw = function () {
  console.log('Switch.draw()');

  // TODO display switch component based on info given
};


// STORAGE ---------------------------------------------------------------
// Storage deals with writing our data to localStorage and observes Context for changes

function Storage() {}

Storage.prototype.update = function (args) {
  console.log('Storage.update()');
  if(args === void 0) {
    args = {};
  }

  // TODO set localStorage appropriately to reflect args
};

Storage.prototype.updateContext = function() {
  console.log('Storage.updateContext()');

  // TODO update Context with the data stored in localStorage
};
