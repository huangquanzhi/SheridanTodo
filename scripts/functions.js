/**
 * Created by Jackie on 2016-08-16.
 */

function loadCategory(category) {
  var categoryNode = $('#home_category');
  var categoryID = 'home_category_';
  var groupName = 'userCategory';

  // check if array and category node exist
  if (Array.isArray(category) && categoryNode.length) {
    var elements = "";

    for (var i = 0; i < category.length; i++) {
      elements += "<input type='checkbox' name='" + categoryID + i + "' id='" + categoryID + i + "' value='" + category[i] + "'>";
      elements += "<label for='" + categoryID + i + "'>" + category[i] + "</label>";
    }
    // append to control group
    categoryNode.html(elements);
    refreshCategory();
    loadHistoryDropdown(category);
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
    date: date,
    completed: false
  };
  return todoItem;
}

function loadHistoryDropdown(todoList) {
  var dropdownNode = $("#popup_history");

  if (todoList != null && Array.isArray(todoList) && dropdownNode.length) {
    var listViewNode = dropdownNode.find("ul");
    var elements = "";

    for (var i = 0; i < todoList.length; i++) {
      elements += "<li><a href='#'>" + todoList[i].title + "</a><a class='ui-icon-check popup_todo_item_complete' data-id='" + i + "'href='#'></a></li>";
    }
    elements += "<li><a href='#page_history'  id='popup_history_view'>View All</a></li>"
    // append
    listViewNode.html(elements);
    listViewNode.listview("refresh");
  }
}

function loadTodoTable(todoList) {
  var tableNode = $("#history_todolist");

  if (todoList != null && Array.isArray(todoList) && tableNode.length) {
    var elements = "";

    for (var i = 0; i < todoList.length; i++) {
      var todo = todoList[i];
      elements += "<tr>";
      elements += "<th class='ui-table-priority-" + (i + 1) + " ui-table-cell-visible'>" + (i + 1) + "</th>";
      Object.keys(todo).forEach(function (key, index) {
        elements += "<th class='ui-table-priority-" + (index + 2) + " ui-table-cell-visible'>" + todo[key] + "</th>";
      });
      elements += "</tr>";
    }

    // append to table
    tableNode.find("tbody").html(elements);
  }

}

function setLocationInput(latLng) {
  var locInput = $("#home_advanced_loc").find("input");

  locInput.first().val(latLng.lat);
  locInput.last().val(latLng.lng);
}

function clearError(element) {
  var node = $(element);
  node.removeClass("backgroundColor_red");
}

function recreateHistory() {
  $('#page_history').trigger('create');
}

function refreshCategory() {
  $('#home_category').trigger('create');
}

function refreshPage() {
  $('.ui-page').trigger('create');
}
