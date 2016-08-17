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
    refreshCategory();
  } else {
    console.log("Failed to load category");
  }
}

function addCategory(category, callback) {
  // check if empty
  if (category) {
    // add to category
    addNewCategory(category);
    config.form.category = retrieveCategory();
    if (typeof callback != "undefined") {
      callback();
    }
  }
}

function home_setAddCategory(value) {
  $("#home_category_input").val(value);
}

function home_setTodoDesc(value) {
  $("#home_todoDesc").val(value);
}

function home_getTodoDesc() {
  return $("#home_todoDesc").val();
}

function home_resetPriority() {
  var node = $("#home_priority_low");
  node.attr("checked", true);
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

function home_setDate(value) {
  $("#home_date").val(value);
}

function home_getDate() {
  return $("#home_date").val();
}

// set backgroun color to red
function validationError(element) {
  var node = $(element);

  node.addClass("backgroundColor_red");

  setTimeout(function () {
    clearError(element);
  }, config.settings.errorTimeout);

}

function createTodo(title, category, priority, date) {
  var todoItem = {
    title: title,
    category: category,
    priority: priority,
    date: date
  };
  return todoItem;
}

function loadHistoryDropdown(todoList) {
  if (todoList != null && Array.isArray(todoList)) {
    var dropdownNode = $("#popup_history");
    var listViewNode = dropdownNode.find("ul");
    var elements = "";

    for (var i = 0; i < todoList.length; i++) {
      elements += "<li><a href='#page_history'>" + todoList[i].title + "</a><a class='ui-icon-edit' href='#page_history'></a></li>";
    }
    // append
    listViewNode.html(elements);
    listViewNode.listview("refresh");
  }
}

function clearError(element) {
  var node = $(element);
  node.removeClass("backgroundColor_red");
}

function refreshCategory() {
  $('#home_category').trigger('create');
}

function refreshPage() {
  $('.ui-page').trigger('create');
}
