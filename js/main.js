"use strict";
(function(){var e,t,a,d,r,l,i,m,n,u,o;for(window.CREDLY_EMBED_JS_LOADER_VERSION="20210331",e="www.credly.com",u=function(e){if(null!=e)return/(.*\.credly.com$|(acclaim\.local|localhost|web):500[0-1]$)/.test(e)?e:void 0},l=0,i=(m=function(e){var t,a,d,r,l;if(null!=document.querySelectorAll)return document.querySelectorAll("[data-"+e+"]");for(l=[],d=0,r=(t=document.getElementsByTagName("*")).length;d<r;d++)(a=t[d]).getAttribute("data-"+e)&&l.push(a);return l}("share-badge-id")).length;l<i;l++)a=(d=m[l]).attributes.getNamedItem("data-share-badge-id").value,o=d.attributes.getNamedItem("data-iframe-width").value,r=d.attributes.getNamedItem("data-iframe-height").value,(t=u(null!=(n=d.attributes.getNamedItem("data-badge-host"))?n.value:void 0))||(t=e),d.outerHTML='<iframe name="acclaim-badge" allowTransparency="true" frameborder="0" id="embedded-badge-'+a+'" scrolling="no" src="//'+t+"/embedded_badge/"+a+'" style="width: '+o+"px; height: "+r+'px;" title="View my verified achievement on Credly." ></iframe>'}).call(this);
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



