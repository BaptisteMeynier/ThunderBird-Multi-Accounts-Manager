
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
   * call : this.browseMessages
   */
   main : function()
  {
    //Iterate over the folders in an account
    let acctMgr = Components.classes["@mozilla.org/messenger/account-manager;1"]  
                            .getService(Components.interfaces.nsIMsgAccountManager);  
    let accounts = acctMgr.accounts;  
    for (let i = 0; i < accounts.Count(); i++)
    {  
      let account = accounts.QueryElementAt(i, Components.interfaces.nsIMsgAccount);  
      let rootFolder = account.incomingServer.rootFolder; // nsIMsgFolder
      if (rootFolder.hasSubFolders)
      {  
        let subFolders = rootFolder.subFolders; // nsIMsgFolder  
        while(subFolders.hasMoreElements())
        {
          let aFolder = subFolders.getNext().QueryInterface(Components.interfaces.nsIMsgFolder);
          let allFolders = Components.classes["@mozilla.org/supports-array;1"]  
                   .createInstance(Components.interfaces.nsISupportsArray);
          aFolder.ListDescendents(allFolders);
          for each (let theSubFolder in fixIterator(allFolders, Components.interfaces.nsIMsgFolder))
          {
            //alert(theSubFolder.URI + " " + theSubFolder.flags);
            if(theSubFolder.flags == 134750740)
            {
              this.browseMessages(theSubFolder,account.defaultIdentity.key);
            }
          }   
        }  
      }  
    }  
  },
  /**
   * Allow to get an email address from a string of the kind : mister nothing <mister.nothing@mmm.com>
   */
  getAddress : function (address)
  {
    let pattern = new RegExp("<");
    if(pattern.test(address))
    {
      address = address.match("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}");
    }
    return address;
  },
  /**
   * Remove duplicates from an array
   */
  deletingDuplicates : function (arrayName)
  {
    let newArray=new Array();
    label:for(let i=0; i<arrayName.length;i++ )
    {  
      for(let j=0; j<newArray.length;j++ )
      {
        if(newArray[j]==arrayName[i]) 
          continue label;
      }
      newArray[newArray.length] = arrayName[i];
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

    for each (let msgHdr in fixIterator(database.EnumerateMessages(), Components.interfaces.nsIMsgDBHdr))
    {
      let ccList = msgHdr.ccList;
      let recipients = msgHdr.recipients;
      let addressIn = ccList + ", " + recipients;
      let contacts_tmp = addressIn.split(', ');
      for(let i=0;i<contacts_tmp.length;i++)
      {
        contacts.push(this.getAddress(contacts_tmp[i]).toString());
      }
    }
    res = this.deletingDuplicates(contacts);
    for(let i=1;i<res.length;i++)
    {
      this.updateContact(res[i],identityKey);
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
          let acard = alldirectories.getNext().QueryInterface(Components.interfaces.nsIAbCard);
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



