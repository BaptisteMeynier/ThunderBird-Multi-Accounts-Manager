
//////////////////////////SMART SCAN///////////////////

Components.utils.import("resource:///modules/iteratorUtils.jsm");

if ("undefined" == typeof(SmartScan)) {
  var SmartScan = {};
};

/**
 * The feature SmartScan allows the automatically assignment of an Thunderbird account
 * to a contact by browsing through the messages.
 */
SmartScan = 
{

  /**
   * Browse all the folders from the accounts.
   * call : this.browseFolders, this.browseMessages (into thread)
   */
  main : function()
  {
    setTimeout(SmartScan.execute,0);
  },
  execute : function()
  {
    let acctMgr = Components.classes["@mozilla.org/messenger/account-manager;1"]  
                            .getService(Components.interfaces.nsIMsgAccountManager);  
    let accounts = acctMgr.accounts;
    //Iterate over the folders in an account
    for (let i = 0; i < accounts.Count(); i++)
    {
      let account = accounts.QueryElementAt(i, Components.interfaces.nsIMsgAccount);
     // alert(account.defaultIdentity.key);
      let rootFolder = account.incomingServer.rootFolder; // nsIMsgFolder
      if(account.defaultIdentity)
      {
        if (rootFolder.hasSubFolders)
        {  
          let subFolder = rootFolder.subFolders; // nsIMsgFolder  
          SmartScan.browseFolders(subFolder,account.defaultIdentity.key);
        } 
      }
    }  
  },
  main2 : function()
  {
    
    const nsMsgFolderFlags = Components.interfaces.nsMsgFolderFlags;
    let k = 0;
    let acctMgr = Components.classes["@mozilla.org/messenger/account-manager;1"]  
                            .getService(Components.interfaces.nsIMsgAccountManager);  
    let accounts = acctMgr.accounts;
    //Iterate over the folders in an account
    for (let i = 0; i < accounts.Count(); i++)
    {
      let foldersArray = new Array();
      let account = accounts.QueryElementAt(i, Components.interfaces.nsIMsgAccount);  
      let rootFolder = account.incomingServer.rootFolder; // nsIMsgFolder
      if (rootFolder.hasSubFolders)
      {  
        let subFolder = rootFolder.subFolders; // nsIMsgFolder  
        foldersArray = foldersArray.concat(SmartScan.browseFolders(subFolder));
      }
      for(let j = 0 ; j < foldersArray.length;j++)
      {
        backgroundTask = {
          run: function()
          {
            SmartScan.browseMessages(foldersArray[j],account.defaultIdentity.key);
          }
        }
    
        let thread = Components.classes["@mozilla.org/thread-manager;1"]
                          .getService(Components.interfaces.nsIThreadManager)
                          .newThread(++k);
        thread.dispatch(backgroundTask, thread.DISPATCH_NORMAL);
        backgroundTask.run();
      }
      foldersArray = null;
    }  
  },
  browseFolders : function (aFolder,identityKey)
  {
    const nsMsgFolderFlags = Components.interfaces.nsMsgFolderFlags;
    let res = new Array();
    while(aFolder.hasMoreElements())
    {
      let theSubFolder = aFolder.getNext().QueryInterface(Components.interfaces.nsIMsgFolder);
      if(theSubFolder.isSpecialFolder(nsMsgFolderFlags.SentMail,false) ||
                                  theSubFolder.isSpecialFolder(nsMsgFolderFlags.Inbox,false))
      {
        SmartScan.browseMessages(theSubFolder,identityKey);
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
            SmartScan.browseMessages(theSubFolder2,identityKey);
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
   * This function allow to browse a folder in order to get some information from messages
   * as senders, recipients.
   * call : this.deletingDuplicates, this.updateContact
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
    res = SmartScan.deletingDuplicates(contacts);
    for(let i=1;i<res.length;i++)
    {
      SmartScan.updateContact(res[i],identityKey);
    }
    // don't forget to close the database  
    aFolder.msgDatabase = null;  
  },
  /**
   * Linking of a contact
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
              acard.setProperty("IdentityLink",identityKey);
              addressBook.modifyCard(acard);  
            }
          }
        }
      }
    }
  }

}



