//   chrome://messenger/content/addressbook/abTrees.js

// chrome://messenger/content/accountUtils.js (vérification des adresses)

// chrome://messenger/content/mailCore.js voir methode function toAddressBook()

// chrome://messenger/content/addressbook/addressbook.js

// chrome://messenger/content/addressbook/abCommon.js barre de menu

// chrome://messenger/content/addressbook/abDragDrop.js

// chrome://messenger/content/addressbook/abResultsPane.js

//chrome://messenger/content/addressbook/abCardViewOverlay.js carte des contacts


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
    window.open(
      "chrome://ThunderBirdMultiAccountsManager/content/managerDialog.xul",
      "MultiAccountsManager", "chrome,centerscreen");
  },
  loadAccounts : function()
  {
   
  },
  loadAddress : function()
  {
    
  },
  addAddress : function ()
  {
    
  },
  changeAddress : function()
  {
    
  },
  deleteAddress : function()
  {
    
  },
  smartScan : function()
  {
    
  }

};