





//////////////////////////////////////////
var zIdentityLink;

function OnLoadCardView()
{
  

  
  /*
  var searchQuery = "(or(PrimaryEmail,bw,@V)(NickName,bw,@V)(and(IsMailList,=,TRUE)(Notes,bw,@V)))";  
searchQuery = searchQuery.replace(/@V/g, encodeURIComponent("mystr"));
                                  
                                  
  let abManager = Components.classes["@mozilla.org/abmanager;1"]  
                          .getService(Components.interfaces.nsIAbManager);  
let allAddressBooks = abManager.directories;  
  
while (allAddressBooks.hasMoreElements()) {  
  
  let ab = allAddressBooks.getNext();  
  if (ab instanceof Components.interfaces.nsIAbDirectory &&  
      !ab.isRemote) {  
    let searchResult = abManager.getDirectory(ab.URI + "?" + searchQuery).childCards;
    while(searchResult.hasMoreElements()){
      let as = searchResult.getNext();
      let mail =  searchResult.getProperty
    }
  
    // ... use searchResult as required.  
  }  
} 
  */
  
  let stringBundle = document.getElementById("identitymanager-string-bundle");
  
  zIdentityLink = stringBundle.getString("IdentityManager.addressBook.propertyIdentityLink");
  zPrimaryEmail = gAddressBookBundle.getString("propertyPrimaryEmail");
  
  zSecondaryEmail = gAddressBookBundle.getString("propertySecondaryEmail");
  zScreenName = gAddressBookBundle.getString("propertyScreenName");
  zNickname = gAddressBookBundle.getString("propertyNickname");
  zDisplayName = gAddressBookBundle.getString("propertyDisplayName");
  zListName = gAddressBookBundle.getString("propertyListName");
  zWork = gAddressBookBundle.getString("propertyWork");
  zHome = gAddressBookBundle.getString("propertyHome");
  zFax = gAddressBookBundle.getString("propertyFax");
  zCellular = gAddressBookBundle.getString("propertyCellular");
  zPager = gAddressBookBundle.getString("propertyPager");
  zBirthday = gAddressBookBundle.getString("propertyBirthday");
  zCustom1 = gAddressBookBundle.getString("propertyCustom1");
  zCustom2 = gAddressBookBundle.getString("propertyCustom2");
  zCustom3 = gAddressBookBundle.getString("propertyCustom3");
  zCustom4 = gAddressBookBundle.getString("propertyCustom4");

  var doc = document;
  /* data for address book, prefixes: "cvb" = card view box
                    "cvh" = crad view header
                    "cv"  = card view (normal fields) */
  
  cvData = new Object;

  // Card View Box
  cvData.CardViewBox    = doc.getElementById("CardViewInnerBox");
  // Title
  cvData.CardTitle    = doc.getElementById("CardTitle");
  // Name section
  
 // cvData.cvIdentityLinkBox    = doc.getElementById("cvIdentityLinkBox");
  cvData.cvIdentityLink    = doc.getElementById("cvIdentityLink");
  
  //alert("Identity Link"+cvData.cvIdentityLink);
  
  cvData.cvbContact = doc.getElementById("cvbContact");
  cvData.cvhContact = doc.getElementById("cvhContact");
  cvData.cvNickname    = doc.getElementById("cvNickname");
  cvData.cvDisplayName  = doc.getElementById("cvDisplayName");
  cvData.cvEmail1Box    = doc.getElementById("cvEmail1Box");
  cvData.cvEmail1      = doc.getElementById("cvEmail1");
  cvData.cvScreennameBox    = doc.getElementById("cvScreennameBox");
  cvData.cvScreenname    = doc.getElementById("cvScreenname");
  cvData.cvBuddyIcon              = doc.getElementById("cvBuddyIcon");
  cvData.cvListNameBox    = doc.getElementById("cvListNameBox");
  cvData.cvListName               = doc.getElementById("cvListName");
  cvData.cvEmail2Box    = doc.getElementById("cvEmail2Box");
  cvData.cvEmail2      = doc.getElementById("cvEmail2");
  // Home section
  cvData.cvbHome      = doc.getElementById("cvbHome");
  cvData.cvhHome      = doc.getElementById("cvhHome");
  cvData.cvHomeAddress  = doc.getElementById("cvHomeAddress");
  cvData.cvHomeAddress2  = doc.getElementById("cvHomeAddress2");
  cvData.cvHomeCityStZip  = doc.getElementById("cvHomeCityStZip");
  cvData.cvHomeCountry  = doc.getElementById("cvHomeCountry");
  cvData.cvbHomeMapItBox  = doc.getElementById("cvbHomeMapItBox");
  cvData.cvHomeMapIt = doc.getElementById("cvHomeMapIt");
  cvData.cvHomeWebPageBox = doc.getElementById("cvHomeWebPageBox");
  cvData.cvHomeWebPage  = doc.getElementById("cvHomeWebPage");
  // Other section
  cvData.cvbOther     = doc.getElementById("cvbOther");
  cvData.cvhOther     = doc.getElementById("cvhOther");
  cvData.cvBirthday   = doc.getElementById("cvBirthday");
  cvData.cvCustom1    = doc.getElementById("cvCustom1");
  cvData.cvCustom2    = doc.getElementById("cvCustom2");
  cvData.cvCustom3    = doc.getElementById("cvCustom3");
  cvData.cvCustom4    = doc.getElementById("cvCustom4");
  cvData.cvNotes      = doc.getElementById("cvNotes");
  // Description section (mailing lists only)
  cvData.cvbDescription      = doc.getElementById("cvbDescription");
  cvData.cvhDescription      = doc.getElementById("cvhDescription");
  cvData.cvDescription      = doc.getElementById("cvDescription");
  // Addresses section (mailing lists only)
  cvData.cvbAddresses      = doc.getElementById("cvbAddresses");
  cvData.cvhAddresses      = doc.getElementById("cvhAddresses");
  cvData.cvAddresses      = doc.getElementById("cvAddresses");
  // Phone section
  cvData.cvbPhone      = doc.getElementById("cvbPhone");
  cvData.cvhPhone      = doc.getElementById("cvhPhone");
  cvData.cvPhWork      = doc.getElementById("cvPhWork");
  cvData.cvPhHome      = doc.getElementById("cvPhHome");
  cvData.cvPhFax      = doc.getElementById("cvPhFax");
  cvData.cvPhCellular    = doc.getElementById("cvPhCellular");
  cvData.cvPhPager    = doc.getElementById("cvPhPager");
  // Work section
  cvData.cvbWork      = doc.getElementById("cvbWork");
  cvData.cvhWork      = doc.getElementById("cvhWork");
  cvData.cvJobTitle    = doc.getElementById("cvJobTitle");
  cvData.cvDepartment    = doc.getElementById("cvDepartment");
  cvData.cvCompany    = doc.getElementById("cvCompany");
  cvData.cvWorkAddress  = doc.getElementById("cvWorkAddress");
  cvData.cvWorkAddress2  = doc.getElementById("cvWorkAddress2");
  cvData.cvWorkCityStZip  = doc.getElementById("cvWorkCityStZip");
  cvData.cvWorkCountry  = doc.getElementById("cvWorkCountry");
  cvData.cvbWorkMapItBox  = doc.getElementById("cvbWorkMapItBox");
  cvData.cvWorkMapIt = doc.getElementById("cvWorkMapIt");
  cvData.cvWorkWebPageBox = doc.getElementById("cvWorkWebPageBox");
  cvData.cvWorkWebPage  = doc.getElementById("cvWorkWebPage");
  cvData.cvbPhoto = doc.getElementById("cvbPhoto");
  cvData.cvPhoto  = doc.getElementById("cvPhoto");
  
  
  
  
  
  
  
      let abManager = Components.classes["@mozilla.org/abmanager;1"]  
                          .getService(Components.interfaces.nsIAbManager);  
  
let allAddressBooks = abManager.directories;   
  
while (allAddressBooks.hasMoreElements()) {  
  let addressBook = allAddressBooks.getNext()  
                                   .QueryInterface(Components.interfaces.nsIAbDirectory );  
  if (addressBook instanceof Components.interfaces.nsIAbDirectory ) { // or nsIAbItem or nsIAbCollection  
     //alert ("Directory Name:" + addressBook.dirName);
   // alert("Address Name : "+addressBook.)
      //alert("111");
      let card = addressBook.cardForEmailAddress("maxime.denoyer@gmail.com");
      if(card != null){
      //alert(card.getProperty("FirstName","Vide"));
      card.setProperty("IdentityLink", "moi@moi.moi");
      //alert(card.getProperty("IdentityLink","Vide"));
      addressBook.modifyCard(card);  
      }
  }  
}
//moz-abmdbdirectory://history.mab
      let abManager2 = Components.classes["@mozilla.org/abmanager;1"]  
                          .getService(Components.interfaces.nsIAbManager);  
  
let allAddressBooks2 = abManager2.directories;   

while (allAddressBooks2.hasMoreElements()) {  
  let addressBook = allAddressBooks2.getNext()  
                                   .QueryInterface(Components.interfaces.nsIAbDirectory );  
  if (addressBook instanceof Components.interfaces.nsIAbDirectory )
  { // or nsIAbItem or nsIAbCollection
    if(addressBook.URI == "moz-abmdbdirectory://history.mab")
    {
     
      let uncarnet = addressBook.childCards;
      while (uncarnet.hasMoreElements())
      {
        let contact = uncarnet.getNext().QueryInterface(Components.interfaces.nsISupports);
        if (contact instanceof Components.interfaces.nsISupports)
        {
          let card = contact.QueryInterface(Components.interfaces.nsIAbCard);
          if (card instanceof Components.interfaces.nsIAbCard)
          {

//alert(card.getProperty("IdentityLink", null));

          }
        }
      }  
    }
  }
    
}

}


function DisplayCardViewPane(realCard)
{
  var generatedName = realCard.generateName(gPrefs.getIntPref("mail.addr_book.lastnamefirst"));

  // This will become neater when bug 312116 is fixed...
  // (card.property instead of card.getProperty("Property"))
  var card = { getProperty : function (prop) {
                 return realCard.getProperty(prop, "");
               },
               primaryEmail : realCard.primaryEmail,
               displayName : realCard.displayName,
               isMailList : realCard.isMailList,
               mailListURI : realCard.mailListURI
  };

  var data = top.cvData;
  var visible;

  // Contact photo
  displayPhoto(card, cvData.cvPhoto);

  var titleString;
  if (generatedName == "")
    titleString = card.primaryEmail;  // if no generatedName, use email
  else
    titleString = generatedName;

  // set fields in card view pane
  if (card.isMailList)
    cvSetNode(data.CardTitle, gAddressBookBundle.getFormattedString("viewListTitle", [generatedName]));
  else
    cvSetNode(data.CardTitle, titleString);

  // Contact section
  cvSetNodeWithLabel(data.cvNickname, zNickname, card.getProperty("NickName"));

  if (card.isMailList) {
    // email1, display name and screenname always hidden when a mailing list.
    cvSetVisible(data.cvDisplayName, false);
    cvSetVisible(data.cvEmail1Box, false);
    cvSetVisible(data.cvScreennameBox, false);

    visible = HandleLink(data.cvListName, zListName, card.displayName, data.cvListNameBox, "mailto:" + encodeURIComponent(GenerateAddressFromCard(card))) || visible;
  }
  else {
    // listname always hidden if not a mailing list
    cvSetVisible(data.cvListNameBox, false);

    cvSetNodeWithLabel(data.cvDisplayName, zDisplayName, card.displayName);

    visible = HandleLink(data.cvEmail1, zPrimaryEmail, card.primaryEmail, data.cvEmail1Box, "mailto:" + card.primaryEmail) || visible;
  }

  var goimURL = "aim:goim?screenname=" + card.getProperty("_AimScreenName");
  var hasScreenName = HandleLink(data.cvScreenname, zScreenName,
                                 card.getProperty("_AimScreenName"),
                                 data.cvScreennameBox, goimURL);

   visible = hasScreenName || visible;
   visible = HandleLink(data.cvEmail2, zSecondaryEmail,
                        card.getProperty("SecondEmail"), data.cvEmail2Box,
                        "mailto:" + card.getProperty("SecondEmail")) || visible;

   visible = cvSetNodeWithLabel(data.cvIdentityLink, zIdentityLink,card.getProperty("IdentityLink")) ||
             visible;


   // Home section
   visible = cvSetNode(data.cvHomeAddress, card.getProperty("HomeAddress"));
   visible = cvSetNode(data.cvHomeAddress2, card.getProperty("HomeAddress2")) ||
             visible;
             

   visible = cvSetCityStateZip(data.cvHomeCityStZip,
                               card.getProperty("HomeCity"),
                               card.getProperty("HomeState"),
                               card.getProperty("HomeZipCode")) || visible;
   visible = cvSetNode(data.cvHomeCountry, card.getProperty("HomeCountry")) ||
             visible;
   if (visible) {
     var homeMapItUrl = CreateMapItURL(
                                       card.getProperty("HomeAddress"),
                                       card.getProperty("HomeAddress2"),
                                       card.getProperty("HomeCity"),
                                       card.getProperty("HomeState"),
                                       card.getProperty("HomeZipCode"),
                                       card.getProperty("HomeCountry"));
    if (homeMapItUrl) {
       cvSetVisible(data.cvbHomeMapItBox, true);
       data.cvHomeMapIt.setAttribute('url', homeMapItUrl);
    } else {
       cvSetVisible(data.cvbHomeMapItBox, false);
    }
  } else {
    cvSetVisible(data.cvbHomeMapItBox, false);
  }

  visible = HandleLink(data.cvHomeWebPage, "", card.getProperty("WebPage2"),
                       data.cvHomeWebPageBox, card.getProperty("WebPage2")) ||
            visible;

  cvSetVisible(data.cvhHome, visible);
  cvSetVisible(data.cvbHome, visible);
  if (card.isMailList) {
    // Description section
    visible = cvSetNode(data.cvDescription, card.getProperty("Notes"))
    cvSetVisible(data.cvbDescription, visible);

    // Addresses section
    visible = cvAddAddressNodes(data.cvAddresses, card.mailListURI);
    cvSetVisible(data.cvbAddresses, visible);

    // Other section, not shown for mailing lists.
    cvSetVisible(data.cvbOther, false);
  }
  else {
    // Other section
    // setup the birthday information
    var day = card.getProperty("BirthDay", null);
    var month = card.getProperty("BirthMonth", null);
    var year = card.getProperty("BirthYear", null);
    var dateStr;
    if (day > 0 && day < 32 && month > 0 && month < 13) {
      var date = new Date(year, month - 1, day);
      // if the year exists, just use Date.toLocaleString
      if (year) {
        date.setFullYear(year);
        dateStr = date.toLocaleDateString();
      }
      // if the year doesn't exist, display Month DD (ex. January 01)
      else
        dateStr = date.toLocaleFormat(gAddressBookBundle.getString("dateformat"));
    }
    else if (year)
      dateStr = year;
    visible = cvSetNodeWithLabel(data.cvBirthday, zBirthday, dateStr);

    visible = cvSetNodeWithLabel(data.cvCustom1, zCustom1,
                                 card.getProperty("Custom1")) || visible;
    visible = cvSetNodeWithLabel(data.cvCustom2, zCustom2,
                                 card.getProperty("Custom2")) || visible;
    visible = cvSetNodeWithLabel(data.cvCustom3, zCustom3,
                                 card.getProperty("Custom3")) || visible;
    visible = cvSetNodeWithLabel(data.cvCustom4, zCustom4,
                                 card.getProperty("Custom4")) || visible;
    visible = cvSetNode(data.cvNotes, card.getProperty("Notes")) || visible;
    visible = setBuddyIcon(card, data.cvBuddyIcon) || visible;

    cvSetVisible(data.cvhOther, visible);
    cvSetVisible(data.cvbOther, visible);

    // hide description section, not show for non-mailing lists
    cvSetVisible(data.cvbDescription, false);

    // hide addresses section, not show for non-mailing lists
    cvSetVisible(data.cvbAddresses, false);
  }

  // Phone section
  visible = cvSetNodeWithLabel(data.cvPhWork, zWork,
                               card.getProperty("WorkPhone"));
  visible = cvSetNodeWithLabel(data.cvPhHome, zHome,
                               card.getProperty("HomePhone")) || visible;
  visible = cvSetNodeWithLabel(data.cvPhFax, zFax,
                               card.getProperty("FaxNumber")) || visible;
  visible = cvSetNodeWithLabel(data.cvPhCellular, zCellular,
                               card.getProperty("CellularNumber")) || visible;
  visible = cvSetNodeWithLabel(data.cvPhPager, zPager,
                               card.getProperty("PagerNumber")) || visible;
  cvSetVisible(data.cvhPhone, visible);
  cvSetVisible(data.cvbPhone, visible);
  // Work section
  visible = cvSetNode(data.cvJobTitle, card.getProperty("JobTitle"));
  visible = cvSetNode(data.cvDepartment, card.getProperty("Department")) ||
            visible;
  visible = cvSetNode(data.cvCompany, card.getProperty("Company")) || visible;

  var addressVisible = cvSetNode(data.cvWorkAddress,
                                 card.getProperty("WorkAddress"));
  addressVisible = cvSetNode(data.cvWorkAddress2,
                             card.getProperty("WorkAddress2")) ||
                   addressVisible;
  addressVisible = cvSetCityStateZip(data.cvWorkCityStZip,
                                     card.getProperty("WorkCity"),
                                     card.getProperty("WorkState"),
                                     card.getProperty("WorkZipCode")) ||
                   addressVisible;
  addressVisible = cvSetNode(data.cvWorkCountry,
                             card.getProperty("WorkCountry")) || addressVisible;

        if (addressVisible) {
          var workMapItUrl = CreateMapItURL(card.getProperty("WorkAddress"),
                                            card.getProperty("WorkAddress2"),
                                            card.getProperty("WorkCity"),
                                            card.getProperty("WorkState"),
                                            card.getProperty("WorkZipCode"),
                                            card.getProperty("WorkCountry"));
          data.cvWorkMapIt.setAttribute('url', workMapItUrl);
          if (workMapItUrl) {
      cvSetVisible(data.cvbWorkMapItBox, true);
            data.cvWorkMapIt.setAttribute('url', workMapItUrl);
          }
          else {
      cvSetVisible(data.cvbWorkMapItBox, false);
          }
        }
        else {
    cvSetVisible(data.cvbWorkMapItBox, false);
        }

        visible = HandleLink(data.cvWorkWebPage, "",
                             card.getProperty("WebPage1"),
                             data.cvWorkWebPageBox,
                             card.getProperty("WebPage1")) || addressVisible ||
                             visible;

  cvSetVisible(data.cvhWork, visible);
  cvSetVisible(data.cvbWork, visible);

  // make the card view box visible
  cvSetVisible(top.cvData.CardViewBox, true);
}
