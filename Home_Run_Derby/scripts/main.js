var canvas = document.getElementById("myCanvas");//gets the canvas element that I made on the html
var ctx = canvas.getContext("2d");//sets the canvas to 2d mode
// var randomNumber = Math.floor(Math.random() * ((-9 - 9)+ 1) + 9);//variable holds a random number between -10 and 10. used below to randomize the direction of hits
var homeRun = 0;//varialbe to hold the number of homeruns for the player
var totalOuts = 0;//variable to hold the total number of outs for the player
//variable that holds a random number between 400 and 550. used belwo to randomize the depth of "out" hits.
var randomPitchSpeed = 1;//varialbe that holds the speed of the pitch updated in newPitch function
var highScore = 0;//variable to hold the current high score


var hitAnimation = function(){
    

      $("#batter").addClass("swingAnimate");//adds the swingAnimate class to the batter div

      window.setTimeout(function() {//sets a delay
        $("#batter").removeClass("swingAnimate");//removes the swingAnimate class from the batter
      }, 500);//after .5s the class is removed
 }

var gameStart = function () {//wraps entire game into a function so it can be called when the play ball button is pressed

      var randomNumber = Math.floor(Math.random() * ((-8 - 8)+ 1) + 8);
      var randomPitchSpeed = Math.floor(Math.random() * ((2 - 1) +1) +1);
      var randomNumberY = Math.floor(Math.random() * ((400 - 550) +1) + 550);
      var randomHrNum = Math.floor(Math.random() * ((4 - 2)+ 1) + 2);

$("#homerunValue").html(homeRun);
$("#outValue").html(totalOuts);
$("#highscoreValue").html(highScore);

//function for a new pitch
  var newPitch = function (){//starts a function that make a new pitch happen after each hit.  used below in the move function
  	 ball.direction = "mound";
      

     setTimeout(function(){
      ball.position.x = 600;
      ball.position.y = 570;

      drawPitcher();

      ball.direction = "pitch";//changes the value of the direction property in the ball object to pitch
      
      
      randomNumber = Math.floor(Math.random() * ((-8 - 8)+ 1) + 8);
      randomPitchSpeed = Math.floor(Math.random() * ((2 - 1) +1) +1);
      randomNumberY = Math.floor(Math.random() * ((400 - 550) +1) + 550);
      randomHrNum = Math.floor(Math.random() * ((4 - 2)+ 1) + 2); 

      ball.position.x = 600;//sets the position of the ball on the x axis to 600
      ball.position.y = 570;//sets the postiion of the ball on the y axis to 570

      $(".playResult").html("");//clears the playResult part of the scoreboard
     },2000)
     
  }

  //function for game reset
  var reset = function() {//variable for game reset button
    $("#homerunValue").html("");//clears the home runs score from scoreboard
    $("#outValue").html("");//clears the out score from the scoreboard
    homeRun = 0;//resets homerun variable to 0
    totalOuts = 0;//resets the total outs variable to 0
    $(".resultPTag").append("");//clears the play result part of the scoreboard
    $(".reset").hide();
    newPitch();//runs the new pitch function
  } 

  // this is what makes the ball move
  var ball = {//variable ball that holds that is an object with properties for the baseball.
  	position: {x:600, y:570},//holds the x and y coordinates of the ball. starts at x600 and y500
  	direction: "pitch",//denotes what the ball is doing.  different states make the ball do different things
  	move: function() {//start of the funtion that is responsible for the movement of the ball.
   		//Pitch movement
      if (ball.direction === "pitch") {//condition statement that checks if the direction of the ball is "pitch".

            ball.position.y += randomPitchSpeed;//moves the ball position by 1 pixel down the y axis as long as ball direction is pitch
          //HR movement
   		} else if (ball.direction === "HR") {//condition statement that checks if the direction of the ball is HR(home run)
   				 ball.position.y -= randomHrNum;//moves the ball position by 5 pixels up the y axis as long as direction is HR
           ball.position.x += randomNumber;//moves the ball by a random number between -10 and 10 across the x axis. this randomizes which side of the field the ball is hit to.

          //out movement
    		} else if (ball.direction === "out") {//conditional statement to check if the direction of the ball is "out"
    				ball.position.y -= randomHrNum;//moves the position of the ball up the y axis by 5
    				ball.position.x += randomNumber;//moves the ball by a random number between -10 and 10 across the x axis. this randomizes which side of the field the ball is hit to.
            //stop movement
    		} else if (ball.direction === "stop") {//conditional statement checks to see if the direction of the ball is "stop"
            ball.position.x -= 0;//makes the ball stop moving on the y axis
            ball.position.y -= 0;//makes the ball stop moving on the x axis
    				newPitch();//this activates the function newPitch.  new pitch starts the next pitch in the game
            //strike movement
    		} else if (ball.direction === "gameOver") {//looks to see if ball direction is set to gameOver
            ball.position.y += 0;//makes the ball stop moving on the y axis
            ball.position.x -= 0;//makes the ball stop moving on the x axis
        } else if (ball.direction === "strike"){//conditional statement checks to see if the ball direction is strike
    				newPitch();//this activates the function newPitch.  new pitch starts the next pitch in the game
    		} else if (ball.direction === "mound") {
            
            ctx.clearRect(0,0,canvas.width,canvas.height);
        }

        if (ball.position.y > 646) {//checks to see if the position of the ball on the y axis is greater than 646
    				ball.direction = "stop";//changes the ball direction to stop
  				  ball.position.x = 600;//sets the x position of the ball to 600
  				  ball.position.y = 570;//sets the y position of the ball to 570
  				  totalOuts = totalOuts += 1;//increases the total outs by 1
  				  $("#outValue").html(totalOuts);
            $(".playResult").html("<p>OUT!!!</p>");
    		}	
  
    		if (ball.direction === "out" && ball.position.y > (randomNumberY - 5) && ball.position.y < (randomNumberY + 5)) {//checks if the ball direction is out and if the ball postion y is greater than or less than a radnom number between 400 and 550
    				ball.direction = "stop";//changes the ball direction to stop	 				
    		}
    		if (ball.direction === "HR" && ball.position.y < 0) {//conditional statement checks to see the ball direction is HR and the y position of the ball is less than 0
    				ball.direction = "stop";//changes the ball direction to stop
    		}
        if (totalOuts === 10){//checks to see if there are 10 outs
            ball.direction = "gameOver";//changes ball direction to gameOver
            $(".playResult").html("<p>GAME OVER</p>");//puts Game Over message on the scoreboard
            $(".reset").show();//shows the game reset button
        }
        
  	},
  	draw: function(){//this function draws the ball
  	  ctx.clearRect(ball.position.x -10,ball.position.y -10, 50, 50);//clears the canvas
  		ctx.beginPath();//gets read to draw
  		ctx.fillStyle = 'white';//makdes the fill fo the ball white
  		ctx.arc(ball.position.x, ball.position.y, 3, 0, Math.PI*2);//creates the circle that is the ball
      ctx.fill();//fill the circle
  	},

  }

  var animateCanvas = function(){//function to animate the canvas
   
      ball.move();//runs the move function from the ball object
    	ball.draw();//runs the draw function from the draw objectc

    	window.requestAnimationFrame(animateCanvas);//runs the animate canvas 60 fps
  }
      
  animateCanvas();//runs the animate canvas function


   
  document.addEventListener("keydown", function(){//adds the event listener looking for keydown
   	var key = event.which;//variable that holds the key that is pressed
   	var swingTime = ball.position.y;//a variable that holds the position of ball position y
   		if (key === 72 && swingTime >= 642 && swingTime <= 644) {//conditional for HR. listens ff the h key is pressed while the ball is between 642 and 644 pixels
        hitAnimation ();//runs hit animation function above

   			ball.direction = "HR";//changes the direction property in the ball object to HR
   			ball.draw();//runs the draw function in the ball object
  			ball.move();//runs the move function in the ball object
  			homeRun = homeRun += 1;//adds 1 to the homerun variable which keeps tracks of how many homeruns there are.
        $("#homerunValue").html(homeRun);//updates the total number of homeruns to the scoreboard
        
        $(document).ready(function() {

          var quotes = new Array ("HOME RUN!", "IT'S OUTTA HERE!", "SAYONARA!", "TAPE MEASURE SHOT!", "HEY HEY!", "HOLY COW!", "BACK BACK BACK GONE!", "SEE YA!", "KISS IT GOODBYE!", "GOING, GOING, GONE!");
          var randno = Math.floor(Math.random() * quotes.length);
          $(".playResult").html("<p>" + (quotes[randno]) + "</p>");
          $(".playResult p").addClass("blinkerText");
        });

            var audioHR = new Audio("media/hitcrowdcheer.mp3");
            audioHR.play(); 
         
          if (highScore < homeRun) {//conditional that checks if the highScore less than homerun total
          highScore = homeRun;//updates the highscore total with the homeRun total
          $("#highscoreValue").html(highScore);//puts the highScore in the scoreboard
        }
   		} else if (key === 72 && swingTime === 640 || key === 72 && swingTime === 641 || key === 72 && swingTime === 645 || key === 72 && swingTime === 646) {//conditional for an out.  looks to see if the H key is pressed while the ball is at certain pixels.
   			hitAnimation ();//runs hit animation function above
        ball.direction = "out";//changes the direction property in the ball object to "out"
   			ball.draw();//runs the draw function in the ball object
  			ball.move();//runs the move function in the ball object
   			totalOuts = totalOuts += 1;//adds 1 to the Total outs variable which keeps track of how many outs there are
   			$("#outValue").html(totalOuts);//updates the total number of outs to the scoreboard

            var outAudio = new Audio("media/bathitball.mp3");
            outAudio.play();

          $(document).ready(function() {

          var outQuotes = new Array ("OUT", "EASY OUT", "CAN OF CORN", "NOT EVEN CLOSE!", "NOT A CHANCE!", "HIT IT HARDER!", "THERE'S NO CRYING IN BASEBALL!");
          var a = Math.floor(Math.random() * outQuotes.length);
          $(".playResult").html("<p>" + (outQuotes[a]) + "</p>");//puts the message in the play result part of scoreboard
          
        });
        //puts the message in the play result part of scoreboard
   		} else if (key === 72 && swingTime <= 639 && swingTime > 630 || key === 72 && swingTime === 646) {//listens for the H key to be pressed while the ball is at or between certain pixels
   			  hitAnimation ();//runs hit animation function above
          ball.direction = "stop";//changes the direction in the ball object to stop
   			  ball.draw();//runs the draw function in the ball object
  			  ball.move();//runs the move function in the ball object
  			  totalOuts = totalOuts += 1;//adds 1 to the total outs variable which keep track of how many outs there are.
          $("#outValue").html(totalOuts);//takes the value of the total outs variable and updates the outs total of the scoreboard
        
          var outAudioFiles = new Array("media/boooo.mp3", "media/crowdboo.mp3")
          var c = Math.floor(Math.random() * outAudioFiles.length);

          var strikeAudio = new Audio((outAudioFiles[c]));
          strikeAudio.play(); 

          $(document).ready(function() {

          var strikeQuotes = new Array ("K", "STRIKE!", "THE WHIFF", "BLEW IT BY HIM!", "BAT'S MADE OF SWISS CHEESE", "MADE HIM LOOK SILLY!");
          var b = Math.floor(Math.random() * strikeQuotes.length);
          $(".playResult").html("<p>" + (strikeQuotes[b]) + "</p>");//puts the message in the play result part of scoreboard
          
        });

   		} else if (key === 72) {//listens for the h key to be pressed
          hitAnimation ();//runs hit animation
      }
    })

    $(".reset").click(function(){//grabs the reset button and put a click listener on it
      reset();//runs the reset function.
  });

}//gameStart closing bracket



$(".startbtn").click(function() {//grabs the payball button
    
    $(document).ready(function(){
    $(".startScreen").fadeOut(2000);
  })

    var btnAudio = new Audio("media/bathitball.mp3");
    btnAudio.play();

    var name = document.getElementById("playerName").value;//gets the value entered in the name field
    $(".namePTag").append(name);//puts the name into the <p> in the scoreboard

    // gameStart();
    window.setTimeout(gameStart, 3000);
    // starts the game function
});



////////// FOR API STUFF//////////////////////////////

// var teamNames = [];
// var teamCodes = [];
// var a;

// $.ajax({
//   method: "GET",
//   url: "http://mlb.com/lookup/json/named.team_all.bam?sport_code=%27mlb%27&active_sw=%27Y%27&all_star_sw=%27N%27",

//   success: function(response) {

//     a = response; 
//     for (var i = 0; i < a.team_all.queryResults.row.length; i++) {

//       teamCodes = a.team_all.queryResults.row[i].team_code;
//       teamNames = a.team_all.queryResults.row[i].name_display_full;
//         console.log(teams, teamNames);

//         var ul = $("<ul>");
//         ul.append("<li><a href="'http://mlb.mlb.com/shared/properties/style/bal.json'">" + teamNames + "</a></li>");
//         $("#teams").append(ul);

//     }
//   }

// })

// url: <a href="http://mlb.mlb.com/shared/properties/style/bal.json">


// ul.append("<li>" + teamNames+ "</li>");

