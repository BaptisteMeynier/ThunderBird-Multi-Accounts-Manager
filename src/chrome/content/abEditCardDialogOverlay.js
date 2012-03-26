
/////////////////////////////////////////////////////////////////////////////
// Overlay = > chrome://messenger/content/addressbook/abEditCardDialog.xul //
/////////////////////////////////////////////////////////////////////////////


/**
 * Function which allow to assign the value of the IdentityLink from the selected card to the ComboBox
 */
function LoadMenuListValue(menuList)
{
    let gAccountManager = Components.classes["@mozilla.org/messenger/account-manager;1"]
                            .getService(Components.interfaces.nsIMsgAccountManager);
                            
    let params = window.arguments[0];

    if(params.card.getProperty("ABMAM_UseAccount", null))
    {
        let email = gAccountManager.getIdentity(params.card.getProperty("ABMAM_UseAccount", null)).email;

        menuList.setAttribute("label",email);
        menuList.setAttribute("value",params.card.getProperty("ABMAM_UseAccount", null));
    }
}

/**
 * Assigning the value of the property IdentityLink at the loading of the page
 */
window.addEventListener("load", function load(event){
    let menuList = document.getElementById("ABMAM_UseAccount");
    LoadMenuListValue(menuList);
},false);  
  
 
document.getElementById("abcardWindow").setAttribute("ondialogaccept","ABMAM_updatecontact();return EditCardOKButton();"); 
 