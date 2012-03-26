
Components.utils.import("resource:///modules/iteratorUtils.jsm");

Components.utils.import("resource://AddressBookMultiAccountsManager/common.js");
Components.utils.import("resource://AddressBookMultiAccountsManager/ScanDetect.js");

/**
 * AddressBookMultiAccountsManager namespace.
 */
if ("undefined" == typeof(AddressBookMultiAccountsManager)) {
  var AddressBookMultiAccountsManager = {};
};

/**
 * SmartScan allows to automatically assign an Thunderbird account
 * to a contact by browsing through the messages (Sent Box and INBOX).
 */
AddressBookMultiAccountsManager.SmartScan = 
{

  /**
   * SmartScan is an asynchronous method
   */
  main : function()
  {
    AddressBookMultiAccountsManager.ScanDetect.setScan(true);
    setTimeout(AddressBookMultiAccountsManager.SmartScan.execute,0);
  },
  /**
   * This method gets for each account, its folders and performs a search inside
   */
  execute : function()
  {
    let acctMgr = Components.classes["@mozilla.org/messenger/account-manager;1"]  
                            .getService(Components.interfaces.nsIMsgAccountManager);  
    let accounts = acctMgr.accounts;
    //Iterate over the folders in an account
    for (let i = 0; i < accounts.Count(); i++)
    {
      let account = accounts.QueryElementAt(i, Components.interfaces.nsIMsgAccount);
      if(account.defaultIdentity)
      {
        AddressBookMultiAccountsManager.SmartScan.browseFolders(account);
      }
    }  
  },
  /**
   * Browse folders of type sentMail and Inbox then launches this.browserMessages for each of them.
   */
  browseFolders : function (aAccount)
  {
    const nsMsgFolderFlags = Components.interfaces.nsMsgFolderFlags;
    let res = new Array();
    let rootFolder = aAccount.incomingServer.rootFolder; // nsIMsgFolder

    if (rootFolder.hasSubFolders)
    {
      let aFolder = rootFolder.subFolders; // nsIMsgFolder  
      while(aFolder.hasMoreElements())
      {
        let theSubFolder = aFolder.getNext().QueryInterface(Components.interfaces.nsIMsgFolder);
        if(theSubFolder.isSpecialFolder(nsMsgFolderFlags.SentMail,false) ||
                                    theSubFolder.isSpecialFolder(nsMsgFolderFlags.Inbox,false))
        {
          AddressBookMultiAccountsManager.SmartScan.browseMessages(theSubFolder,aAccount.defaultIdentity.key);
        }
        if(theSubFolder.hasSubFolders)
        {
          let aFolder2 = theSubFolder.subFolders;
          while(aFolder2.hasMoreElements())
          {
            let theSubFolder2 = aFolder2.getNext().QueryInterface(Components.interfaces.nsIMsgFolder);
            if(theSubFolder2.isSpecialFolder(nsMsgFolderFlags.SentMail,false) ||
                                      theSubFolder2.isSpecialFolder(nsMsgFolderFlags.Inbox,false))
            {
              AddressBookMultiAccountsManager.SmartScan.browseMessages(theSubFolder2,aAccount.defaultIdentity.key);
            }
          }
        }
      }
    }
  },
  
  /**
   * Remove duplicates from an array
   */
  deletingDuplicates : function (aArray)
  {
    let newArray=new Array();
    label:for(let i=0; i<aArray.length;i++ )
    {  
      for(let j=0; j<newArray.length;j++ )
      {
        if(newArray[j]==aArray[i]) 
          continue label;
      }
      newArray[newArray.length] = aArray[i];
    }
    return newArray;
  },
  /**
   * This method allow to browse a folder in order to get some information about messages
   * as the sender or recipients.
   */
  browseMessages : function (aFolder,identityKey)
  {
    let database = aFolder.msgDatabase;
    let contacts = new Array();
    let res = new Array();


    let hdrParser = Components.classes["@mozilla.org/messenger/headerparser;1"]
                           .getService(Components.interfaces.nsIMsgHeaderParser);
    

    for each (let msgHdr in fixIterator(database.EnumerateMessages(), Components.interfaces.nsIMsgDBHdr))
    {
      let ccList = msgHdr.ccList;
      let recipients = msgHdr.recipients;
      let addressIn = ccList + ", " + recipients;
      let address ={};
      let names = {};
      let fullNames = {};

      hdrParser.parseHeadersWithArray(addressIn, address, names, fullNames, 0);

      contacts = contacts.concat(address.value);

    }
    //Deleting duplicates
    res = AddressBookMultiAccountsManager.SmartScan.deletingDuplicates(contacts);
    for(let i=1;i<res.length;i++)
    {
      AddressBookMultiAccountsManager.SmartScan.updateContact(res[i],identityKey);
    }
    // don't forget to close the database  
    aFolder.msgDatabase = null;  
  },
  /**
   * Updates the value of the contact
   */
  updateContact : function (emailContact,identityKey)
  {
    let abManager = Components.classes["@mozilla.org/abmanager;1"]  
                      .getService(Components.interfaces.nsIAbManager);  

    let allAddressBooks = abManager.directories;   

    while (allAddressBooks.hasMoreElements())
    {
      let addressBook = allAddressBooks.getNext()  
                                       .QueryInterface(Components.interfaces.nsIAbDirectory );  
      if (addressBook instanceof Components.interfaces.nsIAbDirectory )
      { // or nsIAbItem or nsIAbCollection
        let alldirectories = addressBook.childCards;
        while (alldirectories.hasMoreElements())
        {
          let element = alldirectories.getNext();
          let acard = element.QueryInterface(Components.interfaces.nsIAbCard);

          if (acard instanceof Components.interfaces.nsIAbCard)
          {
            if(acard.primaryEmail == emailContact)
            {
              acard.setProperty("ABMAM_UseAccount",identityKey);
              addressBook.modifyCard(acard);  
            }
          }
        }
      }
    }
  }
}



