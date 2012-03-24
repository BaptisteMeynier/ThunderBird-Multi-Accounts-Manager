



function onRemoveAccount(event) {
  if (event.target.getAttribute("disabled") == "true") return;

  var account = currentAccount;

  var server = account.incomingServer;
  var type = server.type;
  var prettyName = server.prettyName;

  var protocolinfo = Components.classes["@mozilla.org/messenger/protocol/info;1?type=" + type].getService(Components.interfaces.nsIMsgProtocolInfo);
  var canDelete = protocolinfo.canDelete;
  if (!canDelete) {
    canDelete = server.canDelete;
  }
  if (!canDelete) 
    return;

  var bundle = document.getElementById("bundle_prefs");
  var confirmRemoveAccount =
    bundle.getFormattedString("confirmRemoveAccount", [prettyName]);

  var confirmTitle = bundle.getString("confirmRemoveAccountTitle");

  var promptService =
    Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
              .getService(Components.interfaces.nsIPromptService);
  if (!promptService.confirm(window, confirmTitle, confirmRemoveAccount))
    return;

  try {
    ////////////////////////////OVERRIDE///////////////////////////////
    backgroundTask = {
      run: function()
      {
        initialiseCards (account.key);
      }
    }

    let thread = Components.classes["@mozilla.org/thread-manager;1"]
              .getService(Components.interfaces.nsIThreadManager)
              .newThread(0);
    thread.dispatch(backgroundTask, thread.DISPATCH_NORMAL);
    backgroundTask.run();
    ///////////////////////////////////////////////////////////////////
    // clear cached data out of the account array
    currentAccount = currentPageId = null;

    var serverId = server.serverURI;
    Components.classes["@mozilla.org/messenger/account-manager;1"]
              .getService(Components.interfaces.nsIMsgAccountManager)
              .removeAccount(account);

    if (serverId in accountArray) {
      delete accountArray[serverId];
    }
    selectServer(null, null);
  }
  catch (ex) {
    dump("failure to remove account: " + ex + "\n");
    var alertText = bundle.getString("failedRemoveAccount");
    Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
              .getService(Components.interfaces.nsIPromptService)
              .alert(window, null, alertText);;
  }
}


  
function initialiseCards(idAccount)
{
  let acctMgr = Components.classes["@mozilla.org/messenger/account-manager;1"]  
                          .getService(Components.interfaces.nsIMsgAccountManager);
  let account = acctMgr.getAccount(idAccount);
  let identities = account.identities;

  for(let i = 0 ; i<identities.Count();i++)
  {
    let aIdentity = identities.QueryElementAt(i,Components.interfaces.nsIMsgIdentity);
  
  
    let abManager = Components.classes["@mozilla.org/abmanager;1"]  
                              .getService(Components.interfaces.nsIAbManager);  
      
    let allAddressBooks = abManager.directories;   
      
    while (allAddressBooks.hasMoreElements()) {  
      let addressBook = allAddressBooks.getNext()  
                                       .QueryInterface(Components.interfaces.nsIAbDirectory);  
      if (addressBook instanceof Components.interfaces.nsIAbDirectory)
      { 
        let allCards = addressBook.childCards;
        while (allCards.hasMoreElements())
        {
          let aCard = allCards.getNext().QueryInterface(Components.interfaces.nsIAbCard);
          if (aCard instanceof Components.interfaces.nsIAbCard)
          {
            if(aCard.getProperty("IdentityLink", "") == aIdentity.key)
            {
              aCard.setProperty("IdentityLink","");
              addressBook.modifyCard(aCard);  
            }
          }
        } 
      }  
    }
  }
}
