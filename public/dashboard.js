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
    displayBookmarks();
  } else {
    // No user is signed in.
  }
});

function displayData(){
  firebase.database().ref('projects/').once('value').then(function(snapshot){
    var postDiv = document.getElementById('post');
    var data = snapshot.val();
    // console.log(data);

    //menampilkan semua post
    for(let[key,value] of Object.entries(data)){
      
      postDiv.innerHTML = 
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
          +      "<a id='"+key+"' onclick='bookmark(this.id)' class='u-border-none u-btn u-btn-round u-button-style u-custom-color-1 u-hover-palette-1-light-1 u-radius-5 u-btn-1'>Bookmark</a>"
          +      "<a href='https://nicepage.online' class='u-border-none u-btn u-btn-round u-button-style u-custom-color-1 u-hover-palette-1-light-1 u-radius-5 u-btn-2'>Like</a>"
          +      "<a href='https://nicepage.online' class='u-border-none u-btn u-btn-round u-button-style u-custom-color-1 u-hover-palette-1-light-1 u-radius-5 u-btn-3'>Share</a>"
          +    "</div>"
          +  "</div>"
          +  "</div>"
          +"</div>"+postDiv.innerHTML;
    }
  })
}

function displayBookmarks(){
  firebase.database().ref('bookmarks/').once('value').then(function(snapshot){
    var bookmarksDiv = document.getElementById('bookmarks');
    var user = firebase.auth().currentUser;
    const uid = user.uid;
    var data = snapshot.val();
    // console.log(data);

    //menampilkan semua Bookmarks
    for(let[key,value] of Object.entries(data)){
      alert(value.userId)
      if(value.userId==uid){
        firebase.database().ref('projects/'+value.postId).once('value').then(function(snapshot){
          var data = snapshot.val();
          firebase.database().ref('company/'+data.createdBy).once('value').then(function(snapshot){
            var data = snapshot.val();
            bookmarksDiv.innerHTML = 
                "<div class='u-container-style u-list-item u-repeater-item u-shape-rectangle'>"
                +"  <div class='u-container-layout u-similar-container u-container-layout-10'>"
                +"    <div class='u-custom-color-1 u-expanded-width u-radius-5 u-shape u-shape-round u-shape-2'></div>"
                +"   <p class='u-small-text u-text u-text-body-alt-color u-text-default u-text-variant u-text-17'>3 Hours Ago</p>"
                +"    <h1 class='u-text u-text-body-alt-color u-text-default u-title u-text-18'><b>"+data.company_name+"</b></h1>"
                +"    <p class='u-large-text u-text u-text-variant u-text-white u-text-19'>Baby Supliers Online Shop</p>"
                +"    <img class='u-image u-image-circle u-image-5' src='images/Foto_profil.jpg'  data-image-width='1280' data-image-height='852'></img>"
                +"  </div>"
                +"</div>"
                +bookmarksDiv.innerHTML;
          })
        })
      }
    }
  })
}

function bookmark(key){
  firebase.database().ref('projects/'+key).once('value').then(function(snapshot){
    var user = firebase.auth().currentUser;
    const uid = user.uid;
    var data = snapshot.val();
    // console.log(data);
    
    //membuat bookmarks baru
    const bookmarksRef = firebase.database().ref('bookmarks')  
        bookmarksRef.push({
            postId : key,
            dateCreated : Date.now(),
            userId: uid
        })
        alert('Bookmarks Created')  
    }
  )
}
