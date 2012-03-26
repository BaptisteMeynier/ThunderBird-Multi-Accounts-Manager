
/////////////////////////////////////////////////////////////////////////////
// Overlay = > chrome://messenger/content/addressbook/abNewCardDialog.xul  //
/////////////////////////////////////////////////////////////////////////////


/** Item is |[dialogField, cardProperty]|.
 * Adding of the field UseAccount into the DialogBox
 */
kVcardFields.push( ["ABMAM_UseAccount", "ABMAM_UseAccount"]);

/**
 * Allows to generate a list of identities that the user can link with a contact
 */
function LoadMenuList(elementMenuPopup)
{
        let gAccountManager = Components.classes["@mozilla.org/messenger/account-manager;1"]
                                .getService(Components.interfaces.nsIMsgAccountManager);
        
        for(let i =0;i<gAccountManager.allIdentities.Count();i++)
        {
            let identity = gAccountManager.allIdentities.QueryElementAt(i, Components.interfaces.nsIMsgIdentity);
            let email = identity.email;
            let idIdentity = identity.key;

           let menuItem = document.createElement("menuitem");
           menuItem.setAttribute("label",email);
           menuItem.setAttribute("value",idIdentity);
    
           elementMenuPopup.appendChild(menuItem);
        }
        let menuItem = document.createElement("menuitem");
        menuItem.setAttribute("label","");
        menuItem.setAttribute("value","");
    
        elementMenuPopup.appendChild(menuItem);
}

/**
 * Check if the same contact is in other nsIAbDirectory
 */
function ABMAM_updatecontact()
{
    emailContact = document.getElementById("PrimaryEmail").value;
    identityKey = document.getElementById("ABMAM_UseAccount").value;
    setTimeout(AddressBookMultiAccountsManager.SmartScan.updateContact,0,emailContact,identityKey);
}

document.getElementById("abcardWindow").setAttribute("ondialogaccept","ABMAM_updatecontact();return NewCardOKButton();");


/**
 * As soon as the page loads, a comboBox is created with all the Identities
 */
window.addEventListener("load", function load(event){
    let identityElement = document.getElementById("msgIdentityPopup");
    LoadMenuList(identityElement);
},false);  
