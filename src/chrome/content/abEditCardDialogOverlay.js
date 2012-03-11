

function LoadMenuListValue()
{
    let menuList = document.getElementById("IdentityLink");
    let params = window.arguments[0];

    let gAccountManager = Components.classes["@mozilla.org/messenger/account-manager;1"].getService(Components.interfaces.nsIMsgAccountManager);      
    let email = gAccountManager.getIdentity(params.card.getProperty("IdentityLink", null)).email;


    menuList.setAttribute("label",email);
    menuList.setAttribute("value",params.card.getProperty("IdentityLink", null));
}

window.addEventListener("load", function load(event){  
    LoadMenuListValue();
},false);  
  