"use strict";

let lang = null;

function main(){
	loadJSON('lang/EN.json', getLang)
	loadJSON('data/languages.json',setLanguages);
	loadJSON('data/programmingLanguages.json',setSkills);
}

function loadJSON(url, func){
	const req = new XMLHttpRequest();
	req.open('GET', url);
	req.onload = function () {
		func(this);
	};
	req.send();
}

function getLang(req){
	lang = JSON.parse(req.responseText);
}

function setLanguages(req){
	let languages = JSON.parse(req.responseText);
	for (let i=0;i<languages.length;i++){
		document.getElementById("languages").innerHTML +=
			"<div class='skillLine'>"+
			"<div class='col'>"+
			"<img class='skill' src='icons/languages/"+languages[i][0]+".png'>" +
			"<label><orange>'"+lang[languages[i][0]]+"'</orange> :</label>" +
			"</div>"+
			"<div class='col'>"+
			"<progress value='"+languages[i][1]+"'></progress>" +
			"<label><green>"+languages[i][1]+"</green>,</label>"+
			"</div>"+
			"</div>"
		;
	}
}
function setSkills(req){
	let languages = JSON.parse(req.responseText);
	languages = Object.keys(languages).map(function(key) {
		return [key, languages[key]];
	});
	languages.sort(function(first, second) {
		return second[1] - first[1];
	});
	
	for (let i=0;i<languages.length;i++){
		document.getElementById("programmingLanguages").innerHTML +=
			"<div class='skillLine'>"+
				"<div class='col'>"+
					"<img class='skill' src='icons/programing_languages/"+languages[i][0].toLowerCase()+".png'>" +
					"<label><orange>'"+languages[i][0]+"'</orange> :</label>" +
				"</div>"+
				"<div class='col'>"+
					"<progress value='"+languages[i][1]/100+"'></progress>" +
					"<label><green>"+languages[i][1]+"%</green>,</label>"+
				"</div>"+
			"</div>"
		;
	}
}


