
var pitcherTimer = null;
var pitcher = {img:null, currentframe:0, totalframes:5}

	pitcher.img = new Image();
	pitcher.img.src = "https://retrogamezone.co.uk/images/sprites/nes/BaseballSheet1.gif";
var drawPitcher = function(){
	var myFrames = [{x:218, y:7, width:15, height:20},{x:200, y:4, width:14, height:23},{x:174, y:7, width:25, height:21},{x:157, y:3, width:15, height:24},{x:134, y:7, width:20, height:20}]

	

	// pitcher.img.onload = function(){
	  pitcherTimer = setInterval(animatepitcher, 120);
	// }

	function animatepitcher(){
	  ctx.clearRect(595,565,28,50)
	  // console.log(myFrames);
	  // console.log(pitcher.currentframe);
	  ctx.drawImage(pitcher.img, myFrames[pitcher.currentframe].x, myFrames[pitcher.currentframe].y, myFrames[pitcher.currentframe].width, 
	myFrames[pitcher.currentframe].height, 595, 565, myFrames[pitcher.currentframe].width, 
	myFrames[pitcher.currentframe].height);
	  
	    pitcher.currentframe++;
	    if(pitcher.currentframe>=pitcher.totalframes){
	      clearInterval(pitcherTimer);
	       // ctx.clearRect(600,570,28,50)
	      pitcher.currentframe = 0;
	    }
	}
}