   let _afficher = 1;
   let _curentAddress = "";
   const Cc = Components.classes;
   const Ci = Components.interfaces;
var OrignalCheckValidEmailAddressTMAM = CheckValidEmailAddress;

/**
 * Overlay of CheckValidEmailAddress witch is call when the user clic on the Send button
 */
var CheckValidEmailAddress = function(to, cc, bcc) {
   let stringBundle = document.getElementById("AddressBookMultiAccountsManager-string-bundle");
   AddressBookMultiAccountsManager.messengercomposeOverlay.drawNotificationIdentityManager();
   let _afficher = 1;
   let nBox = document.getElementById("attachmentNotificationBox");
     if(nBox.getNotificationWithValue( 'value' )!=null ){
         let prompts = Cc["@mozilla.org/embedcomp/prompt-service;1"].getService(Ci.nsIPromptService);
         let retval = prompts.confirm(
                        window,
                        stringBundle.getString("AddressBookMultiAccountsManager.messengercompose.notification.title"),
                        stringBundle.getString("AddressBookMultiAccountsManager.messengercompose.notification.alternate")
                        );
        if(retval){
            AddressBookMultiAccountsManager.messengercomposeOverlay.saveChoice();
            AddressBookMultiAccountsManager.messengercomposeOverlay.resetNotificationMultiAccount();
            return OrignalCheckValidEmailAddressTMAM.apply(this, arguments);
         }
         else{
            return retval;
         }
     }
     
      AddressBookMultiAccountsManager.messengercomposeOverlay.resetNotificationMultiAccount();
      return OrignalCheckValidEmailAddressTMAM.apply(this, arguments);
     
}

if ("undefined" == typeof(AddressBookMultiAccountsManager)) {
  var AddressBookMultiAccountsManager = {};
  
};


AddressBookMultiAccountsManager.messengercomposeOverlay = {


   /**
    * Reset the notification box
    */
 resetNotificationMultiAccount : function(){
    _afficher =1;
    _curentAddress="";
    let nBox = document.getElementById("attachmentNotificationBox");
    //nBox.removeCurrentNotification();
    nBox.removeAllNotifications( false);
 },
 
/**
   * Updates the value of the contact
   */
  updateContact : function (emailContact,identityKey)
  {
    let abManager = Components.classes["@mozilla.org/abmanager;1"]  
                      .getService(Components.interfaces.nsIAbManager);  

    let allAddressBooks = abManager.directories;   

    while (allAddressBooks.hasMoreElements())
    {
      let addressBook = allAddressBooks.getNext()  
                                       .QueryInterface(Components.interfaces.nsIAbDirectory );  
      if (addressBook instanceof Components.interfaces.nsIAbDirectory )
      { // or nsIAbItem or nsIAbCollection
        let alldirectories = addressBook.childCards;
        while (alldirectories.hasMoreElements())
        {
          let element = alldirectories.getNext();
          let acard = element.QueryInterface(Components.interfaces.nsIAbCard);

          if (acard instanceof Components.interfaces.nsIAbCard)
          {
            if(acard.primaryEmail == emailContact)
            {
              acard.setProperty("ABMAM_UseAccount",identityKey);
              addressBook.modifyCard(acard);  
            }
          }
        }
      }
    }
  },
  
  /**
   * Test if the contact is link with the identity
   */
 testLinked : function(emailContact,identityKey){
   
       let abManager = Components.classes["@mozilla.org/abmanager;1"]  
                      .getService(Components.interfaces.nsIAbManager);  

    let allAddressBooks = abManager.directories;   

    while (allAddressBooks.hasMoreElements())
    {  
      let addressBook = allAddressBooks.getNext()  
                                       .QueryInterface(Components.interfaces.nsIAbDirectory );  
      if (addressBook instanceof Components.interfaces.nsIAbDirectory )
      { 
        let alldirectories = addressBook.childCards;
        while (alldirectories.hasMoreElements())
        {
          let acard = alldirectories.getNext().QueryInterface(Components.interfaces.nsIAbCard);
          if (acard instanceof Components.interfaces.nsIAbCard)
          { 
            if(acard.primaryEmail == emailContact)
            {
		let m = acard.getProperty("ABMAM_UseAccount","");
               if(m==identityKey)
               {
                  return "true";
               }
               else
               {
                  return "false";
               }
            }
          }
        }
      }
    }
    return "false";
  },
 
 /**
  * Function call with the yes button
  */
 yesNotification: function(event){
     let nBox = document.getElementById("attachmentNotificationBox");
     nBox.removeAllNotifications( false);
    AddressBookMultiAccountsManager.messengercomposeOverlay.saveChoice();
 },
 
 /**
  * Function call when the user blur the account list
  */
   noNotification: function(){
      _afficher =1;
     let nBox = document.getElementById("attachmentNotificationBox");
     nBox.removeAllNotifications( false);
    AddressBookMultiAccountsManager.messengercomposeOverlay.drawNotificationIdentityManager();
 },
 
 
 /**
  * Main function witch display a notification box if it is needed
  */
  drawNotificationIdentityManager : function(){
   let stringBundle = document.getElementById("AddressBookMultiAccountsManager-string-bundle");
   if(_afficher == 1){

      this.hdrParser = Components.classes["@mozilla.org/messenger/headerparser;1"]
                           .getService(Components.interfaces.nsIMsgHeaderParser);
                           
      let adresse;
      let i = 1;
      let cpt =0;
      while(document.getElementById("addressCol2#"+i)!=null){
         var addr = document.getElementById("addressCol2#"+i).label;
         let addresses = {};
         var names = {};
         var fullNames = {};
         var count = 0;
         var reformattedAddrs = "";

         addr = this.hdrParser.parseHeadersWithArray(addr, addresses, names, fullNames, count); 
         for(j=0;j<addresses.value.length;j++){
            if(AddressBookMultiAccountsManager.messengercomposeOverlay.testLinked(addresses.value[j],document.getElementById("msgIdentity").value)=="false"){
               _curentAddress=addresses.value[j];
               cpt++;
            }
         }
                i = i + 1;
            
         
         
        
      }
      if(cpt>0){
         let nBox = document.getElementById("attachmentNotificationBox");
         const priority = nBox.PRIORITY_WARNING_MEDIUM;
         var buttons = [{  
         label: 'Oui',
         accessKey: 'O',  
         popup: null,
         callback: AddressBookMultiAccountsManager.messengercomposeOverlay.yesNotification
         }];
         if(cpt == 1)
         {
            let text = stringBundle.getFormattedString("AddressBookMultiAccountsManager.messengercompose.notification.question",[_curentAddress]);
            nBox.appendNotification(text, 'value' , 'chrome://browser/skin/Info.png' , priority , buttons );
         }
         else
         {
            nBox.appendNotification( stringBundle.getString("AddressBookMultiAccountsManager.messengercompose.notification.alternate"), 'value' , 'chrome://browser/skin/Info.png' , priority , buttons );
         }
      }
   }
   
   _afficher=0; 
 },
 /**
  * Save the choice of the user.
  */
 saveChoice : function(){
      this.hdrParser = Components.classes["@mozilla.org/messenger/headerparser;1"]
                                             .getService(Components.interfaces.nsIMsgHeaderParser);
      let i = 1;
      while(document.getElementById("addressCol2#"+i)!=null){
         var addr = document.getElementById("addressCol2#"+i).label;
      
      
      var addresses = {};
      var names = {};
      var fullNames = {};
      var count = 0;
      var reformattedAddrs = "";
      addr = this.hdrParser.parseHeadersWithArray(addr, addresses, names, fullNames, count);
       for(j=0;j<addresses.value.length;j++){
          AddressBookMultiAccountsManager.messengercomposeOverlay.updateContact(addresses.value[j],document.getElementById("msgIdentity").value);
        
         }
         i = i + 1;
      }
 }
 
 
}

/**
 * Events listeners
 */
   document.getElementById("content-frame").addEventListener("click", function load(event){  AddressBookMultiAccountsManager.messengercomposeOverlay.drawNotificationIdentityManager();},false);  
   document.getElementById("msgIdentity").onblur = AddressBookMultiAccountsManager.messengercomposeOverlay.noNotification;
   window.addEventListener("close", function load(event){  
      AddressBookMultiAccountsManager.messengercomposeOverlay.resetNotificationMultiAccount();
   },false); 
  