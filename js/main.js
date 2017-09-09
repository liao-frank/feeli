// API global variables
var api_url  = "https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone";
var username = "c8f5472c-6033-4bf6-a487-d822aee5aea5";
var password = "GOmulEknZltc";

// initialize libraries
var toneAnalyzer = new ToneAnalyzer(api_url, username, password);
var foo = new Foo();

function makeRequest() {
	var text = $('#input').val();
	toneAnalyzer.request(text, foo.handleResponse, foo.displayErrorMessage);
};

$(document).ready(function() {
	foo.updateInputTextarea();
	
	$('.analyze.button').click(function() {
		makeRequest();
	});

	// tabs
	$('.emotion.tab').click(function() {
		foo.switchTab('.emotion');
	});
	$('.personality.tab').click(function() {
		foo.switchTab('.personality');
	});
});

$(window).on('load', function() {
	function setHeight(selector, value) {
		let start = 5;
		let end = 100;
		let range = end - start;
		$(selector).css('height', `${value * range + start}px`);
	};

	setHeight('.joy.bar', 1);
	setHeight('.anger.bar', 1);
	setHeight('.disgust.bar', 0.5);
	setHeight('.fear.bar', 0.2);
	setHeight('.sadness.bar', 0);
});