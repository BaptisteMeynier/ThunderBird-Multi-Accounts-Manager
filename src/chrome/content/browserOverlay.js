
//Components.utils.import("resource://ThunderBirdMultiAccountsManager/common.js");
//Components.utils.import("resource://ThunderBirdMultiAccountsManager/dbInit.js");

/**
 * XULAccountsManagerChrome namespace.
 */
if ("undefined" == typeof(XULAccountsManagerChrome)) {
  var XULAccountsManagerChrome = {};
};



/**
 * Controls the browser overlay for the ThunderBirdMultiAccountsManager extension.
 */
XULAccountsManagerChrome.BrowserOverlay = {

  openManager : function(aEvent)
  {
    XULUtils.DB.main();
    window.openDialog(
        "chrome://ThunderBirdMultiAccountsManager/content/managerDialog.xul",
        "MultiAccountsManager", 'chrome,centerscreen');
  }

};