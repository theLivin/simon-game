var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

// Varaible to check if game has already started
var started = false;

// Level counter
var level = 0;

// Generates random game sequence
function nextSequence() {
  // reset userClickedPattern
  userClickedPattern = [];

  // Increase level
  level ++;

  // Update h1
  $("#level-title").text("Level "+level);

  // Generate random number from 0 - 3
  var randomNumber = Math.floor(Math.random()*4);

  // Choose a random colour
  var randomChosenColour = buttonColours[randomNumber];

  // Add random chosen colour to gamePattern
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  // Play random sound
  playSound(randomChosenColour);
}

// Play sound
function playSound(name) {
  // Play colour sound
  var colourSound = new Audio("sounds/"+ name + ".mp3");
  colourSound.play();
}

// Add click event listener to buttons
$(".btn").click(function () {
  // Get id of clicked button
  var userChosenColour = $(this).attr("id");

  // Add user clicked key to user clicked pattern array
  userClickedPattern.push(userChosenColour);

  //console.log("User Clicked Pattern: " + userClickedPattern);
  //console.log("Game Pattern: " + gamePattern);


  // Play sound based on clicked button
  playSound(userChosenColour);

  // Add animation
  animatePress(userChosenColour);

  // Call checkAnswer() after a user has clicked and chosen their answer,
  //passing in the index of the last answer in the user's sequence
  checkAnswer(userClickedPattern.length -1);
});

// Add animation to pressed button
function animatePress(currentColour) {
  // Add pressed class to pressed button
  $("#"+currentColour).addClass("pressed");

  // Remove pressed class after 100 milliseconds
  setTimeout(function () {
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}


// Detect keyboard press
$(document).keypress(function () {
  if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started = true;
  }
});


function checkAnswer(currentLevel) {
  // Check if user's most recent answer is same as game pattern
  if( gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    // Check if user has finished their sequence if they got answer right
    if(userClickedPattern.length === gamePattern.length){
      // call nextSequence after 1000 milliseconds delay
      setTimeout(function (){
        nextSequence();
      }, 1000);
    }

  }else {
    console.log("wrong");

    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();

    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}


function startOver(){
  started = false;
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
}
