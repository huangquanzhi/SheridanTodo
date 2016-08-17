/**
 * Created by Jackie on 2016-08-16.
 */

function loadCategory(category) {
  var categoryNode = $('#home_category');
  var categoryID = 'home_category_';
  var groupName = 'userCategory';

  // check if array
  if (Array.isArray(category)) {
    var elements = "";

    for (var i = 0; i < category.length; i++) {
      elements += "<input type='checkbox' name='" + categoryID + i + "' id='" + categoryID + i + "'>";
      elements += "<label for='" + categoryID + i + "'>" + category[i] + "</label>";
    }
    // append to control group
    categoryNode.html(elements);
  }
}

function addCategory(category, callback) {
  // check if empty
  if (category) {
    // add to category
    config.form.category.push(category);
    if (typeof callback != "undefined") {
      callback();
    }
  }
}

function home_GetPriority() {
  var value = $("#home_priority").find("input").filter(":checked").val();
  return value;
}

function home_GetCategory() {

}

function refreshPage() {
  $('.ui-page').trigger('create');
}
