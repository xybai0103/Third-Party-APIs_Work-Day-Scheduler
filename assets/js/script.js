// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  var userInputArray = [];
  $('.saveBtn').click('button', function(event){
    event.preventDefault();
    // save user-input object in an array and stored in local storage
    var userInput = {
      id: $(this).parent().attr('id'),
      input: $(this).prev().val()
    }
    userInputArray.push(userInput);
    localStorage.setItem('userInputArray', JSON.stringify(userInputArray));
  });
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  // use Day.js to get the current hour in 24-hour time
  var currentHour = dayjs().format('HH');
  var containerId = ["hour-9", "hour-10", "hour-11","hour-12","hour-13","hour-14","hour-15","hour-16","hour-17"];
  for (var i = 0; i < containerId.length; i++) {
    if (i + 9 < currentHour) {
      $('#'+containerId[i]).addClass('past');
      // === doesn't work
    } else if (i + 9 == currentHour) {
      $('#'+containerId[i]).addClass('present');
    } else {
      $('#'+containerId[i]).addClass('future');
    }
  }

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  // get stored user input from local storage
  storedUserInput = JSON.parse(localStorage.getItem('userInputArray'))
  for (var i = 0; i < storedUserInput.length; i++) {
    // $('#'+storedUserInput[i].id) is the containing time-block element with the corresponding id
    $('#'+storedUserInput[i].id).children('.description').text(storedUserInput[i].input);
  }

  /* tried way 1 doesn't work
  var containerId = ["hour-9", "hour-10", "hour-11","hour-12","hour-13","hour-14","hour-15","hour-16","hour-17"];
  for (var i = 0; i < containerId.length; i++) {
  $('#'+(containerId[i])).children('.description').text(JSON.parse(localStorage.getItem(containerId[i])).input);
  };
  */

  /* tried way 2 doesn't work
  var containerId = $('.description').parent().attr('id');
  var storedInput = JSON.parse(localStorage.getItem(containerId)).input;
  $('.description').text(storedInput);
  */

  // TODO: Add code to display the current date in the header of the page.
  var today = dayjs();
  $('#currentDay').text(today.format('dddd, MMMM D'));
});