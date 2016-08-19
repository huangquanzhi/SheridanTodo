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
    notificationMessage("Failed to load category");
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

function home_getCategory() {
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

function createTodo(title, category, priority, date, location) {
  var todoItem = {
    title: title,
    category: category,
    priority: priority,
    date: date,
    location: location,
    completed: false
  };
  return todoItem;
}

function loadHistoryDropdown(todoList) {
  var dropdownNode = $("#panel_history");

  if (todoList != null && Array.isArray(todoList) && dropdownNode.length) {
    var listViewNode = dropdownNode.find("ul");
    var elements = "";
    for (var i = 0; i < todoList.length; i++) {
      // display only not completed
      var todo = todoList[i];
      if (!todo.completed) {
        elements += "<li data-theme='a'><a href='#'>" + todo.title + "</a>" +
            "<a class='ui-icon-check popup_todo_item_complete' data-theme='a' data-id='" + i + "' href='#'></a>" +
            "</li>";
      }
    }

    elements += "<li><a href='#page_history'  id='popup_history_view'>View All</a></li>"
    // append
    listViewNode.html(elements);
    listViewNode.listview("refresh");
  }
}

function loadTodoTable(todoList) {
  var tableNode = $("#history_todolist_progress");

  if (todoList != null && Array.isArray(todoList) && tableNode.length) {
    var elements = "";

    // create elements
    // search
    elements += "<form class='ui-filterable'>" +
        "<input id='history_todo_filte' data-type='search'></form>"
    // list view
    elements += "<ul data-role='listview' id='history_todo_wrap' data-filter='true' data-input='#history_todo_filter'>";

    for (var i = 0; i < todoList.length; i++) {
      var todo = todoList[i];
      elements += "<div data-role='collapsible' class='history_todo_collapsible' data-iconpos='right'>";
      elements += "<h3 class='history_todo_header'><b>Title:</b> " + todo.title + "</h3>"
      elements += "<ul data-role='listview'>";
      Object.keys(todo).forEach(function (key, index) {
        if (key != "title") {
          if (key == "location") {
            elements += "<li>" + "<b>" + key.toUpperCase() + "</b>" + " : " + todo[key].address +
                "<input type='button' class='history_todo_location_map' value='Open Maps' data-id='" + i + "'/>" +
                "</li>";
          } else {
            elements += "<li>" + "<b>" + key.toUpperCase() + "</b>" + " : " + todo[key] + "</li>";
          }
        }
      });
      elements += "</ul>";
      elements += "</div>"
    }
    elements += "</ul>";

    // append to table
    tableNode.html(elements);
    refreshPage();
  }

}

function setLocationInput(latLng) {
  var locInput = $("#home_advanced_loc").find("input");
  locInput.first().val(latLng.lat);
  locInput.last().val(latLng.lng);
}

function setLocationAddress(address) {
  var locAddress = $("#home_advanced_loc_address").find("input");
  locAddress.val(address);
}

function home_getLocationAddress() {
  var locAddress = $("#home_advanced_loc_address").find("input");
  return locAddress.val();
}

function getLocationObject() {
  var location = home_getLocation();
  var address = home_getLocationAddress();

  if (location != null) {
    return Object.assign({}, location, {
      address: address
    })
  }
  return null;
}

function home_getLocation() {
  var locInput = $("#home_advanced_loc").find("input");
  var lat = locInput.first().val();
  var lng = locInput.last().val();

  if (lat != "" || lng != "") {
    return {lat: lat, lng: lng};
  }
  return null;
}

function home_resetLocation() {
  setLocationAddress("");
  setLocationInput({lat: "", lng: ""});
}


function notificationMessage(message) {
  var messageBox = $("#popup_todo_message");

  if (message != "") {
    messageBox.html("<h3>" + message + "</h3>");
    // return the popup object
    messageBox.popup("open");
  }
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

function ScaleContentToDevice() {
  scroll(0, 0);
  var content = $.mobile.getScreenHeight() - $(".ui-header").outerHeight() - $(".ui-footer").outerHeight() - $(".ui-content").outerHeight() + $(".ui-content").height();
  $(".ui-content").height(content);
}