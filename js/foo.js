class Foo {

	constructor() {}

	handleResponse(tonesDict) {

		function 	setHeight(selector, value) {
			$(selector).css('height', `${value * 100}px`);
		};

		if (keys(tonesDict).length != 0){
			
			var joyHeight = tonesDict["emotion_tone"]["Joy"];
			var angerHeight = tonesDict["emotion_tone"]["Anger"];
			var disgustHeight = tonesDict["emotion_tone"]["Disgust"];
			var fearHeight = tonesDict["emotion_tone"]["Fear"];
			var sadnessHeight = tonesDict["emotion_tone"]["Sadness"];

			setHeight('.joy.bar', joyHeight);
			setHeight('.anger.bar', angerHeight);
			setHeight('.disgust.bar', disgustHeight);
			setHeight('.fear.bar', fearHeight);
			setHeight('.sadness.bar', sadnessHeight);
		}
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
	  	$('#input').val(selectedText);
	  }
	};
}