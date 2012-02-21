
const Cc = Components.classes;
const Ci = Components.interfaces;
const Cu = Components.utils;

/**
* XULUtilsDB namespace.
*/
if ("undefined" == typeof(XULUtils)) {
  var XULUtils = {};
};


Cu.import("resource://gre/modules/Services.jsm");  
Cu.import("resource://gre/modules/FileUtils.jsm");

/**
* 
*/
XULUtils.DB = {

  _dBName : "ThunderBirdMultiAccountsManager.sqlite",
  
  _directory : "ProfD",


  filExist : function ()
  {
        return FileUtils.getFile(this._directory, [this._dBName]).exists();
  },
  initDB : function()
  {
    this.createDB();
    this.loadIdentities();    
  },
  
  createDB : function()
  {
    let file = FileUtils.getFile(this._directory, [this._dBName]);
    let mDBConn = Services.storage.openDatabase(file);
    
    mDBConn.executeSimpleSQL(
        "CREATE TABLE IF NOT EXISTS identity"+
        "(" +
            "id_identity INTEGER PRIMARY KEY, " +
            "name_identity TEXT, " +
            "address_identity TEXT"+
        ")");

    mDBConn.executeSimpleSQL(
        "CREATE TABLE IF NOT EXISTS contact" +
        "(" +
            "id_contact INTEGER PRIMARY KEY, " +
            "name_contact TEXT, " +
            "address_contact TEXT, " +
            "link_identity INTEGER, " +
            "FOREIGN KEY (link_identity) REFERENCES identity(id_identity)" +
        ")");
    
    mDBConn.close();
  },
  loadIdentities: function ()
  {
    let gAccountManager = Components.classes["@mozilla.org/messenger/account-manager;1"]
      .getService(Components.interfaces.nsIMsgAccountManager);
    let identities = gAccountManager.allIdentities;
        
    for (let j = 0 ; j < identities.Count(); j++)
    {
      name = identities.QueryElementAt(j, Components.interfaces.nsIMsgIdentity).fullName;
      email = identities.QueryElementAt(j, Components.interfaces.nsIMsgIdentity).email;
      XULUtils.DB.insertIdentity(name,email);
    }
  },
  contactFound: function (name_contact, address_contact)
  {
    let file = FileUtils.getFile(this._directory, [this._dBName]);
    let mDBConn = Services.storage.openDatabase(file);
    
    let statement = mDBConn.createStatement(
        "SELECT count(*) AS total_contact FROM contact WHERE name_contact = :name_contact AND address_contact = :address_contact");
    statement.params.name_contact = name_contact;
    statement.params.address_contact = address_contact;
    
    statement.executeAsync({  
      handleResult: function(aResultSet) {
        alert("contactFound : " + (aResultSet.getNextRow().getResultByName("total_contact")!=0)); 
      },
      
      handleError: function(aError) {  
        print("Error: " + aError.message);  
      },  
  
      handleCompletion: function(aReason) {  
        if (aReason != Components.interfaces.mozIStorageStatementCallback.REASON_FINISHED)  
        print("Query canceled or aborted!");  
      }  
    }); 
  },
  
  contactFoundForIdentity: function (name_contact, address_contact, id_identity)
  {
    let file = FileUtils.getFile(this._directory, [this._dBName]);
    let mDBConn = Services.storage.openDatabase(file);
    
    let statement = mDBConn.createStatement(
        "SELECT count(*) AS total_contact FROM contact WHERE link_identity = :id_identity AND " +
        "name_contact = :name_contact AND address_contact = :address_contact"
        );
    statement.params.name_contact = name_contact;
    statement.params.address_contact = address_contact;
    statement.params.id_identity = id_identity;
    
    statement.executeAsync({  
      handleResult: function(aResultSet) {
        alert("contactFoundForIdentity : " + (aResultSet.getNextRow().getResultByName("total_identity")!=0)); 
      },  
  
      handleError: function(aError) {  
        print("Error: " + aError.message);  
      },  
  
      handleCompletion: function(aReason) {  
        if (aReason != Components.interfaces.mozIStorageStatementCallback.REASON_FINISHED)  
        print("Query canceled or aborted!");  
      }  
    }); 
  },
  
  insertIdentity: function(name_identity, address_identity)
  {
    let file = FileUtils.getFile(this._directory, [this._dBName]);
    let mDBConn = Services.storage.openDatabase(file);
    
    mDBConn.executeSimpleSQL(
        "INSERT INTO identity (name_identity, address_identity) VALUES " +
        "('" + name_identity + "','" + address_identity + "')"
        );

    mDBConn.close();
  },
  
  insertContact: function(name_contact, address_contact, id_identity)
  {
    let file = FileUtils.getFile(this._directory, [this._dBName]);
    let mDBConn = Services.storage.openDatabase(file);
    
    mDBConn.executeSimpleSQL(
        "INSERT INTO contact (name_contact, address_contact, link_identity) VALUES "+
        "('" + name_contact + "','"  + address_contact + "'," + id_identity + ")");
    mDBConn.close();
    },
  updateIdentity: function(id_identity, name_identity, address_identity)
  {
    let file = FileUtils.getFile(this._directory, [this._dBName]);
    let mDBConn = Services.storage.openDatabase(file);
    
    mDBConn.executeSimpleSQL(
        "UPDATE identity SET name_identity = '" + name_identity + "', address_identity = '" + address_identity  + "' " +
        "WHERE id_identity = " + id_identity
        );

    mDBConn.close();
  },
    
  updateContact: function(id_contact, name_contact, address_contact)
  {
    let file = FileUtils.getFile(this._directory, [this._dBName]);
    let mDBConn = Services.storage.openDatabase(file);
    
    mDBConn.executeSimpleSQL(
        "UPDATE contact SET name_contact = '" + name_contact + "', address_contact = '" + address_contact  + "' " +
        "WHERE id_contact = " + id_contact
        );

    mDBConn.close();
  },
  
  deleteIdentity:function(id_identity)
  {
    let file = FileUtils.getFile(this._directory, [this._dBName]);
    let mDBConn = Services.storage.openDatabase(file);
    
    mDBConn.executeSimpleSQL("DELETE FROM contact WHERE link_identity = " + id_identity);
    mDBConn.executeSimpleSQL("DELETE FROM identity WHERE id_identity = " + id_identity);
    mDBConn.close();
  },
  
  deleteContact:function(id_contact)
  {
    let file = FileUtils.getFile(this._directory, [this._dBName]);
    let mDBConn = Services.storage.openDatabase(file);
    
    mDBConn.executeSimpleSQL("DELETE FROM contact WHERE id_contact = " + id_contact);
    mDBConn.close();
  }
  
  
};
