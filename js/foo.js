
class Foo {

	constructor(){}

	handleResponse(tonesDict){
		// show tabs

	}

	switchTab(category){
		if (category == "Emotion"){
			
		}
		else if (category == "Personality"){

		}
		else {
			displayErrorMessage("No such tab exists.");
		}
	}

	displayErrorMessage(error){
		$('.errorMessage').innerHTML = error ;
		$('.errorMessage').style.visibility = "visible";
	}

}