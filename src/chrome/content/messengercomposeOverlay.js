
   let _afficher = 1;
   let _curentAddress = "";
 
 function resetNotificationMultiAccount(){
    _afficher =1;
    _curentAddress="";
    let nBox = document.getElementById("attachmentNotificationBox");
    nBox.removeCurrentNotification();
 }
 
 function updateContact(emailContact,identityKey)
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
          let acard = alldirectories.getNext().QueryInterface(Components.interfaces.nsIAbCard);
          if (acard instanceof Components.interfaces.nsIAbCard)
          { 
            if(acard.primaryEmail == emailContact)
            {
              acard.setProperty("IdentityLink",identityKey);
              addressBook.modifyCard(acard);  
            }
          }
        }
      }
    }
  }
  
  function testLinked(emailContact,identityKey){
   
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
		let m = acard.getProperty("IdentityLink","");
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
  }
 
 function yesNotification(event){
    //alert(_curentAddress);
     let nBox = document.getElementById("attachmentNotificationBox");
    nBox.removeCurrentNotification();
    //saveChoice();
    saveAddr();
 }
 
  function noNotification(){
      _afficher =1;
     let nBox = document.getElementById("attachmentNotificationBox");
    nBox.removeCurrentNotification();
    drawNotificationIdentityManager();
 }
 
 
 
 function drawNotificationIdentityManager(){
   let stringBundle = document.getElementById("identitymanager-string-bundle");
   if(_afficher == 1){
      
      //alert(document.getElementById("msgIdentity").value); //id1
      // alert(document.getElementById("msgIdentity").description); //adresse emetteur
      //alert("-"+document.getElementById("addressCol2#1").label+"-"); //label destinataire
      
      
      
      
      
      this.hdrParser = Components.classes["@mozilla.org/messenger/headerparser;1"]
                           .getService(Components.interfaces.nsIMsgHeaderParser);
                           
      let adresse;
      let i = 1;
      while(document.getElementById("addressCol2#"+i)!=null){
         var addr = document.getElementById("addressCol2#"+i).label;
         let addresses = {};
         var names = {};
         var fullNames = {};
         var count = 0;
         var reformattedAddrs = "";

         addr = this.hdrParser.parseHeadersWithArray(addr, addresses, names, fullNames, count); 
         //alert("Count : " + addresses.value.length );
         for(j=0;j<addresses.value.length;j++){
            if(testLinked(addresses.value[j],document.getElementById("msgIdentity").value)=="false"){
               
               let nBox = document.getElementById("attachmentNotificationBox");
               const priority = nBox.PRIORITY_WARNING_MEDIUM;
               var buttons = [{  
               label: 'Oui',
               accessKey: 'O',  
               popup: null,
               callback: yesNotification
               }];
               nBox.appendNotification( stringBundle.getString("IdentityManager.addressBook.questionbegin")+ addresses.value[j] + stringBundle.getString("IdentityManager.addressBook.questionend"), 'value' , 'chrome://browser/skin/Info.png' , priority , buttons );
//nBox.appendNotification( "---"+ addresses.value[j] + "  ", 'value' , 'chrome://browser/skin/Info.png' , priority , buttons );
               //stringBundle.getString("IdentityManager.addressBook.questionbegin")
               _curentAddress=addresses.value[j];
            }
         }
         i = i + 1;
      }
   }
   
   _afficher=0; 
 }
 
 function saveChoice(){
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
         updateContact(addresses.value[j],document.getElementById("msgIdentity").value);
        
         }
         i = i + 1;
      
     
      //alert(addresses.value[0]); //adresse destinataire
      //updateContact(addresses.value[0],document.getElementById("msgIdentity").value)
      }
 }
 
 function saveAddr(){
   updateContact(_curentAddress,document.getElementById("msgIdentity").value);
 }
 
   document.getElementById("content-frame").addEventListener("click", function load(event){  drawNotificationIdentityManager();},false);  
   document.getElementById("button-send").addEventListener("click", function load(event){  saveChoice();},false); 
   document.getElementById("msgIdentity").onblur = noNotification;
   window.addEventListener("close", function load(event){  
      resetNotificationMultiAccount();
   },false); 
  