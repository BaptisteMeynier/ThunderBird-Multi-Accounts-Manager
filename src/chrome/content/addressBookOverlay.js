
    if(!String.prototype.trim) {  
      String.prototype.trim = function () {  
        return this.replace(/^\s+|\s+$/g,'');  
      };  
    }  


////////////////////////////////////////////////////////////////////////
// Overlay of the function OnLoadCardView                             //
// From : chrome://messenger/content/addressbook/abCardViewOverlay.js //
////////////////////////////////////////////////////////////////////////

// Storage of the function into a local variable
let OriginalOnLoadCardView = OnLoadCardView;

// Declaration of the variable which will store the label of the new field
var zIdentityLink;

// Overlay Function
var OnLoadCardView = function()
{ 
  //Call of the original function
  OriginalOnLoadCardView.apply();
  
  //Adding of the field IdentityLink
  let stringBundle = document.getElementById("identitymanager-string-bundle");
  zIdentityLink = stringBundle.getString("IdentityManager.addressBook.propertyIdentityLink");
  cvData.cvIdentityLinkBox    = document.getElementById("cvIdentityLinkBox");
  cvData.cvIdentityLink = document.getElementById("cvIdentityLink");
};



/////////////////////////////////////////////////////////////////////////
// Overlay of the function OnLoadCardView                              //
// From : chrome://messenger/content/addressbook/abCardViewOverlay.js  //
/////////////////////////////////////////////////////////////////////////


/**
 * tries to store the overlay function to call its after in order to gain line code, without success ...
 */
/*
var OriginalDisplayCardViewPane = DisplayCardViewPane;

var DisplayCardViewPane = function(realCard)
{

 // var aCard = realCard;
  OriginalDisplayCardViewPane.apply(realCard);
  let gAccountManager = Components.classes["@mozilla.org/messenger/account-manager;1"]
                                    .getService(Components.interfaces.nsIMsgAccountManager);      
  let displayLink = gAccountManager.getIdentity(card.getProperty("IdentityLink", null)).email;
   visible = cvSetNodeWithLabel(data.cvIdentityLink, zIdentityLink,displayLink) ||
             visible;
 cvSetVisible(top.cvData.CardViewBox, true);

};*/

//see the middle of the function
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


//////////////////////////////////////////////////////////////////////////////////////////////////
//                                        OVERLAY                                               //
//////////////////////////////////////////////////////////////////////////////////////////////////
  let gAccountManager = Components.classes["@mozilla.org/messenger/account-manager;1"]
                          .getService(Components.interfaces.nsIMsgAccountManager);
  if(card.getProperty("IdentityLink", null))
  {
    let displayLink = gAccountManager.getIdentity(card.getProperty("IdentityLink", null)).email;
     visible = HandleLink(data.cvIdentityLink, zIdentityLink,
                          displayLink,data.cvIdentityLinkBox,
                          "mailto:" + displayLink) || visible;
  }
  else
  {
    cvSetVisible(data.cvIdentityLinkBox, false);
  }
//////////////////////////////////////////////////////////////////////////////////////////////////
//                                     END    OVERLAY                                           //
//////////////////////////////////////////////////////////////////////////////////////////////////  

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

