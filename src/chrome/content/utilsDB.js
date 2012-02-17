
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
  
  _nbAccounts : 0,
  
  main : function()
  {
    this.initDB();
    this.loadAccount();    
  },
  
  initDB : function()
  {
    let file = FileUtils.getFile(this._directory, [this._dBName]);
    let mDBConn = Services.storage.openDatabase(file);
    
    mDBConn.executeSimpleSQL(
        "CREATE TABLE IF NOT EXISTS account"+
        "(" +
            "id_account INTEGER PRIMARY KEY, " +
            "name_account TEXT, " +
            "address_account TEXT"+
        ")");

    mDBConn.executeSimpleSQL(
        "CREATE TABLE IF NOT EXISTS contact" +
        "(" +
            "id_contact INTEGER PRIMARY KEY, " +
            "name_contact TEXT, " +
            "address_contact TEXT, " +
            "link_account INTEGER, " +
            "FOREIGN KEY (link_account) REFERENCES account(id_account)" +
        ")");
    
    mDBConn.close();
  },
  loadAccount: function ()
  {
    let file = FileUtils.getFile(this._directory, [this._dBName]);
    let mDBConn = Services.storage.openDatabase(file);
    
    let statement = mDBConn.createStatement(
        "SELECT count(*) AS total_account FROM account");
    
    statement.executeAsync({  
      handleResult: function(aResultSet) {
        XULUtils.DB._nbAccounts = aResultSet.getNextRow().getResultByName("total_account");
        gAccountManager = Components.classes["@mozilla.org/messenger/account-manager;1"]
          .getService(Components.interfaces.nsIMsgAccountManager);
        let identities = gAccountManager.allIdentities;
        
        if (XULUtils.DB._nbAccounts != identities.Count())
        {
          for (let j = XULUtils.DB._nbAccounts ; j < identities.Count(); j++)
          {
            name = identities.QueryElementAt(j, Components.interfaces.nsIMsgIdentity).fullName;
            email = identities.QueryElementAt(j, Components.interfaces.nsIMsgIdentity).email;
            XULUtils.DB.insertAccount(name,email);
          }
        }
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
  contactFound: function (name_contact, address_contact)
  {
    let file = FileUtils.getFile(this._directory, [this._dBName]);
    let mDBConn = Services.storage.openDatabase(file);
    
    let statement = mDBConn.createStatement(
        "SELECT count(*) AS total FROM contact WHERE name_contact = :name_contact AND address_contact = :address_contact");
    statement.params.name_contact = name_contact;
    statement.params.address_contact = address_contact;
    
    statement.executeAsync({  
      handleResult: function(aResultSet) {
        alert("contactFound : " + (aResultSet.getNextRow().getResultByName("total")!=0)); 
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
  
  contactFoundForAccount: function (name_contact, address_contact, id_account)
  {
    let file = FileUtils.getFile(this._directory, [this._dBName]);
    let mDBConn = Services.storage.openDatabase(file);
    
    let statement = mDBConn.createStatement(
        "SELECT count(*) AS total FROM contact WHERE link_account = :id_account AND " +
        "name_contact = :name_contact AND address_contact = :address_contact"
        );
    statement.params.name_contact = name_contact;
    statement.params.address_contact = address_contact;
    statement.params.id_account = id_account;
    
    statement.executeAsync({  
      handleResult: function(aResultSet) {
        alert("contactFoundForAccount : " + (aResultSet.getNextRow().getResultByName("total")!=0)); 
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
  
  insertAccount: function(name_account, address_account)
  {
    let file = FileUtils.getFile(this._directory, [this._dBName]);
    let mDBConn = Services.storage.openDatabase(file);
    
    mDBConn.executeSimpleSQL(
        "INSERT INTO account (name_account, address_account) VALUES " +
        "('" + name_account + "','" + address_account + "')"
        );

    mDBConn.close();
  },
  
  insertContact: function(name_contact, address_contact, id_account)
  {
    let file = FileUtils.getFile(this._directory, [this._dBName]);
    let mDBConn = Services.storage.openDatabase(file);
    
    mDBConn.executeSimpleSQL(
        "INSERT INTO contact (name_contact, address_contact, link_account) VALUES "+
        "('" + name_contact + "','"  + address_contact + "'," + id_account + ")");
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
  
  deleteAccount:function(id_account)
  {
    let file = FileUtils.getFile(this._directory, [this._dBName]);
    let mDBConn = Services.storage.openDatabase(file);
    
    mDBConn.executeSimpleSQL("DELETE FROM contact WHERE link_account = " + id_account);
    mDBConn.executeSimpleSQL("DELETE FROM account WHERE id_account = " + id_account);
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
