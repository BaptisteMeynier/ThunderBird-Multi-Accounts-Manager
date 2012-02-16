var EXPORTED_SYMBOLS = [];

const Cc = Components.classes;
const Ci = Components.interfaces;

Components.utils.import("resource://ThunderBirdMultiAccountsManager/common.js");

/**
 * A very simple counter.
 */
XULAccountsManager.dbInit = {

  /* Preference object for the message count*/
  _dbCreated : false,

  /**
   * Object constructor.
   */
  _init : function() {
    let application =
      Cc["@mozilla.org/fuel/application;1"].getService(Ci.fuelIApplication);

    this._dbCreated =
      application.prefs.get("extensions.xulaccountsmanagerchrome.DB.created");
  },

  /**
   * Returns the current message count.
   * @return the current message count.
   */
  get isCreated() { return this._dbCreated.value; },

  /**
   * Increments the message count by one.
   */
  create : function() {
    this._countPref.value = true;
  }
};

// Constructor.
(function() { this._init(); }).
  apply(XULAccountsManagerChrome.dbInit);
