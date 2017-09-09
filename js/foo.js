class Foo {

	constructor() {}

	setHeight(selector, value) {
		let start = 5;
		let end = 100;
		let range = end - start;
		$(selector).css('height', `${value * range + start}px`);
	};

	resetHeights() {
		let start = 5;
		$('.bar').css('height', `${start}px`);
	};

	

	resetScales() {
		$('.tick').css('left', '');
	};

	handleResponse(tonesDict) {
		function setHeight(selector, value) {
			let start = 5;
			let end = 125;
			let range = end - start;
			$(selector).css('height', `${value * range + start}px`);
		};

		// Takes in a big 5 class e.g. ".neuroticism"
		function setScale(selector, value) {
			let start = -2.2;
			let end = 97.4;
			let range = end - start;

			$(`${selector}.scale-space .tick`).css('left', `${range * value + start}%`)
		};

		if (Object.keys(tonesDict).length != 0) {
			var joyValue = tonesDict["emotion_tone"]["Joy"];
			var angerValue = tonesDict["emotion_tone"]["Anger"];
			var disgustValue = tonesDict["emotion_tone"]["Disgust"];
			var fearValue = tonesDict["emotion_tone"]["Fear"];
			var sadnessValue = tonesDict["emotion_tone"]["Sadness"];

			setHeight('.joy.bar', joyValue);
			setHeight('.anger.bar', angerValue);
			setHeight('.disgust.bar', disgustValue);
			setHeight('.fear.bar', fearValue);
			setHeight('.sadness.bar', sadnessValue);

			let social = tonesDict['social_tone'];

			setScale('.openness', social['Openness']);
			setScale('.conscientiousness', social['Conscientiousness']);
			setScale('.extraversion', social['Extraversion']);
			setScale('.agreeableness', social['Agreeableness']);
			setScale('.neuroticism', social['Emotional Range']);
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

	updateInputTextarea() {
	  chrome.tabs.executeScript( {
		  code: "window.getSelection().toString();"
		}, function(selection) {
		  $("#input").val(selection[0]);
		});
	};
}