var database = firebase.database()

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var user = firebase.auth().currentUser;
    const uid = user.uid;
    alert(uid);
    if(user != null){

      var email_id = user.uid;
      var user_ref = database.ref('users/' + uid + '/full_name')
        user_ref.on('value', function(snapshot){
          var data = snapshot.val()
          alert(data);
          document.getElementById("userName").innerHTML = "Hi " + data;
        })
    }
    displayData();
  } else {
    // No user is signed in.
  }
});

function displayData(){
  firebase.database().ref('projects/').once('value').then(function(snapshot){
    var postDiv = document.getElementById('post');
    post.innerHTML="";
    var data = snapshot.val();
    console.log(data);
    

    //menampilkan semua post
    for(let[key,value] of Object.entries(data)){
      
      postDiv.innerHTML = 
      // "<div class='card'>"+"<h2>"+value.caption+"</h2>"+"<br></br>"+"</div>"+postDiv.innerHTML;
          "<div class='u-container-style u-list-item u-repeater-item'>"
          +"<div class='u-container-layout u-similar-container u-container-layout-2'>"
          +  "<div class='u-absolute-hcenter u-container-style u-expanded u-group u-radius-10 u-shape-round u-white u-group-1'>"
          +    "<div class='u-container-layout u-container-layout-3'>"
          +      "<p class='u-small-text u-text u-text-default u-text-variant u-text-1'>3 Hours Ago</p>"
          +     "<h1 class='u-text u-text-default u-title u-text-2'><b>"+value.createdBy+"</b>"
          +      "<p id='postName' class='u-large-text u-text u-text-variant u-text-3'>data dari database</p>"
          +      "<img class='u-image u-image-circle u-image-1' src='images/Foto_profil.jpg'  data-image-width='1280' data-image-height='852'>"
          +      "<p id='postDescription'class='u-text u-text-4'>"+value.description+"</p>"
          +      "<p id='postLikeCount'class='u-text u-text-default u-text-5'>"+value.likeCount+" People liked this</p>"
          +      "<a id='"+data.uid+"' onclick='bookmark(this.id)' class='u-border-none u-btn u-btn-round u-button-style u-custom-color-1 u-hover-palette-1-light-1 u-radius-5 u-btn-1'>Bookmark</a>"
          +      "<a href='https://nicepage.online' class='u-border-none u-btn u-btn-round u-button-style u-custom-color-1 u-hover-palette-1-light-1 u-radius-5 u-btn-2'>Like</a>"
          +      "<a href='https://nicepage.online' class='u-border-none u-btn u-btn-round u-button-style u-custom-color-1 u-hover-palette-1-light-1 u-radius-5 u-btn-3'>Share</a>"
          +    "</div>"
          +  "</div>"
        +  "</div>"
        +"</div>"+postDiv.innerHTML;
    }
  })
}

// function bookmark(key){
//   alert(key)

// }