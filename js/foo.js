class Foo {

	constructor() {}

	handleResponse(tonesDict) {
		// show tabs
		//document.getElementById("joy-bar").innerHTML = <rect x= y= width= height= />
		//document.getElementById("anger-bar").innerHTML = <rect x= y= width= height= />
		//document.getElementById("disgust-bar").innerHTML = <rect x= y= width= height= />
		//document.getElementById("fear-bar").innerHTML = <rect x= y= width= height= />
		//document.getElementById("sadness-bar").innerHTML = <rect x= y= width= height= />
	};

	switchTab(selector) {
		$('.page').removeClass('active');
		$(`.page${selector}`).addClass('active');
	};

	displayErrorMessage(error) {
		$('.errorMessage').innerHTML = error ;
		$('.errorMessage').style.visibility = "visible";
	};

	// https://stackoverflow.com/questions/4712310/javascript-how-to-detect-if-a-word-is-highlighted
	getSelectedText() {
	  var text = "";
	  if (typeof window.getSelection != "undefined") {
	    text = window.getSelection().toString();
	  } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
	    text = document.selection.createRange().text;
	  }
	  return text;
	};


	updateInputTextarea() {
	  var selectedText = getSelectedText();
	  if (selectedText) {
	  	// update text box with selected text
	  	$('#input').value = selectedText;
	  }
	};

	updateGraphs() {
		var text = $('#input').value;
		toneAnalyzer.request(text, foo.handleResponse, foo.displayErrorMessage);
	};
}