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
XULAccountsManagerChrome.ManagerDialog = {


  openManager : function()
  {
    window.openDialog(
        "chrome://ThunderBirdMultiAccountsManager/content/managerDialog.xul",
        "MultiAccountsManager", 'chrome,centerscreen');
  },
  loadContacts : function(id_account)
  {
    document.getElementById("id_account").textContent = id_account;  
    document.getElementById("contactsList").builder.rebuild(); 
  },
  addContact : function ()
  {
    let row = document.getElementById("accountsList").selectedIndex + 1;
    let res = document.getElementById("accountsList").getElementsByTagName("listitem").item(row).getAttribute("name");
    if (row > 0)
    {
    window.openDialog(
        "chrome://ThunderBirdMultiAccountsManager/content/addContactDialog.xul",
        "addContact", 'chrome,centerscreen',res);
    window.close();
    }
  },
  
  changeContact : function()
  {

    let tree = document.getElementById("ThunderBirdMultiAccountsManager-manager-abResultsTree");
    let name_contact = tree.view.getCellText(tree.currentIndex, tree.columns.getColumnAt(0));
    let address_contact = tree.view.getCellText(tree.currentIndex, tree.columns.getColumnAt(1));
    let view = document.getElementById("ThunderBirdMultiAccountsManager-manager-abResultsTree").view;
    let row = view.selection.currentIndex; //returns -1 if the tree is not focused
    let id_contact = view.getItemAtIndex(row).getAttribute("name");

    if (row > 0)
    {
    window.openDialog(
        "chrome://ThunderBirdMultiAccountsManager/content/changeContactDialog.xul",
        "changeContact", 'chrome,centerscreen',id_contact, name_contact, address_contact);
    window.close();
    }
  },
  deleteAddress : function()
  {
    
  },
  smartScan : function()
  {
    
  }

};