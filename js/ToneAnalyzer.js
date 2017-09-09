
class ToneAnalyzer {

	constructor(api_url, username, password) {
		this.api_url  = api_url;
		this.username = username;
		this.password = password;
	}

	formatResponse(stringified_response) {
		// format response into dict
		var results = JSON.parse(stringified_response);
		var formatted = {};
		//should loop 3 times (emotion_tone, language_tone, social_tone)
		for (var i = 0, category; i < results.document_tone.tone_categories.length; i++) {
			category = results.document_tone.tone_categories[i];
			formatted[category.category_id] = {};
			//loops through each aspect of the tone (e.g. anger, disgust)
			for (var j = 0, aspect; j < category.tones.length; j++) {
				aspect = category.tones[j];
				formatted[category.category_id][aspect.tone_name] = aspect.score;
			}
		}
		return formatted;
	}


	request(text, callback, errorCallback){
		if (!text) {
			callback({});
			return;
		}

		var authorizationBasic = btoa(username + ':' + password);

		// call API
	  var xhr = new XMLHttpRequest();
	  var token = "RFaI7rLnZrqKl0aZtmUCpAtTs9fuwnvgb24wp6pXJzcLHO1iQZ9QhjTovlGrcyeBqyMcQympiMAEc5mG3IE1wWCRiHqMQgEtaUnR%2Fa2ItiGWVDibOCNQ3aSCXhNuU2WFXZv097oEAW%2FM1h4ypZkgr%2BWKuZFcvuL44IZYggxh2fFU65k0pdfU%2BUsahv770AImkGID8joQU8bix36BwLs53qxhB3N%2BbRd0bJ64aFPlDNGbp0WOjN6hEUi41ecdHD8Df3P7OAGrSMIC7tSQmSjNpeXUJjn4N%2BoBfQ8L4mI9B%2F4wDPox5ge2fK6JpC9ovMQGrrfXKnMWaHDWjLLtR2R0N8N%2Fi25PXXUBfEemCiBH5dWCN9vG%2BQCsx6X6SLB6WkFAUiftxxTDizdjCKFMJumiB0vLFUXS4tqG6kbwO3Hnky9LllQdGu%2FxRjzRzegwDoE3ep4D%2B2yezAOzzWNLdIgXJpn2yR4xIgCoPvj4qergPbwSaDPNi3n6jk5Kqwu9Yo3QGnjKip1c9aqKpAncEx35%2F4I3GcCdv4erZq%2Ftuypck7aNVP7HwiOtCpJvwlfAfjzMXMgKCjBfBINxTDMwF3%2F%2BMgBxkZfoQiSGo9ikTLmrsQDGhk%2BWLFNxQmqS6TrRclWS4cUPmqwmoQLMe%2BSgI%2ByO83jZ51I7JCnR0BGTcWZqN8r2ZPpqnOsZ%2FZowzZLFszh3IWO5JLszEQ4z3q78qbhbIkrcajMz1udg0oA7kDJG1idCcDmnBPnjzRMs2BHhgBDNkfXwbEC9EOMozApTN04J%2BAngCkb271cx0GWOUfrCNfDhkCbV0A%2FWePX4kgkl2goY94xaFvAeHZS8C9mUbZnb2A1jHZqYS5DmZ0fUAz5Me%2BNe%2FAc%2B5ezh2%2FghoSk710dkUVmtlKIhflTs2vSbOM9QWKZyn8GfoXxGckASZyPaEov0t5BoGrUk2qnInHXo5Ze0UZSSkR1utz6pMNte4CMPhS%2Ft9XUMRnGfUWLjLpzJETQ%3D";
	  xhr.open('GET', this.api_url+"?text="+encodeURIComponent(text)+"&version=2017-09-09", true);
		xhr.setRequestHeader("X-Watson-Authorization-Token", token);
	  xhr.responseType = 'json';

	  var tone_analyzer_instance = this;

	  xhr.onload = function() {
	    if (xhr.status == 200) {
	    	var stringified = JSON.stringify(xhr.response);
		    callback(tone_analyzer_instance.formatResponse(stringified));
	  	};
	  };

	  xhr.onerror = function() {
	    errorCallback(xhr.response.error);
	  };

	  xhr.send();
	}

}

// Testing...
// var testObject = `{
//   "document_tone": {
//     "tone_categories": [
//       {
//         "tones": [
//           {
//             "score": 0.028187,
//             "tone_id": "anger",
//             "tone_name": "Anger"
//           },
//           {
//             "score": 0.009247,
//             "tone_id": "disgust",
//             "tone_name": "Disgust"
//           },
//           {
//             "score": 0.037115,
//             "tone_id": "fear",
//             "tone_name": "Fear"
//           },
//           {
//             "score": 0.845697,
//             "tone_id": "joy",
//             "tone_name": "Joy"
//           },
//           {
//             "score": 0.036296,
//             "tone_id": "sadness",
//             "tone_name": "Sadness"
//           }
//         ],
//         "category_id": "emotion_tone",
//         "category_name": "Emotion Tone"
//       },
//       {
//         "tones": [
//           {
//             "score": 0,
//             "tone_id": "analytical",
//             "tone_name": "Analytical"
//           },
//           {
//             "score": 0,
//             "tone_id": "confident",
//             "tone_name": "Confident"
//           },
//           {
//             "score": 0,
//             "tone_id": "tentative",
//             "tone_name": "Tentative"
//           }
//         ],
//         "category_id": "language_tone",
//         "category_name": "Language Tone"
//       },
//       {
//         "tones": [
//           {
//             "score": 0.164704,
//             "tone_id": "openness_big5",
//             "tone_name": "Openness"
//           },
//           {
//             "score": 0.276647,
//             "tone_id": "conscientiousness_big5",
//             "tone_name": "Conscientiousness"
//           },
//           {
//             "score": 0.532027,
//             "tone_id": "extraversion_big5",
//             "tone_name": "Extraversion"
//           },
//           {
//             "score": 0.596415,
//             "tone_id": "agreeableness_big5",
//             "tone_name": "Agreeableness"
//           },
//           {
//             "score": 0.389945,
//             "tone_id": "emotional_range_big5",
//             "tone_name": "Emotional Range"
//           }
//         ],
//         "category_id": "social_tone",
//         "category_name": "Social Tone"
//       }
//     ]
//   }
// }`;

// var test = new Tone_API("", "", "");
// test.response = testObject;
// console.log(test.formatResponse());