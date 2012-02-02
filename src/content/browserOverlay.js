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

  loadAccounts : function()
  {
   
  },
  
  openManager : function(aEvent)
  {
    window.open(
      "chrome://ThunderBirdMultiAccountsManager/content/managerDialog.xul",
      "", "chrome,centerscreen");
  }
};