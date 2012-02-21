
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

    if(!XULUtils.DB.filExist())
    {
      XULUtils.DB.initDB();
    }

    window.openDialog(
        "chrome://ThunderBirdMultiAccountsManager/content/managerDialog.xul",
        "MultiAccountsManager", 'chrome,centerscreen');
  }

};