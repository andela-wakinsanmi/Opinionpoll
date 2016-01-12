var ref = new Firebase('https://resplendent-fire-6177.firebaseio.com');

	//var retriever = function() {	


		var getList = function() {

			//retrieve questions from "Polls" tree --- see Firebase structure @url given
			ref.child("Polls").on('value', function(snapshot){
				var temp = snapshot.val();
				for(var key in temp){
					//for(var item2 in temp[item]){
					//var list = "<a href='take_poll.html/" + key + "'>"  + key.split("_").join(" ") + "?</a> <br />";
					
					var list = "<a href='take_poll.html'>"  + key.split("_").join(" ") + "?</a>  <a href='' class='take'>Take now </a> <br />";

					document.getElementById("view").innerHTML += list;
					 
					//}
					//console.log (item);	
				}
				
			});
		}


		//gets questions and options
		var getQ = function() {
			//retrieve questions from "Polls" tree --- see Firebase structure @url given
			ref.child("Polls").on('value', function(snapshot){
				var temp = snapshot.val();
	
					var getLink = function() {
						var link = document.getElementById("getLink").href;
						
					}

				for(var key in temp){
				    

						if(key == "what_do_you_like") {
							var q = key.split("_").join(" ") + "<br />";
							document.getElementById("view").innerHTML += q;
							
							ref.child("Polls/what_do_you_like").on('value', function(snapshot){
								var temp2 = snapshot.val();
								
								for(var key2 in temp2){
								//for(var item2 in temp[item]){
								var q2 =  "<span> <input value='' name='' type='radio' id=''>" + key2 + " <br /> <br /></span>";
								document.getElementById("view").innerHTML += q2;
							
							 
								}
						
							});
						}
					
				}
				
			});

		}