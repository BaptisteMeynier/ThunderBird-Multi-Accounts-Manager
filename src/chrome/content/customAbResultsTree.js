
////////////////////////////////////////////////////////////////



/*
function SetAbView(aURI)
{
  // If we don't have a URI, just clear the view and leave everything else
  // alone.
  if (!aURI) {
    gAbView.clearView();
    return;
  }

  // If we do have a URI, we want to allow updating the review even if the
  // URI is the same, as the search results may be different.

  var sortColumn = kDefaultSortColumn;
  var sortDirection = kDefaultAscending;

  if (!gAbResultsTree) {
    gAbResultsTree = document.getElementById("abResultsTree");
    gAbResultsTree.controllers.appendController(ResultsPaneController);
  }

  if (gAbView) {
    sortColumn = gAbView.sortColumn;
    sortDirection = gAbView.sortDirection;
  }
  else {
    if (gAbResultsTree.hasAttribute("sortCol"))
      sortColumn = gAbResultsTree.getAttribute("sortCol");
    var sortColumnNode = document.getElementById(sortColumn);
    if (sortColumnNode && sortColumnNode.hasAttribute("sortDirection"))
      sortDirection = sortColumnNode.getAttribute("sortDirection");
  }

  var directory = GetDirectoryFromURI(aURI);

  if (!gAbView)
    gAbView = Components.classes["@mozilla.org/addressbook/abview;1"]
                        .createInstance(Components.interfaces.nsIAbView);


  var actualSortColumn = gAbView.setView(directory, GetAbViewListener(),
					 sortColumn, sortDirection);

  gAbResultsTree.treeBoxObject.view = //new PROTO_TREE_VIEW();
    gAbView.QueryInterface(Components.interfaces.nsITreeView);
    
 //   gAbResultsTree.treeBoxObject.view = new MyView(gAbResultsTree.treeBoxObject.view);
//alert(gAbView);
//alert(gAbResultsTree.treeBoxObject.view);
 // gAbResultsTree.treeBoxObject.view = new MyView(gAbResultsTree.treeBoxObject.view);

  UpdateSortIndicators(actualSortColumn, sortDirection);
}
*/



/*
function AbResultsPaneOnClick(event)
{
  // we only care about button 0 (left click) events
  if (event.button != 0) return;

  // all we need to worry about here is double clicks
  // and column header clicks.
  //
  // we get in here for clicks on the "treecol" (headers)
  // and the "scrollbarbutton" (scrollbar buttons)
  // we don't want those events to cause a "double click"

  var t = event.originalTarget;

  if (t.localName == "treecol") {
    var sortDirection;
    var currentDirection = t.getAttribute("sortDirection");

    sortDirection = currentDirection == kDefaultDescending ?
                                        kDefaultAscending : kDefaultDescending;

    SortAndUpdateIndicators(t.id, sortDirection);
  }
  else if (t.localName == "treechildren") {
    // figure out what row the click was in
    var row = gAbResultsTree.treeBoxObject.getRowAt(event.clientX,
						    event.clientY);
    alert(row);
    if (row == -1)
      return;

    if (event.detail == 2)
      AbResultsPaneDoubleClick(gAbView.getCardFromRow(row));
  }
}*/
/*
//gAbResultsTree.treeBoxObject.view
function MyView(parentView) {this._parentView = parentView; }
MyView.prototype.getCellText = function(row, column)
{
  alert("ok");
  if (column == 0)
  {
    return "";
  }
  else
  {
    return this._parentView.getCellText(row, column)
  }
}
*/
/*
   getCellProperties: function jstv_getCellProperties(aRow, aCol, aProps) {
    this._rowMap[aRow].getProperties(aProps, aCol);
  },
//gAbResultsTree.treeBoxObject.view = new MyView(gAbResultsTree.treeBoxObject.view)


/*
gAbResultsTree.treeBoxObject.view
[17:56:06 CEST] David Rajchenbach-Teller: function MyView(parentView) { ... this._parentView = parentView; }
[17:57:14 CEST] David Rajchenbach-Teller: MyView.prototype.getCellText = function(row, column) { if (column == ma_colonne) { return le_texte_qui_va_bien } else return this._parentView.getCellText(row, column) } }
[17:57:53 CEST] David Rajchenbach-Teller: gAbResultsTree.treeBoxObject.view = new MyView(gAbResultsTree.treeBoxObject.view)
*/


