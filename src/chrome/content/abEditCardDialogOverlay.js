

function loadIdentityLink()
{
    let menuList = document.getElementById("IdentityLink");
    let params = window.arguments[0];

    menuList.setAttribute("label",params.card.getProperty("IdentityLink", null));
    menuList.setAttribute("value",params.card.getProperty("IdentityLink", null));
}

window.addEventListener("load", function load(event){  
    loadIdentityLink();
},false);  
  