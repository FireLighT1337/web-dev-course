/* Useful links:
https://www.w3schools.com/jquery/jquery_ref_effects.asp
https://api.jquery.com/slideDown/
*/

$("h1").css("color", "red");

$("h1").addClass("big-title");
$("h1").removeClass("big-title");
// add multiple classes:
$("h1").addClass("big-title margin-50");

// select all buttons with jQuery:
$("button");

// check if element has a class:
$("h1").hasClass("margin-50");

// change text:
$("h1").text("test");

// like innerHTML:
$("button").html("<em>Hey</em>");

// change attributes:
$("a").attr("href", "https://google.com");

// print e.g. classes in console:
console.log($("h1").attr("class"));

// add click event listener, which will call the callback function:
$("h1").click(function () {
  console.log("Hello");
});

// change all buttons:
$("button").click(function () {
  $("h1").css("color", "purple");
});

// work with keypresses: (for whole document, just put document in parantheses)
$("input").keypress(function (event) {
  console.log(event.key);
});

// change h1 text to the key pressed:
$(document).keypress(function (event) {
  $("h1").text(event.key);
});

// alternative way to add event listener, first arg is the type of event, second arg is callback function:
$("h1").on("mouseover", function () {
  $("h1").css("color", "purple");
});

// in case its ever needed, add html through jQuery:
$("h1").before("html here");
$("h1").after("html here");
$("h1").prepend("html here");
$("h1").append("html here");

// remove something:
$("button").remove();

// animations:
$("h1").hide();
$("h1").show();
$("h1").toggle();

$("h1").fadeOut();
$("h1").fadeIn();
$("h1").fadeToggle();

$("h1").slideUp();
$("h1").slideDown();
$("h1").slideToggle();

$("h1").animate({ opacity: 0.5 }); // values inside need to be numeric
