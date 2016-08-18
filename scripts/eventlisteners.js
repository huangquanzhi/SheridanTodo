/**
 * Created by Jackie on 2016-08-16.
 */

$("#home_category_add").on("tap", function () {
  var input = $("#home_category_input");
  // get value
  var value = input.val();

  if (value) {
    // reset values
    input.val("");
    // add category ( value, callback)
    addCategory(value);
    loadCategory(config.form.category);
  } else {
    validationError("#home_category_input");
  }
});

// add todos button click
$("#home_addTodo").on("tap", function () {
  var required = false;

  var todoDesc = home_getTodoDesc();
  var category = home_GetCategory();
  var date = home_getDate();
  var priority = home_GetPriority();

  if (!todoDesc) {
    required = true;
    validationError("#home_todoDesc");
  }

  if (!date) {
    required = true;
    validationError("#home_date")
  }

  // all required field filled
  if (!required) {
    // reset form
    home_setTodoDesc("");
    home_resetPriority();
    home_setDate("");
    home_setAddCategory("");
    loadCategory(config.form.category);
    // open popup
    $("#popup_todo_success").popup("open");

    // created todoObject
    var todo = createTodo(todoDesc,category,priority,date);
    // add to local storage
    addTodoToList(todo);
  }

});

$("#home_popup_maps_button").on("tap", function () {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      initMap(position.coords.latitude, position.coords.longitude);
    })
  } else {
    Alert("No gelocation support!");
  }

});
