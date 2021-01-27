class Circle{
	constructor(x,y,radius,color){
		this.x0 = x;
		this.y0 = y;
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
	}

	draw(ctx){
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
		ctx.stroke();
		ctx.fill();
	}

	move(x,y){
		this.x = x;
		this.y = y;
	}
}