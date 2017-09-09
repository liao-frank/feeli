
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


// analyze button listener
$('.analyze.button').addEventListener("click", function() {
	text = $('#input').value;
	toneAnalyzer.request(text, foo.handleResponse, foo.displayErrorMessage);
});


document.addEventListener('DOMContentLoaded', function() {

});