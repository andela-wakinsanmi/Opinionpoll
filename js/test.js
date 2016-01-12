//linksRef.child("Polls").on('value', function(snapshot){
   var a = snapshot.val();
   var b = a["What is your favourite color?"];
       for(var check in b){
           for(var check2 in b[check]){
               console.log(b[check][check2]);
           }
       }
   
  });

// This is to get the value of the favourite color

linksRef.child("Polls").on('value', function(snapshot){
   var a = snapshot.val();
   var b = a["What is your favourite color?"];
       for(var check in b){
           for(var check2 in b[check]){
               console.log(b[check][check2]);
           }
       }
   
  });