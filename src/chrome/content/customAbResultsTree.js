////
////
///////////////////////////
/////*var treeView = {
////
////    get rowCount() {
////        return this._rowMap.length;
////    },
////    getCellText : function(aRow,aCol){
////      if (aCol.id == "ABMAM_UseAccount") return "OKKKKKK";
////      else return this._rowMap[aRow].getText(aCol.id);
////    },
////    setTree: function(treebox){ this.treebox = treebox; },
////    isContainer: function(row){ return false; },
////    isSeparator: function(row){ return false; },
////    isSorted: function(){ return false; },
////    getLevel: function(row){ return 0; },
////    getImageSrc: function(row,col){ return null; },
////    getRowProperties: function(row,props){},
////    getCellProperties: function(row,col,props){},
////    getColumnProperties: function(colid,col,props){}
////   
////};*/
////////////////////////////////////////////////////////////////////////////////////////
////function SetAbView(aURI)
////{
////  // If we don't have a URI, just clear the view and leave everything else
////  // alone.
////  if (!aURI) {
////    gAbView.clearView();
////    return;
////  }
////
////  // If we do have a URI, we want to allow updating the review even if the
////  // URI is the same, as the search results may be different.
////
////  var sortColumn = kDefaultSortColumn;
////  var sortDirection = kDefaultAscending;
////
////  if (!gAbResultsTree) {
////    gAbResultsTree = document.getElementById("abResultsTree");
////    gAbResultsTree.controllers.appendController(ResultsPaneController);
////  }
////
////  if (gAbView) {
////    sortColumn = gAbView.sortColumn;
////    sortDirection = gAbView.sortDirection;
////  }
////  else {
////    if (gAbResultsTree.hasAttribute("sortCol"))
////      sortColumn = gAbResultsTree.getAttribute("sortCol");
////    var sortColumnNode = document.getElementById(sortColumn);
////    if (sortColumnNode && sortColumnNode.hasAttribute("sortDirection"))
////      sortDirection = sortColumnNode.getAttribute("sortDirection");
////  }
////
////  var directory = GetDirectoryFromURI(aURI);
////  if (!gAbView)
////    gAbView = Components.classes["@mozilla.org/addressbook/abview;1"]
////                        .createInstance(Components.interfaces.nsIAbView);
////
////  var actualSortColumn = gAbView.setView(directory, GetAbViewListener(),
////					 sortColumn, sortDirection);
////
////gAbResultsTree.treeBoxObject.view =
////        gAbView.QueryInterface(Components.interfaces.nsITreeView);
////        alert(gAbResultsTree.treeBoxObject.view);
////  gAbResultsTree.treeBoxObject.view.nsITreeView.prototype = {
////    getCellText : function(row,column){
////      if (column.id == "IdentityLink") return "OKKKKKK";
////      else return "18 février";
////    }
////    }
////alert(gAbResultsTree.treeBoxObject.view.nsITreeView.getCellText);
////  UpdateSortIndicators(actualSortColumn, sortDirection);
////}
////
/////*
//// function MyView(parentView) { ... this._parentView = parentView; }
////MyView.prototype.getCellText = function(row, column) { if (column == ma_colonne) { return le_texte_qui_va_bien } else return this._parentView.getCellText(row, column) } }
////gAbResultsTree.treeBoxObject.view = new MyView(gAbResultsTree.treeBoxObject.view)*/
//
///* ***** BEGIN LICENSE BLOCK *****
// * Version: MPL 1.1/GPL 2.0/LGPL 2.1
// *
// * The contents of this file are subject to the Mozilla Public License Version
// * 1.1 (the "License"); you may not use this file except in compliance with
// * the License. You may obtain a copy of the License at
// * http://www.mozilla.org/MPL/
// *
// * Software distributed under the License is distributed on an "AS IS" basis,
// * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
// * for the specific language governing rights and limitations under the
// * License.
// *
// * The Original Code is mail tree code.
// *
// * The Initial Developer of the Original Code is
// *   Joey Minta <jminta@gmail.com>
// * Portions created by the Initial Developer are Copyright (C) 2008
// * the Initial Developer. All Rights Reserved.
// *
// * Contributor(s):
// *   Mike Conley <mconley@mozilla.com>
// *
// * Alternatively, the contents of this file may be used under the terms of
// * either the GNU General Public License Version 2 or later (the "GPL"), or
// * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
// * in which case the provisions of the GPL or the LGPL are applicable instead
// * of those above. If you wish to allow use of your version of this file only
// * under the terms of either the GPL or the LGPL, and not to allow others to
// * use your version of this file under the terms of the MPL, indicate your
// * decision by deleting the provisions above and replace them with the notice
// * and other provisions required by the GPL or the LGPL. If you do not delete
// * the provisions above, a recipient may use your version of this file under
// * the terms of any one of the MPL, the GPL or the LGPL.
// *
// * ***** END LICENSE BLOCK ***** */
//
///**
// * This file contains a prototype object designed to make the implementation of
// * nsITreeViews in javascript simpler.  This object requires that consumers
// * override the _rebuild function.  This function must set the _rowMap object to
// * an array of objects fitting the following interface:
// *
// * readonly attribute string id - a unique identifier for the row/object
// * readonly attribute integer level - the hierarchy level of the row
// * attribute boolean open - whether or not this item's children are exposed
// * string getText(aColName) - return the text to display for this row in the
// *                            specified column
// * void getProperties(aProps) - set the css-selectors on aProps when this is
// *                              called
// * attribute array children - return an array of child-objects also meeting this
// *                            interface
// */
//
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
//  //getCellText: function jstv_getCellText(aRow, aCol) {
// //   return this._rowMap[aRow].getText(aCol.id);
// // },
// getCellText: function jstv_getCellText(aRow, aCol){
//    alert(aCol.id);
//      if (aCol.id == "ABMAM_UseAccount") return "Ligne "+aRow;
//      else return this._rowMap[aRow].getText(aCol.id);
// },
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
//
//
//var treeView = {
//    rowCount : 10000,
//    getCellText : function(row,column){
//      if (column.id == "ABMAM_UseAccount") return "Ligne "+row;
//      else return this._rowMap[row].getText(column.id);
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
//};
//
//var columnHandler = {
//   isEditable: function(aRow, aCol) {return false;},
//   cycleCell: function(aRow, aCol) { },
//   getCellText: function(aRow, aCol) {if (aCol.id == "ABMAM_UseAccount") return "Ligne "+aRow;
//      else return this._rowMap[aRow].getText(aCol.id); },
//   getSortStringForRow: function(aHdr) { return ""; },
//   isString:            function() {return true;},
//   getCellProperties:   function(aRow, aCol, aProps) { },
//   getRowProperties:    function(aRow, aProps) { },
//   getImageSrc:         function(aRow, aCol) {return null;},
//   getSortLongForRow:   function(aHdr) {return 0;}
//}
//
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
//
//  if (!gAbView)
//    gAbView = Components.classes["@mozilla.org/addressbook/abview;1"]
//                        .createInstance(Components.interfaces.nsIAbView);
//
//  var actualSortColumn = gAbView.setView(directory, GetAbViewListener(),
//					 sortColumn, sortDirection);
////
//gAbResultsTree.treeBoxObject.view = gAbView.QueryInterface(Components.interfaces.nsITreeView);
//gAbResultsTree.treeBoxObject.view.addColumnHandler("ABMAM_UseAccount", columnHandler);
///*let aTree = new PROTO_TREE_VIEW();//gAbView.QueryInterface(Components.interfaces.nsITreeView)
//aTree.getCellText = function(row,column){
//    alert("plop");
//      if (column.id == "ABMAM_UseAccount") return "Ligne "+row;
//      else return this._rowMap[row].getText(column.id);
//    }
//    gAbResultsTree.treeBoxObject.view = aTree;*/
////alert(gAbResultsTree.treeBoxObject.view.getCellText);
////MyView.prototype.getCellText = function(row, column) { if (column == ma_colonne) { return le_texte_qui_va_bien } else return this._parentView.getCellText(row, column) } }
//
///*
//gAbResultsTree.treeBoxObject.view = gAbView.QueryInterface(Components.interfaces.nsITreeView);
//gAbResultsTree.treeBoxObject.view.setTree(treeView);
//*/ // gAbResultsTree.treeBoxObject.view = new PROTO_TREE_VIEW();
////  let arbre = gAbView.QueryInterface(Components.interfaces.nsITreeView);
//    //gAbView.QueryInterface(Components.interfaces.nsITreeView);
//
////treeView.setTree(gAbView.QueryInterface(Components.interfaces.nsITreeView));
////gAbResultsTree.treeBoxObject.view = treeView;
//  UpdateSortIndicators(actualSortColumn, sortDirection);
//}