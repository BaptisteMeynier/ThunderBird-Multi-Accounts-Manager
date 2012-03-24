

Components.utils.import("resource://IdentityManager/common.js");
Components.utils.import("resource://IdentityManager/messageScan.js");


if ("undefined" == typeof(AddressBookMultiAccountsManager)) {
  var AddressBookMultiAccountsManager = {};
};

function  smartScan ()
{
  SmartScan.main();
  AddressBookMultiAccountsManager.ScanDetect.setScan(true);
}

/**
 * Controls the browser overlay for the ThunderBirdMultiAccountsManager extension.
 */
AddressBookMultiAccountsManager.BrowserOverlay = {

  hanbleNotification : function()
  {
    if(!AddressBookMultiAccountsManager.ScanDetect.getScan())
    {
        this.displayNotification();
    }
  },
  displayNotification : function()
  {
    let nBox = document.getElementById("mail-notification-box");
    let stringBundle = document.getElementById("identitymanager-string-bundle");
    let text = stringBundle.getString("IdentityManager.smartscan.description");
    let yes = stringBundle.getString("IdentityManager.smartscan.validation");
    const priority = nBox.PRIORITY_WARNING_MEDIUM;
    var buttons = [{  
        label: yes,
        accessKey: 'E',
        popup: null,
        callback: smartScan
    }];
    nBox.appendNotification(text, 'value' , 'chrome://browser/skin/Info.png' , priority , buttons );

  }
};


/**
 * Assigning the value of the property IdentityLink at the loading of the page
 */
window.addEventListener("load", function load(event){
    AddressBookMultiAccountsManager.BrowserOverlay.hanbleNotification();
},false);  

