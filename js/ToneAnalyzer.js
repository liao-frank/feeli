
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
	  var token = "AnBgzmjTa9QoX%2BedJum9YbcoNt9%2B%2FmMKqSCxd%2BrlD45AiIseSEM8tKuRcQ1ZtPp%2BBTIulXYDG4gQay0vwXIwMLONKbcAFxBIyu0rfKOuF2RkeeOo%2BWqXeDJ24AzASrw38S817BgwdGoePGOaUz1LykkuYNSpIIfP9slDYxRU%2BPTxeudBt649dJCPNXP5PNBsypNFRWn5MrRrhX5AdVSOdQSqo6GxXUDavP0MIq%2BuIOKQI7tWVHhMbdyhTc5GFVq3aeycVRDCMf4lIeJMx0PmBs0y6pZHVbJBKnMH%2Fw6RZQP0SvJ7XtCRK%2BTqEz98AQ4GE88NL%2FSol5x639CrYirVEJBa%2Fo2Gas%2F9%2FeQfmsEive3IPjd05MhL9pk70ViWD%2BCaEXSWTJ15lzJhDJEpjrky7wD36Keu5YX%2FjGnSOhmZgQdinEhUycS8D2hZmMoXoXc5etr5k8fwkuxpt5t%2BfRbD1SF7gczc1E4zjci1mdVvMRIBTBY84JWppVYVHeoS%2FL%2BAAlvFngI3Yh%2B2%2FSWAR%2Fqqn2XRmMz4cFdvW2veqzFVLRykeyT1Sd7l%2FyLH1kyg8ozAMjzd7HWygMuSdLcAQddMy0KUJ80mXmWrmvGQ0H1U3FmI5DOons%2BOTH1XDu216WsBgeNBWiPqI4pXDcKNQj%2BQAErducLJTAIomq3wOMjK%2BZxe32UY38uud64aBWO%2BONvFFmEGwGEFI492WvpMeJqg9Vlklk9mT0H63%2FGpmLYWKQRzUYpg4O98VnrLRb4OxeNY6AGJSorxaGek7sS74%2BsuvKjyT0ZOZ5kvyAcnIXe5VnBlLZ4WyhWL1QixQ6Mz8%2F2Xy3qVhXLsYuXsMsvGFjk5rOgTitreLJqsqPK4e0GirSU89HTiycK0VV2UqqSGG%2F5QFg2bHr8TBG2bR3hjoUr8wbjopNh7jrV0vMHxkVV7LyTIgCXJJomD0hbf5KMkorYURK39CHh%2FocliuMfyliok02QDzg357O9naSdGR%2B6zmbs%3D";
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