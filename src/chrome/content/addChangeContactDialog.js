/**
 * XULAccountsManagerChrome namespace.
 */
if ("undefined" == typeof(XULAccountsManagerChrome)) {
  var XULAccountsManagerChrome = {};
};



/**
 * Controls the browser overlay for the ThunderBirdMultiAccountsManager extension.
 */
XULAccountsManagerChrome.manageContactDialog = {

addressValid : function(address)
{
  // crude check that the to, cc, and bcc fields contain at least one '@'.
  // We could parse each address, but that might be overkill.
  if (address.length > 0 && (address.indexOf("@") <= 0 && address.toLowerCase() != "postmaster"
      || address.indexOf("@") == address.length - 1 || address.length == 0))
   {
      let stringBundle = document.getElementById("manageContact-string-bundle");
      let title = stringBundle.getString("ThunderBirdMultiAccountsManager.addContact.warn.title");
      let text = stringBundle.getFormattedString("ThunderBirdMultiAccountsManager.addContact.warn.addressInvalid",[address]);
      let prompts = Cc["@mozilla.org/embedcomp/prompt-service;1"].getService(Ci.nsIPromptService);
      prompts.alert(window, title,text);
      return false;
   }
    return true; 
},
addContact : function()
{
  let id_account = window.arguments[0];
  let name_contact = document.getElementById("nickname").value;
  let address_contact = document.getElementById("email").value;
  
  if(this.addressValid(address_contact))
  {
    XULUtils.DB.insertContact(name_contact,address_contact,id_account);
  }
  this.cancel();
},
loadChangeContact : function()
{
    document.getElementById("nickname").setAttribute("value",window.arguments[1]);
    document.getElementById("email").setAttribute("value",window.arguments[2]);
},
changeContact : function()
{
  let id_contact = window.arguments[0];
  let name_contact = document.getElementById("nickname").value;
  let address_contact = document.getElementById("email").value;

  if(this.addressValid(address_contact))
  {
    XULUtils.DB.updateContact(id_contact,name_contact,address_contact);
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