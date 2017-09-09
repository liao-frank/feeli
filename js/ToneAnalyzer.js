
class ToneAnalyzer {

	constructor(api_url, username, password) {
		this.response = JSON.stringify({});
		this.api_url  = api_url;
		this.username = username;
		this.password = password;
	}

	request(text, callback, errorCallback){
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
	}

	formatResponse() {
		// format response into dict
	}

}