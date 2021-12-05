var database = firebase.database()

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var user = firebase.auth().currentUser;
    const uid = user.uid;
    alert(uid);
    if(user != null){

      var email_id = user.uid;
      // document.getElementById("userName").innerHTML = "Hi " + email_id;
      var user_ref = database.ref('users/' + uid + '/full_name')
        user_ref.on('value', function(snapshot){
          var data = snapshot.val()
          alert(data);
          document.getElementById("userName").innerHTML = "Hi " + data;
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

// function get(){
//   var user = firebase.auth().currentUser

//   var user_ref = database.ref('user/'+ user)
//   user_ref.on('value', function(snapshot){
//     var data = snapshot.val()
//     document.getElementById("userName").innerHTML = "Hi " + data;
//   })
// }







// var firebaseConfig = {
//     apiKey: "AIzaSyAyrUptJBfRavZ9Fv5ghdp7ADpvuzDWJTw",
//     authDomain: "workin-df7eb.firebaseapp.com",
//     databaseURL: "https://workin-df7eb-default-rtdb.firebaseio.com",
//     projectId: "workin-df7eb",
//     storageBucket: "workin-df7eb.appspot.com",
//     messagingSenderId: "480731653879",
//     appId: "1:480731653879:web:9ed025dfed2968923cd5f2",
//     measurementId: "G-T7FHBQJET7"
// };

// firebase.initializeApp(firebaseConfig);

// const auth = firebase.auth()
// const database = firebase.database()

// import { getAuth } from "firebase/auth";

// const auth = getAuth();
// const user = auth.currentUser;
// if (user !== null) {
//   // The user object has basic properties such as display name, email, etc.
//   const full_name = user.full_name;
//   document.getElementById("userName").innerHTML= full_name;

//   const email = user.email;
//   const photoURL = user.photoURL;
//   const emailVerified = user.emailVerified;

//   // The user's ID, unique to the Firebase project. Do NOT use
//   // this value to authenticate with your backend server, if
//   // you have one. Use User.getToken() instead.
//   const uid = user.uid;
// }

// function getUsername(){
//   const full_name = user.full_name;
//   var nama = document.getElementById("userName");
//   nama.innerHTML=full_name;
// }