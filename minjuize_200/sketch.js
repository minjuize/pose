let speech;
let said;
let word = [];
var directionX;

let video;
let poseNet;
let poses = [];

let pkeyHandX, pkeyHandY, keyHandX, keyHandY;
let pkeyHandX1, pkeyHandY1, keyHandX1, keyHandY1;

let img;
function preload(){
   img = loadImage("200.PNG");
   img1 = loadImage("200_2.PNG")
}
function setup() {
  createCanvas(1080, 1020);
  directionX = 1;
  textSize(30);
  speechRec = new p5.SpeechRec("ko-KR", gotSpeech);
  let continuous = true;
  let interimResults = false;
  speechRec.start(continuous, interimResults);

  function gotSpeech() {
    console.log(speechRec);
    if (speechRec.resultValue) {
      said = speechRec.resultString;
      word = said.split("");
      console.log(said);
    }
  }

  video = createCapture(VIDEO);
  video.size(width, height);
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on("pose", function (results) {
    poses = results;
  });
  video.hide();
}

function modelReady() {
  console.log("Ai Activated!");
}

function draw() {
  image(video, 0, 0, width, height);
  drawKeypoints();
}

function drawKeypoints() {
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i].pose;
    let keypoint = pose.keypoints[10];
    let keypoint1 = pose.keypoints[9];

    if (keypoint.score > 0.2) {
      keyHandX = pkeyHandX;
      keyHandY = pkeyHandY;
      pkeyHandX = keypoint.position.x;
      pkeyHandY = keypoint.position.y;

        if(keyHandX > width/2){
        directionX = -1;
      }
      if(keyHandX < width/2){
        directionX = 1;
      }
      for (var j = 0; j < word.length; j++) {
       image(img, keyHandX-125, keyHandY, 250, 250);
       text(word[j], keyHandX + directionX * j * 25, random(keyHandY - 3, keyHandY + 3));
        console.log(word[j]);
     }
    }

    if (keypoint1.score > 0.2) {
      keyHandX1 = pkeyHandX1;
      keyHandY1 = pkeyHandY1;
      pkeyHandX1 = keypoint1.position.x;
      pkeyHandY1 = keypoint1.position.y;

        if(keyHandX1 > width/2){
        directionX = -1;
      }
      if(keyHandX1 < width/2){
        directionX = 1;
      }
      for (var j = 0; j < word.length; j++) {
        image(img1, keyHandX1-125, keyHandY1, 250, 250);
        text(word[j], keyHandX1 + directionX * j * 25, random(keyHandY1 - 3, keyHandY1 + 3));
        console.log(word[j]);
      }
    }
  }
}