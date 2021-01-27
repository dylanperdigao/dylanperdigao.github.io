"use strict";

function homeBackground(){
	var canvas = document.getElementById("c1");
	var ctx = canvas.getContext('2d');
	var w = 1000;
	var h = 1000;
	ctx.fillStyle = "green";
	ctx.beginPath();
		ctx.lineTo(w/3,0,w,0);
		ctx.lineTo(w,0,w,h);
		ctx.lineTo(w,h,w/2,h);
		ctx.lineTo(w*2/3,h,w/3,0);
	ctx.stroke();
	ctx.fill();
}