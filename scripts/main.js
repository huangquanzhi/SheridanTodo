/**
 * Created by Jackie on 2016-08-15.
 */

var selectedLocation = {};

$(document).on("pageinit", function () {
  $.ajax({
    url: "./data/remoteData.json",
    method: "GET",
    dataType: "json",
    success: function (data) {
      if(Array.isArray(data)){
        data.each(function (todo) {
          addTodoToList(todo);
        })
      }
    },
    error: function () {
      console.log("Failed to load!");
    }
  })
});

$(document).on('pagecreate', '#page_home', function (e) {
  var todoList = retrieveTodo();
  loadCategory(retrieveCategory());
  loadHistoryDropdown(todoList);
  // well.... only fire here
  $(".popup_todo_item_complete").on("tap", function () {
    // get todoAnd set complete
    var todo = todoList[$(this).attr("data-id")];
    todo.completed = true;
  });

  $("#popup_history_view").on("tap", function () {
    // cant use cache, since todos might have updated
    loadTodoTable(retrieveTodo());
  });
});


$(document).on('pagecreate', '#page_history', function (e) {
  loadTodoTable(retrieveTodo());

});

$(document).on( "pagecontainershow", function(){
  ScaleContentToDevice();
});

$(window).on("resize orientationchange", function(){
  ScaleContentToDevice();
});