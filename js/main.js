// API global variables
var api_url  = "https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone";
var username = "c41c057a-1691-47ea-b599-69ce005c5f9a";
var password = "c41c057a-1691-47ea-b599-69ce005c5f9a";

// initialize libraries
var toneAnalyzer = new ToneAnalyzer(api_url, username, password);
var foo = new Foo();

$(document).ready(function() {
	$('.analyze.button').click(function() {
		foo.updateGraphs();
	});

	// tabs
	$('.emotion.tab').click(function() {
		foo.switchTab('.emotion');
	});
	$('.personality.tab').click(function() {
		foo.switchTab('.personality');
	});
});