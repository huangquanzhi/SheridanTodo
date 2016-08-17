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
      elements += "<input type='checkbox' name='" + categoryID + i + "' id='" + categoryID + i + "' value='" + category[i] + "'>";
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
  return $("#home_priority").find("input").filter(":checked").val();
}

function home_GetCategory() {
  var categoryNode = $("#home_category").find("input").filter(":checked");
  var checkedValues = [];

  // for each checked inputs, push to array
  categoryNode.each(function () {
    checkedValues.push(this.value);
  });

  return checkedValues;

}

function home_getDate() {
  return $("#home_date").val();
}

function refreshCategory() {
  $('#home_category').trigger('create');
}

function refreshPage() {
  $('.ui-page').trigger('create');
}
