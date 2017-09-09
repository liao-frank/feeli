
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
	  var token = "U8Yfawk1k8%2Fwc3rjona1DdEFpDt4dwDkhqutnsic0KSN%2BJUtcgpWsXhVUSDTkm5hBJ76j7QYGq3afW69FH4F6JoAgbN5vwGtAv7SgDFq9ih0m1JNh5ELJXEKZv4uyiaQAlWaRicWbHuwcw57Z9H0cXBVglKGcdmerFLlwEdaY6CT1a3Ysez7vjWJe14xBlZyD34cXnfq9ImD9r5w0C7lgHqtkl%2FDyYJ%2BD4JRqatJauScqVoCn%2BWksaixAQQSdDJHeBnDQ01jaMiiaUW3LOgwzNb0alci0dEoYOlurz55T6X1hm0wF7fX9H2bZcR5U6bWFkeCLxCgyA2xfx%2BimkdiD2Ft2LuTYEXTiPn%2B5f8f%2FKrmeCHVlSp05WkASUbCNMU2n9%2F9Pv2d9WNek8Sq2uZq3xtEY%2B0yFahQ%2FYaBE24vmfgQX7%2BDMx%2B%2BZI8zxBuUI3hTr5EY5JMHy4He7oPXDbYHduw3PAGGkQaRxTAQXIk%2BSEE0Q3YoSIuh40V94%2Bk00gVpJrSVTBqQ6JSoVWuPr4OLTv6mnKLKyZfml0PZNoIGoMpge58Jl6zDzpa%2FeqZf0nS3p0tL785TLwoeH9dOr04sq0dgqQQhg8O8W5MyLyIwPJXKFOYxkuHp2LXp2wipRTCLxnTJoBIx%2FdWjBlCLcpY5xvocFKrzUxSq0afvsbFrFks3dfgxCIcowEDgTcQfIVmsfb%2Frx7sKjSeaZr2Vsy0W%2Bq1tV8WEtlRn%2F3rKeMOxegUpzp2VvFhMtR0ZF9cJeF4BXxx2CpFbRD1T%2Bc%2BD7qL674dBPUJjqvmKA5vQHlqahebQOuS2aSTKiz9aFymUOAe6S01ElGtyvB3tdflFxq5z766UUzC2u4n7TMRtWGjqPkP8MqNasnbbbKDA8iGo2u2%2FKKF1bjYOE49wSjZoA8GHaCdgFv5bwPIUWbonw5%2BiDbJKB0BpmhRVVPQJMA0H7Xw1XhQvf4docaros%2FlmBf2VfZ2l0KIxMX2tFs9KZ%2FC%2FkJU%3D";
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