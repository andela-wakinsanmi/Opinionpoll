/*
		This class create fresh Opinion
*/
function OpinionManager(fireBaseUrl){
	this.fireBaseUrl = fireBaseUrl;
	this.pollRateClicked;
	var linksRef =  new Firebase(this.fireBaseUrl);

   /*
		To create opinion, pas the opinion question
		opinionAnswers is an array of all the answers options
   */
   //********create Opinion
	this.createOpinion = function(opinionQuestion, opinionAnswers){

		if(!isAnyInputFieldBad(opinionQuestion,opinionAnswers)){
			opinionQuestion = opinionQuestion.split(" ").join("_").replace(/\?/g,'').toLowerCase();

			var flag = false;

			linksRef.child("Polls").on('value', function(snapshot){
   				var a = snapshot.val();
       			for(var check in a){
         	  		if(check === opinionQuestion){
         	  		flag = true;
         	  		}
      			}
					if(!flag){
					//create fresh opinion
					createNewOpinion(opinionQuestion,opinionAnswers);
					}
  			});
  		}  else {
  			//return bad string;
  		}
	};
	//check if any input field is empty
	var isAnyInputFieldBad = function(opinionQuestion,opinionAnswers){
		
		if(checkString(opinionQuestion)){
			return true;
		}	
		var arrLength = opinionAnswers.length;
		for(var i = 0; i< arrLength; i++){
			if(checkString(opinionAnswers[i])){
				return true;
			}
		}
		return false;
	}

	var checkString = function(str) {
	 		if (!(!str.replace(/\s/g, '').length || str === "" || str === undefined || str === null)) {
				flag = false
			} else{
				flag = true
			}
			return flag;
	}	

	var createNewOpinion = function(opinionQuestion,opinionAnswers){
		var objectToPush = { };
		//loping through opinionAnswers array and initializing to zero in objectTopush
		var arrLength = opinionAnswers.length;
		for(var i = 0; i<arrLength; i++){
			objectToPush[opinionAnswers[i].toLowerCase()] = 0;
		}
		linksRef.child("Polls").child(opinionQuestion).set(objectToPush);
	};
	
	//******************add opinion add the poll clicked
	//pass the opinion question and the opinion answer that is selected
	this.addOpinionPoll = function(opinionQuestion, opinionAnswerClicked){
		//get value from poll and add one to it 		
		linksRef.child("Polls").child(opinionQuestion).child(opinionAnswerClicked).once("value", function(snapshot){
			 if(snapshot.val() !== undefined){
			 	var returnedVal = linksRef.child("Polls").child(opinionQuestion).child(opinionAnswerClicked);
  						returnedVal.set(parseInt(snapshot.val()) + 1);
			 		
			 } 
		});

	};
/************** This list all opinions present and returns an objects
*/
	this.listOpinionPolls = function(){
							var objToReturn = {};
			linksRef.child("Polls").once("value", function(snapshot){
				if(snapshot.val()){
					for(var check in snapshot.val()){
						objToReturn[check] = {};
						for(var nextCheck in snapshot.val()[check]){
							objToReturn[check][nextCheck] = snapshot.val()[check][nextCheck];
						}
					}
				}
				 return objToReturn;				
			});

	}

/************ This updates the opinion poll question pass into it

***/
	this.updateOpinionPoll = function(opinionQuestion, updatedVersionQuestion){
		console.log(opinionQuestion + " : " + updatedVersionQuestion);
		opinionQuestion = opinionQuestion.split(" ").join("_").replace(/\?/g,'').toLowerCase();
		updatedVersionQuestion = updatedVersionQuestion.split(" ").join("_").replace(/\?/g,'').toLowerCase();
		//var linksRefNew =  new Firebase(this.fireBaseUrl + "/Polls/"+opinionQuestion);
		//linksRefNew.transaction();

	};

	this.deleteOpinionPoll = function(opinionQuestion){
		opinionQuestion = opinionQuestion.split(" ").join("_").replace(/\?/g,'').toLowerCase();
		linksRef.child("Polls").child(opinionQuestion).remove();
	};
		
}
//Calls
//using class ....
		function createOpinionPull(){
		//var linksRef = new Firebase('https://resplendent-fire-6177.firebaseio.com');

        var question = document.getElementById("question").value;
        var firstOpinion = document.getElementById("firstOpinion").value;
 		var secondOpinion = document.getElementById("secondOpinion").value;
 		var thirdOpinion = document.getElementById("thirdOpinion").value;
 		var fouthOpinion = document.getElementById("fouthOpinion").value;

 		var arrayOfOptions = [firstOpinion,secondOpinion,thirdOpinion,fouthOpinion];

 		var link = "https://resplendent-fire-6177.firebaseio.com";

 		var myObj2 = new OpinionManager(link);

 		myObj2.createOpinion(question, arrayOfOptions);
 		//window.location.replace("list_polls.html");
}

 function getList() {
 			 		var objectEze = new OpinionManager("https://resplendent-fire-6177.firebaseio.com");
 			 		var pollsReturned = objectEze.listOpinionPolls();
 			 		console.log(pollsReturned);

}
