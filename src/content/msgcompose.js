/**
 * ThunderBirdMultiAccountsManagerChrome namespace.
 */


if ("undefined" == typeof(ThunderBirdMultiAccountsManagerChrome)) {
  var ThunderBirdMultiAccountsManagerChrome = {};
};

/**
 * Controls the browser overlay for the checking contacts before sending
 */
ThunderBirdMultiAccountsManagerChrome = {
  
    // helper method
  g: function(v) { 
	if(typeof(v) == "object")
		return v;
	else
		return document.getElementById(v); 
  },
  
  /**
   * Adding an EventListener on the button send message when it was clicked 
   */
  onLoad: function() { 
	this.g("button-send").addEventListener("click", function(e) { ThunderBirdMultiAccountsManagerChrome.onSendButtonClick(); }, true);
  },
  
  /**
   * Do an action when the button was clicked
   */
  onSendButtonClick: function() {
    window.alert("I'm here");
  }
};

