var EXPORTED_SYMBOLS = [];

const Cc = Components.classes;
const Ci = Components.interfaces;

Components.utils.import("resource://IdentityManager/common.js");

/**
 * A very simple counter.
 */
AddressBookMultiAccountsManager.ScanDetect = {

  /* Preference object for the message count*/
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

  getScan:function(){ return this._scan.value;},
  
  /**
   * Increments the message count by one.
   */
  setScan : function(val) {
    this._scan.value = val;
  }

};

// Constructor.
(function() { this._init(); }).
  apply(AddressBookMultiAccountsManager.ScanDetect);
