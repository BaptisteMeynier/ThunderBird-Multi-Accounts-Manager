//
//
/////////////////////////
///*var treeView = {
//
//    get rowCount() {
//        return this._rowMap.length;
//    },
//    getCellText : function(aRow,aCol){
//      if (aCol.id == "IdentityLink") return "OKKKKKK";
//      else return this._rowMap[aRow].getText(aCol.id);
//    },
//    setTree: function(treebox){ this.treebox = treebox; },
//    isContainer: function(row){ return false; },
//    isSeparator: function(row){ return false; },
//    isSorted: function(){ return false; },
//    getLevel: function(row){ return 0; },
//    getImageSrc: function(row,col){ return null; },
//    getRowProperties: function(row,props){},
//    getCellProperties: function(row,col,props){},
//    getColumnProperties: function(colid,col,props){}
//   
//};*/
//////////////////////////////////////////////////////////////////////////////////////
//function SetAbView(aURI)
//{
//  // If we don't have a URI, just clear the view and leave everything else
//  // alone.
//  if (!aURI) {
//    gAbView.clearView();
//    return;
//  }
//
//  // If we do have a URI, we want to allow updating the review even if the
//  // URI is the same, as the search results may be different.
//
//  var sortColumn = kDefaultSortColumn;
//  var sortDirection = kDefaultAscending;
//
//  if (!gAbResultsTree) {
//    gAbResultsTree = document.getElementById("abResultsTree");
//    gAbResultsTree.controllers.appendController(ResultsPaneController);
//  }
//
//  if (gAbView) {
//    sortColumn = gAbView.sortColumn;
//    sortDirection = gAbView.sortDirection;
//  }
//  else {
//    if (gAbResultsTree.hasAttribute("sortCol"))
//      sortColumn = gAbResultsTree.getAttribute("sortCol");
//    var sortColumnNode = document.getElementById(sortColumn);
//    if (sortColumnNode && sortColumnNode.hasAttribute("sortDirection"))
//      sortDirection = sortColumnNode.getAttribute("sortDirection");
//  }
//
//  var directory = GetDirectoryFromURI(aURI);
//  if (!gAbView)
//    gAbView = Components.classes["@mozilla.org/addressbook/abview;1"]
//                        .createInstance(Components.interfaces.nsIAbView);
//
//  var actualSortColumn = gAbView.setView(directory, GetAbViewListener(),
//					 sortColumn, sortDirection);
//
//gAbResultsTree.treeBoxObject.view =
//        gAbView.QueryInterface(Components.interfaces.nsITreeView);
//        alert(gAbResultsTree.treeBoxObject.view);
//  gAbResultsTree.treeBoxObject.view.nsITreeView.prototype = {
//    getCellText : function(row,column){
//      if (column.id == "IdentityLink") return "OKKKKKK";
//      else return "18 février";
//    }
//    }
//alert(gAbResultsTree.treeBoxObject.view.nsITreeView.getCellText);
//  UpdateSortIndicators(actualSortColumn, sortDirection);
//}
//
///*
// function MyView(parentView) { ... this._parentView = parentView; }
//MyView.prototype.getCellText = function(row, column) { if (column == ma_colonne) { return le_texte_qui_va_bien } else return this._parentView.getCellText(row, column) } }
//gAbResultsTree.treeBoxObject.view = new MyView(gAbResultsTree.treeBoxObject.view)*/
