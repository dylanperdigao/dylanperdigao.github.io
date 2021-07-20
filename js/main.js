"use strict";

function main(){
	fetch('lang/EN.json')
		.then(p1 => p1.text())
		.then(lang => fetch('data.json')
					.then(x => x.text())
					.then(data => setData(JSON.parse(lang),JSON.parse(data))));
	fetch('https://api.github.com/users/dylanperdigao/repos')
		.then(p1 => p1.text())
		.then(data => setProjects(JSON.parse(data)));
	setAge();
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
function setData(lang,data){
	setLanguages(lang,data.languages);
	setFormation(lang,data.formation);
	setSkills(lang,data.skills);
	setCertifications(lang,data.certifications);
}
function setLanguages(lang,languages){
	let html = "";
	for (let i=0; i<languages.length; i++){
		html +=
			"<div class='skillLine'>"+
			"<div class='col'>"+
			"<img class='skill' src='"+languages[i].img+"' alt='"+lang.languages[languages[i].acronym]+" flag'>" +
			"<label><orange>'"+lang.languages[languages[i].acronym]+"'</orange> :</label>" +
			"</div>"+
			"<div class='col'>"+
			"<progress value='"+getLangPercent(languages[i].level)+"'></progress>" +
			"<label><green>"+languages[i].level+"</green>,</label>"+
			"</div>"+
			"</div>"
		;
	}
	document.getElementById("languagesDiv").innerHTML = html;
}
function setFormation(lang,formation){
	let html="";
	for (let i=0; i<formation.length; i++){
		html +=
			"<h2>"+lang.institutions[formation[i].institution]+"<gray className='gray'> {</gray></h2>"+
			"<div class='certificationsGroup'>"
		;
		let qualifications = formation[i].qualifications;
		for(let j=0; j<qualifications.length; j++){
			html +=
				"<div class='imgbox'>"+
				"<a href='"+qualifications[j].url+"'>"+
				"<img src='"+qualifications[j].img+"' class='certifications' alt='"+formation[i].institution+" logo'>"+
				"</a>"+
				"<p><orange>'"+lang.formation[qualifications[j].name]+"'</orange> : <green>"+qualifications[j].date+"</green></p>"+
				"</div>"
			;
		}
		html +=
			"</div>"+
			"<h2><gray>}</gray></h2>"
		;

	}
	document.getElementById("formationDiv").innerHTML = html;
}
function setSkills(lang,skills){
	let html="";
	skills.sort(function(a, b) {
		return a.level < b.level;
	});
	for (let i=0; i<skills.length; i++){
		html +=
			"<div class='skillLine'>"+
				"<div class='col'>"+
					"<img class='skill' src='"+skills[i].img+"' alt='"+skills[i].name+" logo'>" +
					"<label><orange>'"+skills[i].name+"'</orange> :</label>" +
				"</div>"+
				"<div class='col'>"+
					"<progress value='"+skills[i].level/100+"'></progress>" +
					"<label><green>"+skills[i].level+"%</green>,</label>"+
				"</div>"+
			"</div>"
		;
	}
	document.getElementById("skillsDiv").innerHTML = html;
}
function setCertifications(lang,certifications){
	let html="";
	for (let i=0; i<certifications.length; i++){
		html +=
			"<h2>"+certifications[i].institution+"<gray className='gray'> {</gray></h2>"+
			"<div class='certificationsGroup'>"
		;
		let badges = certifications[i].badges;
		for(let j=0; j<badges.length; j++){
			html +=
					"<div class='imgbox'>"+
					"<a href='"+badges[j].url+"'>"+
					"<img src='"+badges[j].img+"' class='certifications' alt='"+badges[j].name+" logo'>"+
					"</a>"+
					"<p><orange>'"+badges[j].name+"'</orange> : <green>"+badges[j].date+"</green></p>"+
					"</div>"
			;
		}
		html +=
			"</div>"+
			"<h2><gray>}</gray></h2>"
		;
	}
	document.getElementById("certificationsDiv").innerHTML = html;
}
function setProjects(projects){
	projects.sort(function(a, b) {
		let total_a = a.forks_count+a.watchers_count+a.stargazers_count;
		let total_b = b.forks_count+b.watchers_count+b.stargazers_count;
		return total_a < total_b;
	});
	console.log(projects);
	let html="";
	for (let i=0; i<projects.length; i++){
		if(projects[i].description && projects[i].language){
			let page="";
			if(projects[i].has_pages){
				page="<p><orange>'Try'</orange> : <green><a href='"+projects[i].homepage+"' style='text-decoration: underline'>here</a> 🔗</green>,</p>";
			}
			html +=
				"<h2><a href='"+projects[i].svn_url+"'>"+projects[i].name+"</a><gray className='gray'> 🔗 {</gray></h2>"+
				"<div class='projectInfo'>"+
					"<p><orange>'Description'</orange> : <green>"+projects[i].description+"</green>,</p>"+
					page +
					"<p><orange>'Language'</orange> : <green>"+projects[i].language+"</green></p>"+
					"</div>"+
				"</div>"+
				"<h2><gray>}</gray></h2>"
			;
		}
	}
	document.getElementById("projectsDiv").innerHTML = html;
}


