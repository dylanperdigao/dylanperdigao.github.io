"use strict";

function main(l){
	fetch('lang/'+l+'.json')
		.then(p1 => p1.text())
		.then(lang => fetch('data.json')
					.then(x => x.text())
					.then(data => fetch('https://api.github.com/users/dylanperdigao/repos')
						.then(p1 => p1.text())
						.then(projects => setData(JSON.parse(lang),JSON.parse(data),JSON.parse(projects)))));

}
function setData(lang,data,projects){
	setSections(lang);
	setProfile(lang,data.profile)
	setAbout(lang,data.about)
	setLanguages(lang,data.languages);
	setFormation(lang,data.formation);
	setSkills(lang,data.skills);
	setCertifications(lang,data.certifications);
	setProjects(lang,projects);
	setContact(lang);
}
function checkEndDate(lang,date){
	switch(date){
		case "": return lang.formation.now;
		default: return date;
	}
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
function getAge(birth){
	let today = new Date();
	let birthday = new Date(birth);
	let age = today.getFullYear() - birthday.getFullYear();
	if (birthday.getMonth >  today.getMonth()) age--;
	else {
		if (birthday.getMonth ===  today.getMonth()) {
			if (birthday.getDate() >  today.getDate()) age--;
		}
	}
	return age;
}
function setSections(lang){
	let html = "";
	for(let s in lang.section){
		html+= "<a href='#"+s+"'>"+lang.section[s]+" </a>"
	}
	document.getElementById("sections").innerHTML = html;
}
function setProfile(lang,data){
	document.getElementById("profileDiv").innerHTML =
		"<img src='"+data.url+"'>"+
		"<p>"+lang.profile[0]+"</p>"+
		"<p>"+lang.profile[1]+"</p>"
	;
}
function setAbout(lang,data){
	document.getElementById("aboutDiv").innerHTML =
		"<h1>"+lang.section.about+" <gray>{</gray></h1>"+
		"<div class='about'>"+
		"<p>🎂 : <green>"+data.birth+"</green> (<green>"+getAge(data.birth)+"</green>),</p>"+
		"<p>🌍 : <green>"+lang.about[data.nationality[0]]+"</green> & <green>"+lang.about[data.nationality[1]]+"</green>,</p>"+
		"<p>📍 : <green>"+data.city+"</green></p>"+
		"</div>"+
		"<h1><gray>}</gray></h1>"
	;
}
function setLanguages(lang,languages){
	let html = "<h1>"+lang.section.languages+" <gray>{</gray></h1>\n" +
				"<div id='languagesDiv'>"
	;
	for (let i=0; i<languages.length; i++){
		let x = ""
		if(languages[i].acronym==='PT'){
			x ="onclick='secret1()'"
		}
		html +=
			"<div class='skillLine'>"+
			"<div class='col'>"+
			"<img class='skill' src='"+languages[i].img+"'"+x+"alt='"+lang.languages[languages[i].acronym]+" flag'>" +
			"<label><orange>'"+lang.languages[languages[i].acronym]+"'</orange> :</label>" +
			"</div>"+
			"<div class='col'>"+
			"<progress value='"+getLangPercent(languages[i].level)+"'></progress>" +
			"<label><green>"+languages[i].level+"</green>,</label>"+
			"</div>"+
			"</div>"
		;
	}
	html += "</div>" +
			"<h1><gray>}</gray></h1>"
	;
	document.getElementById("languages").innerHTML = html;
}
function setFormation(lang,formation){
	let html=	"<h1>"+lang.section.formation+" <gray>{</gray></h1>"+
				"<div id='formationDiv'>"
	;
	for (let i=0; i<formation.length; i++){
		html +=
			"<a href='"+formation[i].url+"'>"+
			"<img src='"+formation[i].img+"' class='institution' alt='"+formation[i].institution+" logo'>"+
			"</a>"+
			"<h2>"+lang.institutions[formation[i].institution]+"<gray className='gray'> {</gray></h2>"+
			"<div class='institutionGroup'>"
		;
		let qualifications = formation[i].qualifications;
		for(let j=0; j<qualifications.length; j++){
			html +=
				"<p><orange>'"+lang.formation[qualifications[j].name]+"'</orange> : <green>"+qualifications[j].begin_date+" - "+checkEndDate(lang,qualifications[j].end_date)+"</green></p>"
			;
		}
		html += "</div>"+
				"<h2><gray>}</gray></h2>"
		;

	}
	html += "</div>"+
			"<h1><gray>}</gray></h1>"
	;
	document.getElementById("formation").innerHTML = html;
}
function setSkills(lang,skills){
	let html=	"<h1>"+lang.section.skills+" <gray>{</gray></h1>"+
				"<div id='skillsDiv'>"
	;
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
	html +=
		"</div>"+
		"<h1><gray>}</gray></h1>"
	;
	document.getElementById("skills").innerHTML = html;
}
function setCertifications(lang,certifications){
	let html=	"<h1>"+lang.section.certifications+" <gray>{</gray></h1>"+
				"<div id='certificationsDiv'>"
	;
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
	html +=
		"</div>"+
		"<h1><gray>}</gray></h1>"
	;
	document.getElementById("certifications").innerHTML = html;
}
function setProjects(lang,projects){
	let html=	"<h1>"+lang.section.projects+" <gray>{</gray></h1>"+
				"<div id='projectsDiv'>"
	;
	projects.sort(function(a, b) {
		let total_a = a.forks_count+a.watchers_count+a.stargazers_count;
		let total_b = b.forks_count+b.watchers_count+b.stargazers_count;
		return total_a < total_b;
	});
	for (let i=0; i<projects.length; i++){
		if(projects[i].description && projects[i].language){
			let page="";
			if(projects[i].has_pages){
				page="<p><orange>'Try'</orange> : <a class='try' href='"+projects[i].homepage+"'>here</a>,</p>";
			}else{
				console.log("Not displayed: " +projects[i]);
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
	html += "</div>"+
			"<h1><gray>}</gray></h1>"
	;
	document.getElementById("projects").innerHTML = html;
}

function setContact(lang){
	document.getElementById("contact").innerHTML =
		"<h1>"+lang.section.contact+" <gray>{</gray></h1>"+
		"<form accept-charset='UTF-8' action='https://usebasin.com/f/772232c9b430' enctype='multipart/form-data' target='_blank' method='POST'>"+
		"<div id='contactDiv'>"+
		"<h2>"+lang.contact.email+"<gray> {</gray></h2>"+
		"<input type='email' id='email' name='email' placeholder='"+lang.contact.email+"' required>"+
		"<h2><gray>}</gray></h2>"+
		"<h2>"+lang.contact.message+"<gray> {</gray></h2>"+
		"<textarea rows='6' cols='50' name='comment' placeholder='"+lang.contact.message+"' required></textarea><br>"+
		"<h2><gray>}</gray></h2>"+
		"<button type='submit'>"+lang.contact.send+"</button>"+
		"</div>"+
		"</form>"+
		"<h1><gray>}</gray></h1>"
	;
}


