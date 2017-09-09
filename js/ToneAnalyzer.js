
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
	  var token = "fPX1WyQNaXyvDQfFspLudSNFxcXzXyxoDR76SYLgEcmnn3NvRb9P8h4EX87GaLVREhRWpwbwhkAz99KnvZMlCkY3swTjOnFINLYtCpx4sbj69xFe58Tbgu1Dj1LRaVb8ftykAyRgeIzOzetCvf3jVerHds%2FUygX4DgEXTPpbsU9HeS5ULOJYr%2F7mCTFzyPeeNDdwQ7JVSGoHlssawscGgR9F8%2BOXDOE2vYcFa%2FBGXbxNl%2FDUfq194sQssKGXUqJvCFGiekw2PcExDZll%2FY%2FcYvCKBerlAG1%2FaBd1mYZVaf75paBvKkn%2F2A%2FRSI%2BqZUAgpZFAcNODculOGtaU%2BHedrhbvGCP%2FjV7%2BlG5%2B9ws6Sf0RGe2agO%2B%2B0g9tMR24bPfzN3Ls8vb88mMrigapoDGSCwBShQt%2B2YPLVp3LY%2BFZnU%2BHFw6VO%2FTh7eGwjx0juzjWG2Z8VnTI8kd%2FSEvRzIA4zxqciYd9wwq53Cl77TK0RtyPTvouoGKnmwaoyLgAem%2F28%2Fwmgg2V0U32%2FJc9cWP%2FrmwBAKns9fSrpv3%2B1YxbTbyfLYxaaKZcvfm4w4tZkH9BEq4bdJXyLtw4CEZBQZghU5kEmyS3xoCDpPP8afIV%2B8eDiJzEzoocG9%2FLoPxyEMkfK0S7JNW4Y4ARdDdQIzRWngaGyY06nEqIWnnlK83vBYxpwOQYKy7BPH9bEMV9KncKjbMli1wnYh3UAEhc%2FjVCS%2FWUT6ggcsjreoNM%2BkHT%2BXB2iAf1cpBGFrmSBzEJjbCaOOmx2N2ohTRY1EmZIBckXU%2ByPbF6t4zsDsubcwWqrUIMGFz4vimWnjbgdLQtWxr1t5O%2BT%2F9uXbw8UmbxDExqjFodYJafLa5URL4sOJmIH5BgK1UhnVZClDe4mtKXph7CA6vuctzN%2FaFNdlWG3a86Mx4qIHjkN%2BLLW29XGqbLdFG7yzQ0XCP%2Fl6nX79RXEcE5obdM0%2BgefnTq%2Fo4lQrEVgJqKFaUNB0iPhStFmcIfVwE%3D";
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