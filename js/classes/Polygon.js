class Polygon{
	constructor(vertices,color){
		this.vertices=vertices;
		this.color=color;
	}
	draw(ctx){
		if(this.vertices.length>1){
			ctx.fillStyle = this.color;
			ctx.beginPath();
			for(var i=0;i<this.vertices.length;i++){
				if(i<this.vertices.length-1){
					ctx.lineTo(this.vertices[i].x,this.vertices[i].y,this.vertices[i+1].x,this.vertices[i+1].y);
				}else{
					ctx.lineTo(this.vertices[i].x,this.vertices[i].y,this.vertices[0].x,this.vertices[0].y);
				}
			}
			ctx.stroke();
			ctx.fill();
		}
	}
}