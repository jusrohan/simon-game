const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];

let userClickedPattern = [];

let started = false;

let level = 0;

$(document).keydown(function(){
  if(!started){
    $("h1").text("Level "+level);
    nextSequence();
  }

  started = true;
})

$(".btn").click(function() {
  let userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  console.log(userClickedPattern);
  console.log(gamePattern);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
})

function nextSequence() {

  userClickedPattern = [];
  let randomNumber = Math.floor(Math.random() * 4);

  let randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  animatePress(randomChosenColour);

  level++;
  $("h1").text("Level "+level);
}

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");

  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("success");

    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    console.log("Failure");
    let aud = new Audio("sounds/wrong.mp3");
    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("h1").text("Game Over, Press Any Key to Restart");

    started = false;
    gamePattern = [];
    level = 0;
  }

}
