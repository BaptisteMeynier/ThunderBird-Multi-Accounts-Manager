
 
const Cc = Components.classes;
const Ci = Components.interfaces;
 
function CheckValidEmailAddress(to, cc, bcc)
{
    let stringBundle = document.getElementById("msgcompose-string-bundle");
    let prompts = Cc["@mozilla.org/embedcomp/prompt-service;1"].getService(Ci.nsIPromptService);
    //let account = [this.g("msgIdentity").getAttribute("label")];
    let account =[getCurrentIdentity().email];
    let title = stringBundle.getFormattedString("thunderbirdmultiaccountsmanager.confirm.title",account);
    let message = stringBundle.getFormattedString("thunderbirdmultiaccountsmanager.confirm.label",account);
    
    return prompts.confirm(window, title, message);

}

