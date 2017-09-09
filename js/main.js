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
		foo.resetHeights();
		foo.resetScales();
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
	foo.resetHeights();
	foo.resetScales();
});