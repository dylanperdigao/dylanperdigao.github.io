"use strict";

function main(){
	var vertices;
	var canvas = document.getElementsByTagName("canvas");
	for(var i=0;i<canvas.length;i++){
		let ctx = canvas[i].getContext('2d');
		let w = ctx.canvas.width;
		let h = ctx.canvas.height;
		switch (i){
			case 0:
				vertices = new Array(
					new Vertex(w/3,0),
					new Vertex(w,0),
					new Vertex(w,h),
					new Vertex(w*2/3,h),
				);
				break;
			case 1:
				vertices = new Array(
					new Vertex(w*2/3,0),
					new Vertex(w,0),
					new Vertex(w,h),
					new Vertex(w*9/10,h),
				);
				break;
			case 2:
				vertices = new Array(
					new Vertex(w*9/10,0),
					new Vertex(w,0),
					new Vertex(w,h),
					new Vertex(w*9/10,h),
				);
				break;
			case 3:
				vertices = new Array(
					new Vertex(w*9/10,0),
					new Vertex(w,0),
					new Vertex(w,h),
					new Vertex(w*2/3,h),
				);
				break;
			case 4:
				vertices = new Array(
					new Vertex(w*2/3,0),
					new Vertex(w,0),
					new Vertex(w,h),
					new Vertex(w/3,h),
				);
				break;
		}
		let background = new Background(new Array(new Polygon(vertices,"#06D6A0")));
		background.draw(ctx);
	}
}



