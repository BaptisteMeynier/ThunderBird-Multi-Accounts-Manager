var EXPORTED_SYMBOLS = [];

const Cc = Components.classes;
const Ci = Components.interfaces;

Components.utils.import("resource://AddressBookMultiAccountsManager/common.js");

/**
 * Object to know whether to display the notificationbox to launch a SmartScan, after installing the extension
 */
AddressBookMultiAccountsManager.ScanDetect = {

  /* Boolean allowing to know if SmartScan was launched */
  _scan : null,

  /**
   * Object constructor.
   */
  _init : function() {
    let application =
      Cc["@mozilla.org/steel/application;1"].getService(Ci.steelIApplication);

    this._scan =
      application.prefs.get("addressbookmultiaccountsmanager.scan");
  },
  
  /** 
   * Get
   */ 
  getScan:function(){ return this._scan.value;},
  
  /**
   * Set
   */
  setScan : function(val) {
    this._scan.value = val;
  }

};

// Constructor.
(function() { this._init(); }).
  apply(AddressBookMultiAccountsManager.ScanDetect);
