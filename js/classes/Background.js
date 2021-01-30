class Background{
	constructor(polygons){
		this.polygons=polygons;
	}
	draw(ctx){
		for(var i in this.polygons){
			this.polygons[i].draw(ctx);
		}
	}
}