var database = firebase.database()

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var user = firebase.auth().currentUser;
    const uid = user.uid;
    var projectId = getProjectId("projectId");
    getCompanyDescription(projectId);
    getProjectData(projectId);
    getApplier(projectId)
  } else {
    // No user is signed in.
  }
});

function getProjectId( projectId ){
    let parameters = new URLSearchParams(window.location.search);
    return parameters.get(projectId);
}

function getApplier(){
 
  let parameters = new URLSearchParams(window.location.search);
  var projectId = parameters.get("projectId");
  firebase.database().ref('projects/'+projectId).once('value').then(function(snapshot){
    var data = snapshot.val();
    var user = firebase.auth().currentUser;
    const uid = user.uid;
    if(data.createdBy==uid){
      firebase.database().ref('appliers/').once('value').then(function(snapshot){
        
        var data = snapshot.val();
        applier.innerHTML="";
        document.getElementById("applierTitle").innerHTML = "Applier";
        for(let[key,value] of Object.entries(data)){
          let parameters = new URLSearchParams(window.location.search);
          var projectId = parameters.get("projectId");
          if(value.postId==projectId){
            var postDiv = document.getElementById('applier');
            var data = snapshot.val(); 
            let parameters = new URLSearchParams(window.location.search);
            var projectId = parameters.get("projectId");
            
            firebase.database().ref('users/'+value.userId).once('value').then(function(snapshot){
            
              var data = snapshot.val();
              var postDiv = document.getElementById('applier');
              postDiv.innerHTML = "<li><p id='description' style='margin-top: 5px;' class='u-align-justify u-text u-text-default u-text-6'>"+"<b>nama: </b>"+data.full_name+"<b>   email: </b>"+data.email+"</p></li>"+postDiv.innerHTML;
            })
          }
        }
      })
    }
  })
}


function applyProject(){
  let parameters = new URLSearchParams(window.location.search);
  var projectId = parameters.get("projectId");
  
  firebase.database().ref('projects/'+projectId).once('value').then(function(snapshot){
    var user = firebase.auth().currentUser;
    const uid = user.uid;
    var data = snapshot.val();
    console.log(data);
    
    const bookmarksRef = firebase.database().ref('appliers')  
        bookmarksRef.push({
            postId : projectId,
            userId: uid
        })
        alert('Applied to project successful, please wait to be contacted by the project owner')
        getApplier();
     }
  )
}

function getProjectData(projectId){
    firebase.database().ref('projects/'+projectId).once('value').then(function(snapshot){
        var user = firebase.auth().currentUser;
        const uid = user.uid;
        var data = snapshot.val();
        
        document.getElementById("title").innerHTML = data.title;
        document.getElementById("duration").innerHTML = data.duration;
        document.getElementById("workHours").innerHTML = data.workHours;
        document.getElementById("salary").innerHTML = data.salary;
        document.getElementById("description").innerHTML = data.description;
        document.getElementById("responsibilities").innerHTML = data.responsibilities;
        document.getElementById("requirements").innerHTML = data.requirements;
    })
}

function getCompanyDescription(projectId){
    firebase.database().ref('projects/'+projectId).once('value').then(function(snapshot){
        var data = snapshot.val();
        firebase.database().ref('company/'+data.createdBy).once('value').then(function(snapshot){
          var data = snapshot.val();
          document.getElementById("companyName").innerHTML = data.companyDescription;
        })
      })
}