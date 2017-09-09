
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

		var authorizationBasic = btoa(username + ':' + password);

		// call API
	  var xhr = new XMLHttpRequest();
	  var token = "xlrhqQRLvgq79k0kzcuua5t0tGFYKJ%2Bbirkqs%2BjbZAZ4a401qOoV1DyNHupPS66I3qsSEOziFnQ7ZWcOCevV%2BpvSnlBqfT5aW6UL061itCenB7fau4OCOCBVaLr148Fhv1EdAPWlynsQ20558G6S2H%2Bp6mAwfptJi3gvbf%2BQ1%2BjNl6n5LzphIf%2Fm%2FcKCWStSCvceXlL7aCADZ9w9lt08z9hK7g8vQjYfMSnSAj6MeOM16%2FcPCy8G%2Fz0dkb1e%2B8hXPE5awYRQeoLccs6avQUBUwBLWULdO6bbOH9XfpyCFm2tcAyBP%2FFKADRD779jeGmrKzeD%2BWFEY7ST64egtzsiGs41c%2B03smvToqbTrZMf%2FrK2KNWSI1bx0TAymAoEmdDV0IB%2BU7xt7aIVaC43pTfz2s6y8R9Y8%2Bu2HYllRYzwZI5SyKk3UT8kBRjZEm0lJLQXhqY2xYHaEAczYkor8Lp73zl2lGaZ2g3SrdTM0yM2bhUGLsa5XqVuGqWLRm%2Fx5GWS5TUntTtLw34A8JYoIPt%2BkUt2wemKt0HhWly7%2BLLJfpnSqomXcIaK%2FgCjeFNzhRJ0HUy%2Fhkc0hJBAEAhHx1cnPL0r7A0YXq7Rx0p1UcnpVi7FGMnFTDkXwAZckHzlJvHCQVG7G9N3SALAMcm2bPkJg7NN2RKBCER7Vt%2F2n3BiS19J9g6ghTo5D7%2F45AS0zJ%2BdaWb7AOxAarBWy8XMGlwfFG0w1dk%2BJGJsRmw%2FKRJRQpAtmOcBFOQxIc6t71Se0ta%2FosSs7TS7zyIjYSeoC%2BdBVqaCnK4f%2Bl1SaMtGBg9Mn279fumQtx2648L3diP3BhFE50fSRnk7edCXdblVjHxKqBuhhDiLMszsGut1XfALV6BMHdNWysZQjk7eIin4Mqegu5I3WxDbJoI%2BgZ6MS9YCv5fmcBu1on6ghcK7PqPA1T6BfFZB6gblY%2FrZOUZYzL1ONk9fy71hJM5N6l5lNDls7LB9RXDV9Aa1sMEfWA9gbCw%3D"
	  xhr.open('GET', this.api_url+"?text="+encodeURIComponent(text)+"&version=2017-09-09", true);
		xhr.withCredentials = true;
		xhr.setRequestHeader("X-Watson-Authorization-Token", token);
	  xhr.responseType = 'json';

	  var tone_analyzer_instance = this;

	  xhr.onload = function() {
	    if (xhr.status == 200) {
	    	var stringified = JSON.stringify(xhr.response)
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