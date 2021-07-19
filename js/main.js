"use strict";

let lang = null;

function main(){
	loadJSON('lang/EN.json', getLang);
	loadJSON('data/languages.json',setLanguages);
	loadJSON('data/programmingLanguages.json',setSkills);
	setAge();
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
function getLangPercent(level){
	switch(level){
		case "A1": return 1/6;
		case "A2": return 2/6;
		case "B1": return 3/6;
		case "B2": return 4/6;
		case "C1": return 5/6;
		case "C2": return 6/6;
	}
}

function setAge(){
	let today = new Date();
	let birthday = new Date("10/06/1999");
	let age = today.getFullYear() - birthday.getFullYear();
	if (birthday.getMonth >  today.getMonth()) age--;
	else {
		if (birthday.getMonth ===  today.getMonth()) {
			if (birthday.getDate() >  today.getDate()) age--;
		}
	}
	document.getElementById("age").innerHTML = age;
}

function setLanguages(req){
	let languages = JSON.parse(req.responseText);
	for (let l in languages){
		if (languages.hasOwnProperty(l)){
			document.getElementById("languages").innerHTML +=
				"<div class='skillLine'>"+
				"<div class='col'>"+
				"<img class='skill' src='icons/languages/"+languages[l][0]+"' alt='language flag'>" +
				"<label><orange>'"+lang.languages[l]+"'</orange> :</label>" +
				"</div>"+
				"<div class='col'>"+
				"<progress value='"+getLangPercent(languages[l][1])+"'></progress>" +
				"<label><green>"+languages[l][1]+"</green>,</label>"+
				"</div>"+
				"</div>"
			;
		}
	}
}
function setSkills(req){
	let languages = JSON.parse(req.responseText);
	languages = Object.keys(languages).map(function(key) {
		return [key, languages[key]];
	});
	languages.sort(function(first, second) {
		return second[1][1] - first[1][1];
	});
	
	for (let i=0;i<languages.length;i++){
		document.getElementById("programmingLanguages").innerHTML +=
			"<div class='skillLine'>"+
				"<div class='col'>"+
					"<img class='skill' src='icons/programingLanguages/"+languages[i][1][0]+"' alt='programming language logo'>" +
					"<label><orange>'"+languages[i][0]+"'</orange> :</label>" +
				"</div>"+
				"<div class='col'>"+
					"<progress value='"+languages[i][1][1]/100+"'></progress>" +
					"<label><green>"+languages[i][1][1]+"%</green>,</label>"+
				"</div>"+
			"</div>"
		;
	}
}


