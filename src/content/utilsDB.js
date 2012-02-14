
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

  dBName : "TBMAM.sqlite",
  
  directory : "ProfD",
  
  main : function()
  {
    
 
      this.createDB();
      this.insertAccount("Baptiste Meynier", "baptiste.meynier@gmail.com");
      this.insertContact("Baptiste Meynier", "baptiste.meynier@gmail.com",1);
      this.insertContact("Maxime Denoyer", "Maxime.Denoyer@gmail.com",1);
      this.insertAccount("Johan Jans", "johan.jans@gmail.com");
      this.insertContact("Quentin Duplaix", "Quentin.duplaix@gmail.com",2);
      this.insertContact("Pauline Lopez", "Pauline.lopez@gmail.com",2);
   /*   this.getAccounts();
      this.getContactsFromAccount(1);
      this.getContactsFromAccount(2);

      this.contactFound('Maxime Denoyer','Maxime.Denoyer@gmaifgfgl.com');
      this.contactFound('Maxime Denoyer','Maxime.Denoyer@gmail.com');      
      this.contactFoundForAccount("Maxime Denoyer","maxime.denoyer@gmail.com",2);
      this.deleteContact(1);
      this.contactFoundForAccount("Baptiste Meynier", "baptiste.meynier@gmail.com",1);
      this.deleteAccount(1);
      this.getAccounts();
      this.getAccountId("Johan Jans", "johan.jans@gmail.com");
      this.updateContact(3,'Gerard Baste',"gerard.baste@gmail.com");
      this.getContactsFromAccount(2);*/

  },
  
  createDB : function()
  {
    let file = FileUtils.getFile(this.directory, [this.dBName]);
    let mDBConn = Services.storage.openDatabase(file);
    
    mDBConn.executeSimpleSQL("DROP TABLE IF EXISTS contact");
    mDBConn.executeSimpleSQL("DROP TABLE IF EXISTS account");
    
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
  
  
  getAccounts : function ()
  {
    let file = FileUtils.getFile(this.directory, [this.dBName]);
    let mDBConn = Services.storage.openDatabase(file);
    
    let statement = mDBConn.createStatement("SELECT * FROM account");  
    
    statement.executeAsync({  
      handleResult: function(aResultSet) {  
        for (let row = aResultSet.getNextRow(); row; row = aResultSet.getNextRow())
        {
          let value1 = row.getResultByName("id_account");
          let value2 = row.getResultByName("name_account");
          let value3 = row.getResultByName("address_account");
          alert("getAccounts : " + value1 + ", " + value2 + ", " + value3);
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
  
  getAccountId : function (name_account, address_account)
  {
    let file = FileUtils.getFile(this.directory, [this.dBName]);
    let mDBConn = Services.storage.openDatabase(file);
    
    let statement = mDBConn.createStatement(
        "SELECT id_account FROM account WHERE name_account = :name_account AND address_account = :address_account");  
    statement.params.name_account = name_account;
    statement.params.address_account = address_account;
    
    statement.executeAsync({
      handleResult: function(aResultSet) {
        let value = "";
        for (let row = aResultSet.getNextRow(); row; row = aResultSet.getNextRow())
        {
          value = row.getResultByName("id_account");
        }
        alert("getAccountId : " + value);
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
  
  getContactId : function (name_contact, address_contact)
  {
    let file = FileUtils.getFile(this.directory, [this.dBName]);
    let mDBConn = Services.storage.openDatabase(file);

    let statement = mDBConn.createStatement(
        "SELECT id_contact FROM contact WHERE name_contact = :name_contact AND address_contact = :address_contact");  
    statement.params.name_contact = name_contact;
    statement.params.address_contact = address_contact;
    
    statement.executeAsync({
      handleResult: function(aResultSet) {
        let value = "";
        for (let row = aResultSet.getNextRow(); row; row = aResultSet.getNextRow())
        {
          value = row.getResultByName("id_account");
        }
        alert("getContactId : " + value)
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
  
  getContactsFromAccount : function (id_account)
  {
    let file = FileUtils.getFile(this.directory, [this.dBName]);
    let mDBConn = Services.storage.openDatabase(file);
    
    let statement = mDBConn.createStatement("SELECT * FROM contact WHERE link_account = :id_account");  
    statement.params.id_account = id_account;
    
    statement.executeAsync({  
      handleResult: function(aResultSet) {  
        for (let row = aResultSet.getNextRow(); row; row = aResultSet.getNextRow())
        {  
          let value1 = row.getResultByName("name_contact");
          let value2 = row.getResultByName("address_contact");
          let value3 = row.getResultByName("link_account");
          alert("getContactsFromAccount : " + value1 + ", " + value2 + ", " + value3 );
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
    let file = FileUtils.getFile(this.directory, [this.dBName]);
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
    let file = FileUtils.getFile(this.directory, [this.dBName]);
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
    let file = FileUtils.getFile(this.directory, [this.dBName]);
    let mDBConn = Services.storage.openDatabase(file);
    
    mDBConn.executeSimpleSQL(
        "INSERT INTO account (name_account, address_account) VALUES " +
        "('" + name_account + "','" + address_account + "')"
        );

    mDBConn.close();
  },
  
  insertContact: function(name_contact, address_contact, id_account)
  {
    let file = FileUtils.getFile(this.directory, [this.dBName]);
    let mDBConn = Services.storage.openDatabase(file);
    
    mDBConn.executeSimpleSQL(
        "INSERT INTO contact (name_contact, address_contact, link_account) VALUES "+
        "('" + name_contact + "','"  + address_contact + "'," + id_account + ")");
    mDBConn.close();
    },
    
  updateContact: function(id_contact, name_contact, address_contact)
  {
    let file = FileUtils.getFile(this.directory, [this.dBName]);
    let mDBConn = Services.storage.openDatabase(file);
    
    mDBConn.executeSimpleSQL(
        "UPDATE contact SET name_contact = '" + name_contact + "', address_contact = '" + address_contact  + "' " +
        "WHERE link_account = " + id_contact
        );

    mDBConn.close();
  },
  
  deleteAccount:function(id_account)
  {
    let file = FileUtils.getFile(this.directory, [this.dBName]);
    let mDBConn = Services.storage.openDatabase(file);
    
    mDBConn.executeSimpleSQL("DELETE FROM contact WHERE link_account = " + id_account);
    mDBConn.executeSimpleSQL("DELETE FROM account WHERE id_account = " + id_account);
    mDBConn.close();
  },
  
  deleteContact:function(id_contact)
  {
    let file = FileUtils.getFile(this.directory, [this.dBName]);
    let mDBConn = Services.storage.openDatabase(file);
    
    mDBConn.executeSimpleSQL("DELETE FROM contact WHERE id_contact = " + id_contact);
    mDBConn.close();
  }
  
  
};
