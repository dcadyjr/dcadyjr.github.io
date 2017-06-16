
// var batterTimer = null;
// var batter = {img:null, currentframe:0, totalframes:4}


// 	batter.img = new Image();
// 	batter.img.src = "https://retrogamezone.co.uk/images/sprites/nes/BaseballSheet1.gif";

// 	var drawbatter = function(){
// 	var myFrames = [{x:259, y:52, width:11, height:32},{x:275, y:60, width:16, height:24},{x:296, y:61, width:24, height:24},{x:325, y:61, width:16, height:24}]
// 		console.log(myFrames);
	

// 	function animatebatter(){
// 	  ctx.clearRect(0,0,28,50)
// 	  // console.log(myFrames);
// 	  // console.log(batter.currentframe);
// 	  ctx.drawImage(batter.img, myFrames[batter.currentframe].x, myFrames[batter.currentframe].y, myFrames[batter.currentframe].width, 
// 	myFrames[batter.currentframe].height, 0, 0, myFrames[batter.currentframe].width, 
// 	myFrames[batter.currentframe].height);
	  
// 	    batter.currentframe++;
// 	    if(batter.currentframe>=batter.totalframes){
// 	      clearInterval(batterTimer);
// 	       // ctx.clearRect(600,570,28,50)
// 	      batter.currentframe = 2;
// 	    }
// 	}
// }

	// batter.img.onload = function(){
	//   batterTimer = setInterval(animatebatter, 120);
	// }
