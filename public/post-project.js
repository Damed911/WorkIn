var database = firebase.database()
const db = getDatabase();
const ref = db.ref('https://workin-df7eb-default-rtdb.firebaseio.com/');
const { getDatabase } = require('firebase-admin/database');
function createProject(){
    
    var user = firebase.auth().currentUser;
    const uid = user.uid;   
    if(user != null){
        caption = document.getElementById('captionField').value
        duration = document.getElementById('durationField').value
        workHours = document.getElementById('work_hoursField').value
        salary = document.getElementById('salaryField').value
        description = document.getElementById('descriptionField').value
        responsibilities = document.getElementById('responsibilitiesField').value
        requirements = document.getElementById('requirementsField').value 

        var database_ref = database.ref()//walaupun gadipake, jangan dihapus, di gua eror kalo dihapus
        const projectsRef = firebase.database().ref('projects')  
        projectsRef.push({
            createdBy : uid,
            dateCreated : Date.now(),
            likeCount : 0,
            caption: caption,
            duration: duration,
            workHours: workHours ,
            salary: salary,
            description: description,
            responsibilities: responsibilities,
            requirements: requirements
        })
        alert('Project Created')     
    }
}