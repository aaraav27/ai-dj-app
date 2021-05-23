scoreleftwrist = 0;
scorerightwrist = 0;

song = "";
leftwristx = 0;
leftwristy = 0;
rightwristx = 0;
rightwristy = 0;

function preload()
{
	song = loadSound("music.mp3");
}



function setup() {
	canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	poseNet  = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotposes);
}

function gotposes(result){
if(result.length > 0){
	console.log(result);

	scoreleftwrist = result[0].pose.keypoints[9].score;
	console.log(scoreleftwrist);

	scorerightwrist = result[0].pose.keypoints[10].score;
	console.log(scorerightwrist);

	leftwristx = result[0].pose.leftWrist.x;
	leftwristy = result[0].pose.leftWrist.y;
	console.log("leftwristx = "+ leftwristx + "leftwristy ="+ leftwristy);


	rightwristx = result[0].pose.rightWrist.x;
	rightwristy = result[0].pose.rightWrist.y;
	console.log("rightwristx = "+ rightwristx + "rightwristy ="+ rightwristy);
}

}


function modelLoaded(){
	console.log("model is initialized")
}

function draw() {
	image(video, 0, 0, 600, 500);
	fill("red");
	stroke("blue"); 
	if(scoreleftwrist > 0.1){
		circle(leftwristx , leftwristy, 20);
		leftwristynumber = Number(leftwristy);
		remove_decimals = floor(leftwristynumber);
		volume = remove_decimals/500;
		song.setVolume(volume);
		console.log("song volume is" + volume);
		document.getElementById("volume").innerHTML = "volume = " + volume;
	}
    
	if(scorerightwrist>0.1){
circle(rightwristx, rightwristy, 20);

if(rightwristy>0 && rightwristy<=100){
	document.getElementById("speed").innerHTML = "speed = 0.5x";
	song.rate(0.5);
}
	
else if(rightwristy>100 && rightwristy<=200){
	document.getElementById("speed").innerHTML = "speed = 1x";
	song.rate(1);
}

else if(rightwristy>200 && rightwristy<=300){
	document.getElementById("speed").innerHTML = "speed = 1.5x";
	song.rate(1.5);
}

else if(rightwristy>300 && rightwristy<=400){
	document.getElementById("speed").innerHTML = "speed = 2x";
	song.rate(2);
}

else if(rightwristy>400 && rightwristy<=500){
	document.getElementById("speed").innerHTML = "speed = 2.5x";
	song.rate(2.5);
}

	}


}

function play()
{
	song.play();

	song.rate(1);
	
}
