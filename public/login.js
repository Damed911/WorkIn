var firebaseConfig = {
    apiKey: "AIzaSyAyrUptJBfRavZ9Fv5ghdp7ADpvuzDWJTw",
    authDomain: "workin-df7eb.firebaseapp.com",
    databaseURL: "https://workin-df7eb-default-rtdb.firebaseio.com",
    projectId: "workin-df7eb",
    storageBucket: "workin-df7eb.appspot.com",
    messagingSenderId: "480731653879",
    appId: "1:480731653879:web:9ed025dfed2968923cd5f2",
    measurementId: "G-T7FHBQJET7"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const database = firebase.database()

function Nama() {
  document.getElementById("label").innerHTML= "name";
}

function login(){
  
    email = document.getElementById('eemail').value
    password = document.getElementById('lpassword').value
    alert("email: "+email +"\npassword : " +password )//remove before deployment
    auth.signInWithEmailAndPassword(email, password)
     
    .then(function() {
      var user = auth.currentUser
      var database_ref = database.ref()
      var user_data = {
      last_login : Date.now()
    }

      // Push to Firebase Database
      database_ref.child('users/' + user.uid).update(user_data)
      window.location.href='Dashboard.html';
      alert(user);
        
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      alert('User failed Logged In!!') 
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
}