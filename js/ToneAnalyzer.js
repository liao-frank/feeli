
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
	  var token = "ekJBvmSf4Xw47JYEE7irgebL6B%2Btg1qQAPGo%2F4XHZHP4IumtMGL6gx9ox2YoJY2mj6CYffeWwoxfhACsQAyc3Li%2B0KFttWQrMEg%2BfxVWLxo6eoeHIy3F9SUbts5qYlF9jsMOQEDZUjWPESkbqOdBZuaTPCO6coDQZWL96lmBLuSKpKJgSUfSLutEhes1Z7AMQkMw4XafDmJo%2BBIm0tyioE6uqaDoLXhttVCqjWnxcMVCgCc%2B7xVQyBFUi0OPejB%2FuMVQ24k2KATWKjXNCphv3BLc4lYRg83hsQpdPkFpWai392KvdJSNhmd%2FB%2FB9H6XtDxRSI607I5GXZAXT5L7rZ1pU5C6nhooSX%2BFoTRpWOKIM9GLunqFluephPkDyIDp39Aar1Kk0CIbGnuqz02nVShYFT6y0V6L5kt7VipKrwBSGYsjWO0OjkUdFsIC3%2FNIMiPT4NNQnBPdNrJSTYLgBOQzlHx3Y2Ng3MiHNP5zmmYQbH2suc26%2BaQHwoAWfPlVW5y6r4nV3zmcR5RhRxIN3nLzYcYUA3iByZbS%2B2ZYeP14xpdmiHfbGGYUgbGVtfOZ%2F4eNPQdFNK2wRZR52MppD5TSL2VwVM6MWGI2E%2F6Bz2jp6%2FknEANuFhxFW9JzQzDyfcAUPxJavBNDfnDhGoiG8WvMR1aW2u4g4ubqYNQjxZ6YxbRSLxjdx2jdDoko%2FfzqOMZu1hvI7H%2FolbSjNTS94gL3LHrmZdx4xEv1y5GIBMfaV%2BhR2ZHKNpnV36y97zbqvHi5TGfGJJz%2BYanjNC2ljDubaxuQCuN7ZGJHzaRY39BtZlFO7ZbLdr4jO0oO%2BsmQLLFrSIkiOe0in%2B5yz59f6KnfUmkiqPYfE8NXNlElrCYeb6OrMn4lEENKAImF%2BmRUNHkPGJdN9fx97%2Fe622WJfPdyN7QbUwtu6DyCfMejEJ%2FnuijcWmHvCSEoTayEMWQlXU7aB5I7RccG1hyeNNzO0u7gnllBuOzNPb%2F7gYBJutH0%3D";
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