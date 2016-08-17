/**
 * Created by Jackie on 2016-08-15.
 */

// save a todoObject to the array
function addTodoToList(todo) {
  if (todo != null) {
    var todoList = retrieveTodo();
    if(todoList != null) {
      todoList.push(todo);
    } else {
      todoList = [todo];
    }
    saveTodoList(todoList);
  }
}

// save a list of todos to local storage
function saveTodoList(todoList) {
  if (todoList != null && Array.isArray(todoList)) {
    localStorage.setItem(config.localStorage.todoKey, JSON.stringify(todoList));
  }
}

// retrieve list of todos
function retrieveTodo() {

  var todo = localStorage.getItem(config.localStorage.todoKey);

  if (todo != undefined) {
    // parse from string to object
    return JSON.parse(todo);
  }

  return null;
}

function addNewCategory(category) {
  if (category != null) {
    var categoryList = retrieveCategory();
    if(categoryList != null) {
      categoryList.push(category);
    } else {
      categoryList = [category];
    }
    saveCategoryList(categoryList);
  }
}

function saveCategoryList(categoryList) {
  if (categoryList != null && Array.isArray(categoryList)) {
    localStorage.setItem(config.localStorage.categoryKey, JSON.stringify(categoryList));
  }
}

function retrieveCategory() {
  var category = localStorage.getItem(config.localStorage.categoryKey);
  if (category != undefined) {
    // parse from string to object
    return JSON.parse(category);
  }
  return null;
}

// clear the local storage
function clearStorage() {
  localStorage.clear();
}