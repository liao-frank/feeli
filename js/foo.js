class Foo {

	constructor() {}

	handleResponse(tonesDict) {

		function setHeight(selector, value) {
			let start = 5;
			let end = 100;
			let range = end - start;
			$(selector).css('height', `${value * range + start}px`);
		};
		function resetHeights() {
			let start = 5;
			$('.bar').css('height', `${start}px`);
		};
		// Takes in a big 5 class e.g. ".neuroticism"
		function setScale(selector, value) {
			let start = -2.2;
			let end = 97.4;
			let range = end - start;

			$(`${selector}.scale-space .tick`).css('left', `${range * value + start}%`)
		};

		function resetScales() {
			$('.tick').css('left', '');
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
	  var text = "hello";
	  if (typeof window.getSelection != "undefined") {
	    text = window.getSelection().toString();
	  } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
	    text = document.selection.createRange().text;
	  }
	 //  chrome.tabs.executeScript( {
		//   code: "window.getSelection().toString();"
		// }, function(selection) {
		//   text = selection[0];
		// });
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