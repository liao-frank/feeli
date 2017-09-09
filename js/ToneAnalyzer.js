
class Tone_API {

	constructor(api_url, username, password) {
		this.response = JSON.stringify({});
		this.api_url  = api_url;
		this.username = username;
		this.password = password;
	}

	request(text, callback, errorCallback){
		// call API
		// format response
		// callback
		// errorCallback
	}

	formatResponse() {
		// format response into dict
	}

}