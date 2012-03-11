
// Item is |[dialogField, cardProperty]|.
kVcardFields.push( ["IdentityLink", "IdentityLink"]);


function LoadMenuList()
{
        let gAccountManager = Components.classes["@mozilla.org/messenger/account-manager;1"].getService(Components.interfaces.nsIMsgAccountManager);
    
        let identityElement = document.getElementById("msgIdentityPopup");
        
        for(let i =0;i<gAccountManager.allIdentities.Count();i++)
        {
            let identity = gAccountManager.allIdentities.QueryElementAt(i, Components.interfaces.nsIMsgIdentity);
            let identityName = identity.identityName;
            let fullName = identity.fullName;
            let email = identity.email;
            let idIdentity = identity.key;

           let menuItem = document.createElement("menuitem");
           menuItem.setAttribute("label",email);
           menuItem.setAttribute("value",idIdentity);
    
           identityElement.appendChild(menuItem);
        }
}


window.addEventListener("load", function load(event){  
    LoadMenuList();
},false);  
