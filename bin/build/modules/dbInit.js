var EXPORTED_SYMBOLS = [];

const Cc = Components.classes;
const Ci = Components.interfaces;

Components.utils.import("resource://thunderbirdmultiaccountsmanager/common.js");

/**
 * A very simple counter.
 */
XULAccountsManager.dbInit = {

  /* Preference object for the message count*/
  _dbCreated : null,

  /**
   * Object constructor.
   */
  _init : function() {
    let application =
      Components.classes["@mozilla.org/steel/application;1"].getService(Components.interfaces.steelIApplication);

    this._dbCreated =
      application.prefs.get("extensions.xulaccountsmanager.abcreated");
  },

  /**
   * Returns the current message count.
   * @return the current message count.
   */
//  get isCreated() { return this._dbCreated.value; },
  
   /**
   * Returns the current message count.
   * @return the current message count.
   */
  isCreated : function () { return this._dbCreated.value; },

  /**
   * Increments the message count by one.
   */
  create : function() {
    this._dbCreated.value = true;
  }
};

// Constructor.
(function() { this._init(); }).
  apply(XULAccountsManager.dbInit);
