
class ToneAnalyzer {

	constructor(api_url, username, password) {
		this.response = JSON.stringify({});
		this.api_url  = api_url;
		this.username = username;
		this.password = password;
	}

	request(text, callback, errorCallback){
		// var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
		// var tone_analyzer = new ToneAnalyzerV3({
		//   username: this.username,
		//   password: this.password,
		//   version_date: '2017-09-09'
		// });

		// call API
	  var xhr = new XMLHttpRequest();
	  xhr.open('GET', this.api_url);
	  xhr.responseType = 'json';

	  xhr.onload = function() {
	    var response = xhr.response;
	    if (response.status == 200) {
	    	this.response = response;
		    callback(formatResponse());
	  	};
	  };

	  xhr.onerror = function() {
	    errorCallback(xhr.response.error);
	  };

	  xhr.send();
	  console.log(xhr.response);
	}

	formatResponse() {
		// format response into dict
		var results = JSON.parse(this.response);
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