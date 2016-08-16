/**
 * Created by Jackie on 2016-08-15.
 */

// save a list of todos to local storage
function saveTodo(todo) {
  if (todo != null) {
    localStorage.setItem(config.localStorage.todoKey, JSON.stringify(todo));
  }
}

// retrieve list of todos
function retrieveTodo() {

  var todo = localStorage.getItem(config.localStorage.todoKey)

  if(todo != undefined) {
    // parse from string to object
    return JSON.parse(todo);
  }

  return null;
}

// clear the local storage
function clearStorage() {
  localStorage.clear();
}