/**
 * Created by Jackie on 2016-08-15.
 */

var selectedLocation = {};

$(document).on('pagecreate', '#page_home', function (e) {
  loadCategory(retrieveCategory());
  loadHistoryDropdown(retrieveTodo());
  // well.... only fire here
  $(".popup_todo_item_edit").on("tap", function () {
    $.mobile.changePage("#page_edit");
    console.log($(this).attr("data-id"));
  })

  $("#popup_history_view").on("tap", function () {
    loadTodoTable(retrieveTodo());
  });
});


$(document).on('pagecreate', '#page_history', function (e) {

  loadTodoTable(retrieveTodo());

});

