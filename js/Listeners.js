
// API global variables
var api_url  = "https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone";
var username = "c41c057a-1691-47ea-b599-69ce005c5f9a";
var password = "c41c057a-1691-47ea-b599-69ce005c5f9a";


// initialize libraries
var toneAnalyzer = ToneAnalyzer(api_url, username, password);
var foo 				 = Foo();


// https://stackoverflow.com/questions/4712310/javascript-how-to-detect-if-a-word-is-highlighted
function getSelectedText() {
  var text = "";
  if (typeof window.getSelection != "undefined") {
    text = window.getSelection().toString();
  } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
    text = document.selection.createRange().text;
  }
  return text;
}


function updateInputTextarea() {
  var selectedText = getSelectedText();
  if (selectedText) {
  	// update text box with selected text
  	$('#input').value = selectedText;
  }
}

document.onmouseup = updateInputTextarea;
document.onkeyup = updateInputTextarea;


function updateGraphs() {
	text = $('#input').value;
	toneAnalyzer.request(text, foo.handleResponse, foo.displayErrorMessage);
}


$('.analyze.button').addEventListener("click", function() {
	updateGraphs();
});


document.addEventListener('DOMContentLoaded', function() {
	updateInputTextarea();
	var selectedText = getSelectedText();
	if (!selectedText) {
		$('.instructions').style.visibility = "visible";
		$('.emotion.page').style.display = "none";
		$('.personality.page').style.display = "none";
	} 
	else {
		$('.instructions').style.display = "none";
		$('.emotion.page').style.visibility = "visible";
		$('.personality.page').style.visibility = "visible";
		updateGraphs();
	}
});