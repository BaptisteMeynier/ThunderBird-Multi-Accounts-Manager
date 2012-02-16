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
    let row_account = document.getElementById("accountsList").selectedIndex;
    
    if (row_account != -1)
    {
        let id_account = document.getElementById("accountsList").getElementsByTagName("listitem").item(row_account+1).getAttribute("name");
        window.openDialog(
            "chrome://ThunderBirdMultiAccountsManager/content/addContactDialog.xul",
            "addContact", 'chrome,centerscreen',id_account);
        window.close();
    }
  },
  
  changeContact : function()
  {
    let view = document.getElementById("ThunderBirdMultiAccountsManager-manager-abResultsTree").view;
    let row_contact = view.selection.currentIndex; //returns -1 if the tree is not focused
    
    if (row_contact != -1)
    {
        let id_contact = view.getItemAtIndex(row_contact).getAttribute("name");
        let tree = document.getElementById("ThunderBirdMultiAccountsManager-manager-abResultsTree");
        let name_contact = tree.view.getCellText(tree.currentIndex, tree.columns.getColumnAt(0));
        let address_contact = tree.view.getCellText(tree.currentIndex, tree.columns.getColumnAt(1));
        
        window.openDialog(
            "chrome://ThunderBirdMultiAccountsManager/content/changeContactDialog.xul",
            "changeContact", 'chrome,centerscreen',id_contact, name_contact, address_contact);
        window.close();
    }
  },
  deleteContact : function()
  {
    let view = document.getElementById("ThunderBirdMultiAccountsManager-manager-abResultsTree").view;
    let row_contact = view.selection.currentIndex; //returns -1 if the tree is not focused

    if (row_contact != -1)
    {
        let row_account = document.getElementById("accountsList").selectedIndex + 1;
        let tree = document.getElementById("ThunderBirdMultiAccountsManager-manager-abResultsTree");
        let name_contact = [tree.view.getCellText(tree.currentIndex, tree.columns.getColumnAt(0))];
        let id_contact = view.getItemAtIndex(row_contact).getAttribute("name");
        
        let stringBundle = document.getElementById("manager-string-bundle");
        let prompts = Cc["@mozilla.org/embedcomp/prompt-service;1"].getService(Ci.nsIPromptService);
        let title = stringBundle.getString("ThunderBirdMultiAccountsManager.deleteContact.title");
        
        let message = stringBundle.getFormattedString("ThunderBirdMultiAccountsManager.deleteContact.text",name_contact);
        if(prompts.confirm(window, title, message))
        {
            XULUtils.DB.deleteContact(id_contact);
            //reload the tree
            if (row_account == 0)
            {
                row_account = 1;
            }

            let id_account = document.getElementById("accountsList").getElementsByTagName("listitem")
                .item(row_account).getAttribute("name");
            
            document.getElementById("id_account").textContent = id_account;  
            document.getElementById("contactsList").builder.rebuild(); 
        }
    }
  },
  smartScan : function()
  {
    
  }

};