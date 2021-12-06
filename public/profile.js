var database = firebase.database()

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var user = firebase.auth().currentUser;
    const uid = user.uid;
    
    if(user != null){

      var email_id = user.uid;
      // document.getElementById("userName").innerHTML = "Hi " + email_id;
      var user_ref = database.ref('users/' + uid + '/full_name')
      var email_ref = database.ref('users/' + uid + '/email')
      var phone_ref = database.ref('users/' + uid + '/phone')
        user_ref.on('value', function(snapshot){
          var data = snapshot.val()
     
          document.getElementById("username").innerHTML = data;
        })
        email_ref.on('value', function(snapshot){
            var data = snapshot.val()
           
            document.getElementById("email").innerHTML = data;            
          })
        phone_ref.on('value', function(snapshot){
            var data = snapshot.val()
         
            document.getElementById("phone").innerHTML = data;            
        })
        
      // const uid = user.uid;
      // const name = user.full_name;
      // document.getElementById("userName").innerHTML= name;
      // console.log(uid)
      // console.log(user.uid)
    }
  } else {
    // No user is signed in.
  }
});