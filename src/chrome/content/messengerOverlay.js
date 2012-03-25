

Components.utils.import("resource://AddressBookMultiAccountsManager/common.js");
Components.utils.import("resource://AddressBookMultiAccountsManager/ScanDetect.js");


if ("undefined" == typeof(AddressBookMultiAccountsManager)) {
  var AddressBookMultiAccountsManager = {};
};

function  smartScan ()
{
  AddressBookMultiAccountsManager.SmartScan.main();
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
    nBox.setAttribute("observes","AddressBookMultiAccountsManager-notification-broadcaster");
    let stringBundle = document.getElementById("AddressBookMultiAccountsManager-string-bundle");
    let text = stringBundle.getString("AddressBookMultiAccountsManager.notificationBox.label");
    let yes = stringBundle.getString("AddressBookMultiAccountsManager.notificationBox.validation");
    const priority = nBox.PRIORITY_WARNING_MEDIUM;
    var buttons = [{  
        label: yes,
        accessKey: 'E',
        popup: null,
        callback: smartScan
    }];
    nBox.appendNotification(text, 'smartscan' , 'chrome://browser/skin/Info.png' , priority , buttons );

  }
};


/**
 * Assigning the value of the property IdentityLink at the loading of the page
 */
window.addEventListener("load", function load(event){
    AddressBookMultiAccountsManager.BrowserOverlay.hanbleNotification();
},false);  

