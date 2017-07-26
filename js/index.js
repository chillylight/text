function addLoadEvent(func){
	var oldonload = window.onload;
	if (typeof window.onload!="function") {
		window.onload = func;
	}else{
		window.onload = function (){
			oldonload();
			func();
		}
	}
}

function perparGarry(){
	if (!document.getElementsByTagName) { return false; }
	var links = document.getElementsByTagName("a");
	for (var i = 0; i < links.length; i++) {
		links[i].onclick = function(){
			return showPic(this);
		}
	}
}

function showPic(whichpic){
	if (!document.getElementById) { return false;}
	var placeholder = document.getElementById("placeholder");
	var description = document.getElementById("description");
	var source = whichpic.getAttribute("href");
	placeholder.setAttribute('src',source);

	var texts = whichpic.getAttribute("title")?whichpic.getAttribute("title"):" ";
	if (description.firstChild.nodeType == 3) {
		description.firstChild.nodeValue = texts;
	}
	return false;
}

function perparePlaceholder(){
	var placeholder = document.createElement("img");
	if (!document.getElementById("gallery")) { return false}
	var gallery = document.getElementById("gallery");
	placeholder.setAttribute("src","./images/placeholder.gif");
	placeholder.setAttribute("alt","占位图");
	placeholder.setAttribute("id","placeholder");

	var description = document.createElement("p");
	description.setAttribute("id","description");
	var text = document.createTextNode("图片");
	description.appendChild(text);
	insertAfter(placeholder,gallery);
	insertAfter(description,placeholder);
	// document.body.appendChild(placeholder);
	// document.body.appendChild(description);
}

function insertAfter(newElement,targetElement){
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement) {
		parent.appendChild(newElement);
	}else{
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}

function displayAbbreviations() {
    if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
    var abbreviation = document.getElementsByTagName("abbr");
    var defs = [];
    for (var i = 0; i < abbreviation.length; i++) {
    	var current_abbr = abbreviation[i];
    	if (current_abbr.length<1) { return false;}
    	var key = current_abbr.lastChild.nodeValue;
    	var definition = current_abbr.getAttribute("title");
    	defs[key] = definition;
    }
    var dlist = document.createElement("dl");
    for (key in defs){
    	var one = defs[key];
    	var dtitle = document.createElement("dt");
    	var dtitle_text = document.createTextNode(key);
    	var ddtitle = document.createElement("dd");
    	var ddtitle_text = document.createTextNode(one);
    	dlist.appendChild(dtitle);
    	dtitle.appendChild(dtitle_text);
    	dlist.appendChild(ddtitle);
    	ddtitle.appendChild(ddtitle_text);
    }
    document.body.appendChild(dlist);
}

addLoadEvent(perparePlaceholder);
addLoadEvent(perparGarry);
addLoadEvent(displayAbbreviations);