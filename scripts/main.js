/**
 * Created by Jackie on 2016-08-15.
 */

var selectedTodo = {};

$(document).on('pagecreate', function (e) {

  loadCategory(retrieveCategory());
  loadHistoryDropdown(retrieveTodo());
});