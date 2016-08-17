/**
 * Created by Jackie on 2016-08-16.
 */

$("#home_category_add").on("click", function () {
  var input = $("#home_category_input");
  var value = input.val();

  if(value) {
    // add category ( value, callback)

    // reset values
    input.val("");
    addCategory(value);
    loadCategory(config.form.category);
    refreshPage();
  }
});