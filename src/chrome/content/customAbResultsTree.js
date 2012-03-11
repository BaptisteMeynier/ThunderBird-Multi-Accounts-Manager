
///////////////////////////////////////////////////////////////////////////////
// we store the identity Id in the field property not its value, so we have  //
// to modify the displaying of the abresultsTree  ...                        //
///////////////////////////////////////////////////////////////////////////////


/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is mail tree code.
 *
 * The Initial Developer of the Original Code is
 *   Joey Minta <jminta@gmail.com>
 * Portions created by the Initial Developer are Copyright (C) 2008
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Mike Conley <mconley@mozilla.com>
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

/**
 * This file contains a prototype object designed to make the implementation of
 * nsITreeViews in javascript simpler.  This object requires that consumers
 * override the _rebuild function.  This function must set the _rowMap object to
 * an array of objects fitting the following interface:
 *
 * readonly attribute string id - a unique identifier for the row/object
 * readonly attribute integer level - the hierarchy level of the row
 * attribute boolean open - whether or not this item's children are exposed
 * string getText(aColName) - return the text to display for this row in the
 *                            specified column
 * void getProperties(aProps) - set the css-selectors on aProps when this is
 *                              called
 * attribute array children - return an array of child-objects also meeting this
 *                            interface
 */

//function PROTO_TREE_VIEW() {
//  this._tree = null;
//  this._rowMap = [];
//  this._persistOpenMap = [];
//}
//
//PROTO_TREE_VIEW.prototype = {
//  get rowCount() {
//    return this._rowMap.length;
//  },
//
//  /**
//   * CSS files will cue off of these.  Note that we reach into the rowMap's
//   * items so that custom data-displays can define their own properties
//   */
//  getCellProperties: function jstv_getCellProperties(aRow, aCol, aProps) {
//    this._rowMap[aRow].getProperties(aProps, aCol);
//  },
//
//  /**
//   * The actual text to display in the tree
//   */
//  getCellText: function jstv_getCellText(aRow, aCol) {
//    return this._rowMap[aRow].getText(aCol.id);
//  },
//
//  /**
//   * The jstv items take care of assigning this when building children lists
//   */
//  getLevel: function jstv_getLevel(aIndex) {
//    return this._rowMap[aIndex].level;
//  },
//
//  /**
//   * This is easy since the jstv items assigned the _parent property when making
//   * the child lists
//   */
//  getParentIndex: function jstv_getParentIndex(aIndex) {
//    return this._rowMap.indexOf(this._rowMap[aIndex]._parent);
//  },
//
//  /**
//   * This is duplicative for our normal jstv views, but custom data-displays may
//   * want to do something special here
//   */
//  getRowProperties: function jstv_getRowProperties(aIndex, aProps) {
//    this._rowMap[aIndex].getProperties(aProps);
//  },
//
//  /**
//   * If an item in our list has the same level and parent as us, it's a sibling
//   */
//  hasNextSibling: function jstv_hasNextSibling(aIndex, aNextIndex) {
//    let targetLevel = this._rowMap[aIndex].level;
//    for (let i = aNextIndex + 1; i < this._rowMap.length; i++) {
//      if (this._rowMap[i].level == targetLevel)
//        return true;
//      if (this._rowMap[i].level < targetLevel)
//        return false;
//    }
//    return false;
//  },
//
//  /**
//   * If we have a child-list with at least one element, we are a container.
//   */
//  isContainer: function jstv_isContainer(aIndex) {
//    return this._rowMap[aIndex].children.length > 0;
//  },
//
//  isContainerEmpty: function jstv_isContainerEmpty(aIndex) {
//    // If the container has no children, the container is empty.
//    return !this._rowMap[aIndex].children.length;
//  },
//
//  /**
//   * Just look at the jstv item here
//   */
//  isContainerOpen: function jstv_isContainerOpen(aIndex) {
//    return this._rowMap[aIndex].open;
//  },
//
//  isEditable: function jstv_isEditable(aRow, aCol) {
//    // We don't support editing rows in the tree yet.
//    return false;
//  },
//
//  isSeparator: function jstv_isSeparator(aIndex) {
//    // There are no separators in our trees
//    return false;
//  },
//
//  isSorted: function jstv_isSorted() {
//    // We do our own customized sorting
//    return false;
//  },
//
//  setTree: function jstv_setTree(aTree) {
//    this._tree = aTree;
//  },
//
//  /**
//   * Opens or closes a container with children.  The logic here is a bit hairy, so
//   * be very careful about changing anything.
//   */
//  toggleOpenState: function jstv_toggleOpenState(aIndex) {
//
//    // Ok, this is a bit tricky.
//    this._rowMap[aIndex]._open = !this._rowMap[aIndex].open;
//
//    if (!this._rowMap[aIndex].open) {
//      // We're closing the current container.  Remove the children
//
//      // Note that we can't simply splice out children.length, because some of
//      // them might have children too.  Find out how many items we're actually
//      // going to splice
//      let level = this._rowMap[aIndex].level;
//      let row = aIndex + 1;
//      while (row < this._rowMap.length && this._rowMap[row].level > level) {
//        row++;
//      }
//      let count = row - aIndex - 1;
//      this._rowMap.splice(aIndex + 1, count);
//
//      // Remove us from the persist map
//      let index = this._persistOpenMap.indexOf(this._rowMap[aIndex].id);
//      if (index != -1)
//        this._persistOpenMap.splice(index, 1);
//
//      // Notify the tree of changes
//      if (this._tree) {
//        this._tree.rowCountChanged(aIndex + 1, -count);
//      }
//    } else {
//      // We're opening the container.  Add the children to our map
//
//      // Note that these children may have been open when we were last closed,
//      // and if they are, we also have to add those grandchildren to the map
//      let oldCount = this._rowMap.length;
//      function recursivelyAddToMap(aChild, aNewIndex, tree) {
//        // When we add sub-children, we're going to need to increase our index
//        // for the next add item at our own level
//        let currentCount = tree._rowMap.length;
//        if (aChild.children.length && aChild.open) {
//          for (let [i, child] in Iterator(tree._rowMap[aNewIndex].children)) {
//            let index = aNewIndex + i + 1;
//            tree._rowMap.splice(index, 0, child);
//            aNewIndex += recursivelyAddToMap(child, index, tree);
//          }
//        }
//        return tree._rowMap.length - currentCount;
//      }
//
//      // Workaround for bug 682096, by passing this for the recursive function,
//      // as opposed to setting "tree = this" outside of the function.
//      recursivelyAddToMap(this._rowMap[aIndex], aIndex, this);
//
//      // Add this container to the persist map
//      let id = this._rowMap[aIndex].id;
//      if (this._persistOpenMap.indexOf(id) == -1)
//        this._persistOpenMap.push(id);
//
//      // Notify the tree of changes
//      if (this._tree)
//        this._tree.rowCountChanged(aIndex + 1, this._rowMap.length - oldCount);
//    }
//
//    // Invalidate the toggled row, so that the open/closed marker changes
//    if (this._tree)
//      this._tree.invalidateRow(aIndex);
//  },
//
//  // We don't implement any of these at the moment
//  canDrop: function jstv_canDrop(aIndex, aOrientation) {},
//  drop: function jstv_drop(aRow, aOrientation) {},
//  performAction: function jstv_performAction(aAction) {},
//  performActionOnCell: function jstv_performActionOnCell(aAction, aRow, aCol) {},
//  performActionOnRow: function jstv_performActionOnRow(aAction, aRow) {},
//  selectionChanged: function jstv_selectionChanged() {},
//  setCellText: function jstv_setCellText(aRow, aCol, aValue) {},
//  setCellValue: function jstv_setCellValue(aRow, aCol, aValue) {},
//  getCellValue: function jstv_getCellValue(aRow, aCol) {},
//  getColumnProperties: function jstv_getColumnProperties(aCol, aProps) {},
//  getImageSrc: function jstv_getImageSrc(aRow, aCol) {},
//  getProgressMode: function jstv_getProgressMode(aRow, aCol) {},
//  cycleCell: function jstv_cycleCell(aRow, aCol) {},
//  cycleHeader: function jstv_cycleHeader(aCol) {},
//
//  _tree: null,
//
//  /**
//   * An array of jstv items, where each item corresponds to a row in the tree
//   */
//  _rowMap: null,
//
//  /**
//   * This is a javascript map of which containers we had open, so that we can
//   * persist their state over-time.  It is designed to be used as a JSON object.
//   */
//  _persistOpenMap: null,
//
//  _restoreOpenStates: function jstv__restoreOpenStates() {
//    // Note that as we iterate through here, .length may grow
//    for (let i = 0; i < this._rowMap.length; i++) {
//      if (this._persistOpenMap.indexOf(this._rowMap[i].id) != -1)
//        this.toggleOpenState(i);
//    }
//  }
//};



/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Mail Addressbook code.
 *
 * The Initial Developer of the Original Code is
 *   Joey Minta <jminta@gmail.com>
 * Portions created by the Initial Developer are Copyright (C) 2008
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

/**
 * This file contains our implementation for various addressbook trees.  It
 * depends on jsTreeView.js being loaded before this script is loaded.
 */

//Components.utils.import("resource:///modules/mailServices.js");
//
///**
// * Each abDirTreeItem corresponds to one row in the tree view.
// */
//function abDirTreeItem(aDirectory) {
//  this._directory = aDirectory;
//}
//
//abDirTreeItem.prototype = {
//  getText: function atv_getText() {
//    return this._directory.dirName;
//  },
//
//  get id() {
//    return this._directory.URI;
//  },
//
//  _open: false,
//  get open() {
//    return this._open;
//  },
//
//  _level: 0,
//  get level() {
//    return this._level;
//  },
//
//  _children: null,
//  get children() {
//    if (!this._children) {
//      this._children = [];
//      const Ci = Components.interfaces;
//      var myEnum = this._directory.childNodes;
//      while (myEnum.hasMoreElements()) {
//        var abItem = new abDirTreeItem(myEnum.getNext()
//                                      .QueryInterface(Ci.nsIAbDirectory));
//        this._children.push(abItem);
//        this._children[this._children.length - 1]._level = this._level + 1;
//        this._children[this._children.length - 1]._parent = this;
//      }
//
//      // We sort children based on their names
//      function nameSort(a, b) {
//        return a._directory.dirName.localeCompare(b._directory.dirName);
//      }
//      this._children.sort(nameSort);
//    }
//    return this._children;
//  },
//
//  getProperties: function atv_getProps(aProps) {
//    var atomSvc = Components.classes["@mozilla.org/atom-service;1"]
//                            .getService(Components.interfaces.nsIAtomService);
//    if (this._directory.isMailList)
//      aProps.AppendElement(atomSvc.getAtom("IsMailList-true"));
//    if (this._directory.isRemote)
//      aProps.AppendElement(atomSvc.getAtom("IsRemote-true"));
//    if (this._directory.isSecure)
//      aProps.AppendElement(atomSvc.getAtom("IsSecure-true"));
//  }
//};
//
///**
// * Our actual implementation of nsITreeView.
// */
//function directoryTreeView() {}
//directoryTreeView.prototype = {
//  __proto__: new PROTO_TREE_VIEW(),
//
//  init: function dtv_init(aTree, aJSONFile) {
//    const Cc = Components.classes;
//    const Ci = Components.interfaces;
//
//    if (aJSONFile) {
//      // Parse our persistent-open-state json file
//      let file = Cc["@mozilla.org/file/directory_service;1"]
//                    .getService(Ci.nsIProperties).get("ProfD", Ci.nsIFile);
//      file.append(aJSONFile);
//
//      if (file.exists()) {
//        let data = "";
//        let fstream = Cc["@mozilla.org/network/file-input-stream;1"]
//                         .createInstance(Ci.nsIFileInputStream);
//        let sstream = Cc["@mozilla.org/scriptableinputstream;1"]
//                         .createInstance(Ci.nsIScriptableInputStream);
//        fstream.init(file, -1, 0, 0);
//        sstream.init(fstream);
//
//        while (sstream.available())
//          data += sstream.read(4096);
//
//        sstream.close();
//        fstream.close();
//        this._persistOpenMap = JSON.parse(data);
//      }
//    }
//
//    this._rebuild();
//    aTree.view = this;
//  },
//
//  shutdown: function dtv_shutdown(aJSONFile) {
//    const Cc = Components.classes;
//    const Ci = Components.interfaces;
//
//    // Write out the persistOpenMap to our JSON file
//    if (aJSONFile) {
//      // Write out our json file...
//      let data = JSON.stringify(this._persistOpenMap);
//      let file = Cc["@mozilla.org/file/directory_service;1"]
//                 .getService(Ci.nsIProperties).get("ProfD", Ci.nsIFile);
//      file.append(aJSONFile);
//      let foStream = Cc["@mozilla.org/network/file-output-stream;1"]
//                    .createInstance(Ci.nsIFileOutputStream);
//
//      foStream.init(file, 0x02 | 0x08 | 0x20, 0666, 0);
//      foStream.write(data, data.length);
//      foStream.close();
//    }
//  },
//
//  // Override the dnd methods for those functions in abDragDrop.js
//  canDrop: function dtv_canDrop(aIndex, aOrientation) {
//    return abDirTreeObserver.canDrop(aIndex, aOrientation);
//  },
//
//  drop: function dtv_drop(aRow, aOrientation) {
//    abDirTreeObserver.onDrop(aRow, aOrientation);
//  },
//
//  getDirectoryAtIndex: function dtv_getDirForIndex(aIndex) {
//    return this._rowMap[aIndex]._directory;
//  },
//
//  // Override jsTreeView's isContainer, since we want to be able
//  // to react to drag-drop events for all items in the directory
//  // tree.
//  isContainer: function dtv_isContainer(aIndex) {
//    return true;
//  },
//
//  /**
//   * NOTE: This function will result in indeterminate rows being selected.
//   *       Callers should take care to re-select a desired row after calling
//   *       this function.
//   */
//  _rebuild: function dtv__rebuild() {
//    var oldCount = this._rowMap.length;
//    this._rowMap = [];
//
//    const Cc = Components.classes;
//    const Ci = Components.interfaces;
//
//    var dirEnum = MailServices.ab.directories;
//
//    while (dirEnum.hasMoreElements()) {
//      this._rowMap.push(new abDirTreeItem(dirEnum.getNext().QueryInterface(Ci.nsIAbDirectory)));
//    }
//
//    // Sort our addressbooks now
//
//    const AB_ORDER = ["pab", "mork", "ldap", "mapi+other", "cab"];
//
//    function getDirectoryValue(aDir, aKey) {
//      if (aKey == "ab_type") {
//        if (aDir._directory.URI == kPersonalAddressbookURI)
//          return "pab";
//        if (aDir._directory.URI == kCollectedAddressbookURI)
//          return "cab";
//        if (aDir._directory instanceof Ci.nsIAbMDBDirectory)
//          return "mork";
//        if (aDir._directory instanceof Ci.nsIAbLDAPDirectory)
//          return "ldap";
//        return "mapi+other";
//      } else if (aKey == "ab_name") {
//        return aDir._directory.dirName;
//      }
//    }
//
//    function abNameCompare(a, b) {
//      return a.localeCompare(b);
//    }
//
//    function abTypeCompare(a, b) {
//      return (AB_ORDER.indexOf(a) - AB_ORDER.indexOf(b));
//    }
//
//    const SORT_PRIORITY = ["ab_type", "ab_name"];
//    const SORT_FUNCS = [abTypeCompare, abNameCompare];
//
//    function abSort(a, b) {
//      for (let i = 0; i < SORT_FUNCS.length; i++) {
//        let sortBy = SORT_PRIORITY[i];
//        let aValue = getDirectoryValue(a, sortBy);
//        let bValue = getDirectoryValue(b, sortBy);
//
//        if (!aValue && !bValue)
//          return 0;
//        if (!aValue)
//          return -1;
//        if (!bValue)
//          return 1;
//        if (aValue != bValue) {
//          let result = SORT_FUNCS[i](aValue, bValue);
//
//          if (result != 0)
//            return result;
//        }
//      }
//      return 0;
//    }
//
//    this._rowMap.sort(abSort);
//
//    if (this._tree)
//      this._tree.rowCountChanged(0, this._rowMap.length - oldCount);
//
//    this._restoreOpenStates();
//  },
//
//  // nsIAbListener interfaces
//  onItemAdded: function dtv_onItemAdded(aParent, aItem) {
//    if (!(aItem instanceof Components.interfaces.nsIAbDirectory))
//      return;
//    //xxx we can optimize this later
//    this._rebuild();
//
//    if (!this._tree)
//      return;
//
//    // Now select this new item
//    for (var [i, row] in Iterator(this._rowMap)) {
//      if (row.id == aItem.URI) {
//        this.selection.select(i);
//        break;
//      }
//    }
//  },
//
//  onItemRemoved: function dtv_onItemRemoved(aParent, aItem) {
//    if (!(aItem instanceof Components.interfaces.nsIAbDirectory))
//      return;
//    //xxx we can optimize this later
//    this._rebuild();
//
//    if (!this._tree)
//      return;
//
//    // If we're deleting a top-level address-book, just select the first book
//    if (aParent.URI == "moz-abdirectory://") {
//      this.selection.select(0);
//      return;
//    }
//
//    // Now select this parent item
//    for (var [i, row] in Iterator(this._rowMap)) {
//      if (row.id == aParent.URI) {
//        this.selection.select(i);
//        break;
//      }
//    }
//  },
//
//  onItemPropertyChanged: function dtv_onItemProp(aItem, aProp, aOld, aNew) {
//    if (!(aItem instanceof Components.interfaces.nsIAbDirectory))
//      return;
//
//    for (var i in this._rowMap)  {
//      if (this._rowMap[i]._directory == aItem) {
//        this._tree.invalidateRow(i);
//        break;
//      }
//    }
//  }
//};
//
//var gDirectoryTreeView = new directoryTreeView();


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
function MyView(parentView) { ... this._parentView = parentView; }
MyView.prototype.getCellText = function(row, column) { if (column == ma_colonne) { return le_texte_qui_va_bien } else return this._parentView.getCellText(row, column) } }
gAbResultsTree.treeBoxObject.view = new MyView(gAbResultsTree.treeBoxObject.view)
*/


