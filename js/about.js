"use strict";

function aboutAnimation(){
	var canvas = document.getElementById("c2");
	var ctx = canvas.getContext('2d');
	animation(ctx);
}

function animation(ctx){
	var r=0;
	var y = ctx.canvas.height;
	var interval=1;
	var alpha=0;
	var n = 15;
	var circles = new Array();
	for(var i=0;i<n;i++){
		circles.push(new Circle(500,500,5,"white"));
		circles[i].move(circles[i].x0,y)
	}
	//animation
	var anim = function(){
		ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
		for(var i=0;i<n;i++){
			if(y>ctx.canvas.height/2){
				y-=interval/5;
				circles[i].move(circles[i].x,y);
			}else{
				alpha = (i/n)*2*Math.PI;
				circles[i].move(circles[i].x0+r*Math.cos(alpha),circles[i].y0+r*Math.sin(alpha));
			}
			circles[i].draw(ctx);
		}
		if(y<ctx.canvas.height/2){
			r+=interval;
		}
		if(r>(4/3)*ctx.canvas.height){
			r=0;
			y=ctx.canvas.height;
			for(var i=0;i<n;i++){
				circles[i].move(circles[i].x0,y);
			}
		}
		setTimeout(anim,interval);
	}
	setTimeout(anim,interval);
	
}