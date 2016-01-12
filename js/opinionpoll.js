var userAcess = function(){

  this.registerUser = function(email, password){
    var ref = new Firebase("https://resplendent-fire-6177.firebaseio.com");
    ref.createUser({
        email : email,
        password : password
    }, 
    function(error, userData) {

      if(error) {
          alert("Your account creation was not successful:", error);
          return;
      }

          alert("You have successfully created user account with uid", userData);
          return;
          document.location.href = "./welcomepage.html";
          
      var refuser = ref.child("users")
     
      refuser.push().set({
        email : email,
        password : password             
      })
    })
  };
              
  

  this.login = function(email, password) { 

    var ref = new Firebase("https://resplendent-fire-6177.firebaseio.com");
    ref.authWithPassword({
    email    : email,
    password : password
    }, 
    function(error, authData) {
      if (error) {
        switch (error.code) {
          case "INVALID_EMAIL":
            console.log("The specified user account email is invalid.");
          break;
          case "INVALID_PASSWORD":
            console.log("The specified user account password is incorrect.");
          break;
          case "INVALID_USER":
           alert("The specified user account does not exist.");
          break;
          default:
            alert("Your loggin was not successfully done:", error);
        }
      } 
      else {
        document.location.href =  "./welcomepage.html";
        //console.log("Authenticated successfully with payload:", authData);
    }
    });
         
            
  }  


  this.resetPasswords = function(email){
    var ref = new Firebase("https://resplendent-fire-6177.firebaseio.com");
    ref.resetPassword({
        email : email
    }, 
    function(error) {
      if (error === null) {

        alert("Password reset email has been sent to your email");
        document.location.href =  "./dashBoard.html";
        return;
      } 
       else {
          alert("Error sending password reset email, please input a correct email:", error);
          
      }
    });

  };

  this.changePassword = function(email, oldPassword, newPassword){
    console.log('details',email, oldPassword, newPassword);
    var ref = new Firebase("https://resplendent-fire-6177.firebaseio.com");
     ref.changePassword({
      email : email,
      oldPassword : oldPassword,
      newPassword : newPassword
    }, 
    function(error) {
      if (error === null) {
        alert("Password changed successfully");
        console.log(error);
        // window.location.href = "opinionpollDashboard.html";
      } 
      else {
        alert("Error changing password:", error);
      }
    });
     ref.on("child_changed", function(snapshot, prevChildKey) {
     console.log('check this out',snapshot.val());
    });
  
  };
  this.logout = function(){
    var ref = new Firebase("https://resplendent-fire-6177.firebaseio.com");
    ref.unauth();
    alert("Thank you for your opinion. Goodbuy!");
    document.location.href =  "./dashBoard.html";

  }
};


$(document).ready(function(){
        $("#signUp").click(function(){

            var regName = $("#regUser").val();
            var regEmail = $("#regEmail").val();
            var regPassword = $("#pwd").val();
            var createUser = new userAcess();
            createUser.registerUser(regEmail, regPassword);
            //alert(createUser);
        }); 
        

        $(".form").submit(function(e){
          return false;
      });



        $("#login").click(function(){
            var logEmail = $("#loginEmail").val();
            var logPassword = $("#loginPwd").val();
            var loginUser = new userAcess();
            loginUser.login(logEmail, logPassword);
            //alert(result);
        }); 
 
      $("#retPwd").click(function() {
        var retEmail = $("#forgetEmail").val();
        //console.log('returned email', retEmail);
        var retrievePassword = new userAcess();
        retrievePassword.resetPasswords(retEmail);
      });

      $("#changePwd").click(function() {
        var changeEmail = $("#changeEmail").val();
        var oldPasswd = $("#oldPwd").val();
        var newPasswd = $("#newPwd").val();
        var changePasswd = new userAcess();
        changePasswd.changePassword(changeEmail, oldPasswd, newPasswd);
      });


       

      $("#logout_user").click(function() {
         var loguserOut = new userAcess();
         loguserOut.logout();

              
});


// $("#logout").click(function(){
//    var logoutuser = new registerUser();
//    alert (logoutuser.logout());
//  });



//  quizRef.unauth();




// prompt('Are you sure?');
//                 if(true){
//                   document.location.href = "./dashBoard.html";
//                 }
//                 else{
//                   return false;
//                 }
   });



















