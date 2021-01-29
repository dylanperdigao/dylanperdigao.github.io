function projectsBackground(){
	var canvas = document.getElementById("c4");
	var ctx = canvas.getContext('2d');
	let w = ctx.canvas.width;
	let h = ctx.canvas.height;
	ctx.fillStyle = "#06D6A0";
	ctx.beginPath();
		ctx.lineTo(w*9/10,0,	w*11/10,0);
		ctx.lineTo(w*11/10,0,	w,h);
		ctx.lineTo(w*5/10,h,	w*3/10,h);
		ctx.lineTo(w*3/10,h,	w*9/10,0);
	ctx.stroke();
	ctx.fill();
}