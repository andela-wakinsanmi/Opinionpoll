// JavaScript Document


/*
===================================================
Start "getData function to retrieve poll questions and displays them on page
*/
/*	var getData = function() {
		
		//create reference to Firebase database
		var ref = new Firebase('https://resplendent-fire-6177.firebaseio.com');
		
		//retrieve questions from "Polls" tree --- see Firebase structure @url given
		ref.child("Polls").on('value', function(snapshot){
			var temp = snapshot.val();
			for(var key in temp) {
				var question = "<a href='#'>" + key + " </a> <br />";
				document.getElementById("view").innerHTML += question; 
				console.log(question);
			}
		});
	}
	
*/


//create reference to Firebase database
var ref = new Firebase('https://resplendent-fire-6177.firebaseio.com');


		var getList = function() {

			//retrieve questions from "Polls" tree --- see Firebase structure @url given
			ref.child("Polls").once('value', function(snapshot){
				var temp = snapshot.val();
				for(var key in temp){
					//for(var item2 in temp[item]){
					//var list = "<a href='take_poll.html/" + key + "'>"  + key.split("_").join(" ") + "?</a> <br />";
					
					var list = "<a href='take_poll.html?key=" + key + "'>"  + key.split("_").join(" ") + "?</a>  <br />";

					document.getElementById("view").innerHTML += list;
					 
					//}
					//console.log (item);	
				}
				
			});
		}
		

		var checkKey;
		var page = window.location.search.substring(1).split("=")[1];//use this to send question and user id pair to check multiple voting

		//gets questions and options
		var getQ = function() {
			//retrieve questions from "Polls" tree --- see Firebase structure @url given
			var myKey = window.location.search.substring(1).split("=")[1];

			ref.child("Polls").on('value', function(snapshot){
				var temp = snapshot.val();
				
				for(var key in temp){
	

					if(key === myKey) {
						var q = key.split("_").join(" ") + "<br />";
						document.getElementById("view").innerHTML = q;
							
						ref.child("Polls/" + key).once('value', function(snapshot){
							var temp2 = snapshot.val();
							//var radName = 0;
							for(var key2 in temp2){
								//console.log("key : " + key + " value : " + key2);
								var q2= "<span class='optionContainer'><input value='" + key2 + "' name='vote' type='radio' id='vote'> <label>"+key2 + "</label></span> <br clear='all' />";
								//radName++;
								document.getElementById("view").innerHTML += q2;
								checkKey = key;
							}
						});
					}
				}
			});
		}
		
		
		
		
		
	var process = function() {
		var ref = new Firebase("https://resplendent-fire-6177.firebaseio.com");
		var authData = ref.getAuth();

		if (authData) {//check if user is logged in

			var myObject = new OpinionManager("https://resplendent-fire-6177.firebaseio.com/");
//comment out
/*

				linksRef.child("vote_record").once("value", function(snapshot){

				if(snapshot.val()){
					for(var check in snapshot.val()){
						console.log(check);
					}
				}
				 return objToReturn;				
			});
*/
	
//comment out
			
			
			var vote = document.getElementsByName("vote");
			var sel;
			for(var i = 0; i< vote.length; i++){
						//console.log(vote[i].value);
	
					if(vote[i].checked){
						sel = vote[i].value;
					}
			}
			myObject.addOpinionPoll(checkKey, sel);//send value to firebase and increase count
			ref.child("vote_record").push({user: authData.uid, question: page});
			getUrl();
		}
		else {
			window.location.replace("login.html")
		}
		
		
		//check vote_record in firebase to avoid multiple votes
		ref.child("vote_record").on('value', function(snapshot){
		var rec = snapshot.val();

		
			//for(var key in rec) {
				//console.log(key);
			//}
		})

		//var myKey = window.location.search.substring(1).split("=")[1];
		//window.location = "pie.html?key=" + myKey;
	};

	//if user has voted on that question

	var getUrl = function(){
		var myKey = window.location.search.substring(1).split("=")[1];
		window.location = "pie.html?key=" + myKey;
	}
