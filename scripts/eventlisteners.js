/**
 * Created by Jackie on 2016-08-16.
 */

$("#home_category_add").on("click", function () {
  var input = $("#home_category_input");
  // get value
  var value = input.val();

  if(value) {
    // reset values
    input.val("");
    // add category ( value, callback)
    addCategory(value);
    loadCategory(config.form.category);
    refreshCategory();
  }
});