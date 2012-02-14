
const Cc = Components.classes;
const Ci = Components.interfaces;
 

function CheckValidEmailAddress(to, cc, bcc)
{
  
   var invalidStr = null;
   // crude check that the to, cc, and bcc fields contain at least one '@'.
   // We could parse each address, but that might be overkill.
   if (to.length > 0 && (to.indexOf("@") <= 0 && to.toLowerCase() != "postmaster" || to.indexOf("@") == to.length - 1))
     invalidStr = to;
   else if (cc.length > 0 && (cc.indexOf("@") <= 0 && cc.toLowerCase() != "postmaster" || cc.indexOf("@") == cc.length - 1))
     invalidStr = cc;
   else if (bcc.length > 0 && (bcc.indexOf("@") <= 0 && bcc.toLowerCase() != "postmaster" || bcc.indexOf("@") == bcc.length - 1))
     invalidStr = bcc;
   if (invalidStr)
   {
     if (gPromptService)
       gPromptService.alert(window, getComposeBundle().getString("addressInvalidTitle"),
                            getComposeBundle().getFormattedString("addressInvalid",
                                                      [invalidStr], 1));
     return false;
   }
  
  if(document.getElementById("msgIdentityPopup").childNodes.length > 1)
  {
    let stringBundle = document.getElementById("messengercompose-string-bundle");
    let prompts = Cc["@mozilla.org/embedcomp/prompt-service;1"].getService(Ci.nsIPromptService);
    let account =[getCurrentIdentity().email];
    let title = stringBundle.getFormattedString("ThunderBirdMultiAccountsManager.confirm.title",account);
    let message = stringBundle.getFormattedString("ThunderBirdMultiAccountsManager.confirm.label",account);
    
    return prompts.confirm(window, title, message);
  }
  else{
   return true;
  }

}


