/**
 * XULAccountsManagerChrome namespace.
 */
if ("undefined" == typeof(XULAccountsManagerChrome)) {
  var XULAccountsManagerChrome = {};
};



/**
 * Controls the browser overlay for the ThunderBirdMultiAccountsManager extension.
 */
XULAccountsManagerChrome.AddChangeContactDialog = {

loadChangeContact : function()
{
    document.getElementById("nickname").setAttribute("value",window.arguments[1]);
    document.getElementById("email").setAttribute("value",window.arguments[2]);
},
addContact : function()
{
  let id_account = window.arguments[0];
  let name_contact = document.getElementById("nickname").value;
  let address_contact = document.getElementById("email").value;
  
   // crude check that the to, cc, and bcc fields contain at least one '@'.
   // We could parse each address, but that might be overkill.
   if (address_contact.length > 0 && (address_contact.indexOf("@") <= 0 && address_contact.toLowerCase() != "postmaster"
      || address_contact.indexOf("@") == address_contact.length - 1))
   {
     /* let stringBundle = document.getElementById("addContact-string-bundle");
      let title = stringBundle.getFormattedString("ThunderBirdMultiAccountsManager.addContact.warn.title");
      let text = stringBundle.getFormattedString("ThunderBirdMultiAccountsManager.addContact.warn.addressInvalid");
      let prompts = Cc["@mozilla.org/embedcomp/prompt-service;1"].getService(Ci.nsIPromptService);
       prompts.alert(window, title,text);*/
   }
  else
  {
    if(name_contact.length != 0  && address_contact.length != 0)
    {
      XULUtils.DB.insertContact(name_contact, address_contact, id_account);
    }
  }
  this.cancel();
  
},
changeContact : function()
{
  let id_contact = window.arguments[0];
  let name_contact = document.getElementById("nickname").value;
  let address_contact = document.getElementById("email").value;

   // crude check that the to, cc, and bcc fields contain at least one '@'.
   // We could parse each address, but that might be overkill.
   if (address_contact.length > 0 && (address_contact.indexOf("@") <= 0 && address_contact.toLowerCase() != "postmaster"
      || address_contact.indexOf("@") == address_contact.length - 1))
   {
     /* let stringBundle = document.getElementById("addContact-string-bundle");
      let title = stringBundle.getFormattedString("ThunderBirdMultiAccountsManager.addContact.warn.title");
      let text = stringBundle.getFormattedString("ThunderBirdMultiAccountsManager.addContact.warn.addressInvalid");
      let prompts = Cc["@mozilla.org/embedcomp/prompt-service;1"].getService(Ci.nsIPromptService);
       prompts.alert(window, title,text);*/
   }
  else
  {
    if(name_contact.length != 0  && address_contact.length != 0)
    {
      XULUtils.DB.updateContact(id_contact,name_contact,address_contact);
    }
  }
  this.cancel();
  
},
cancel : function()
{
    window.openDialog(
        "chrome://ThunderBirdMultiAccountsManager/content/managerDialog.xul",
        "MultiAccountsManager", 'chrome,centerscreen');
}

};