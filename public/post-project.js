var database = firebase.database()
const db = getDatabase();
const ref = db.ref('https://workin-df7eb-default-rtdb.firebaseio.com/');
const { getDatabase } = require('firebase-admin/database');
function createProject(){
    alert('trying')
    var user = firebase.auth().currentUser;
    const uid = user.uid;
    alert(uid)
    if(user != null){
        alert('reading')
        caption = document.getElementById('captionField').value
        duration = document.getElementById('durationField').value
        workHours = document.getElementById('work_hoursField').value
        salary = document.getElementById('salaryField').value
        decription = document.getElementById('descriptionField').value
        responsibilities = document.getElementById('responsibilitiesField').value
        requirements = document.getElementById('requirementsField').value 

        var database_ref = database.ref()//walaupun gadipake, jangan dihapus, di gua eror kalo dihapus
        const projectsRef = firebase.database().ref('projects')  
        projectsRef.push({
            createdBy : uid,
            caption: caption,
            duration: duration,
            workHours: workHours ,
            salary: salary,
            decription: decription,
            responsibilities: responsibilities,
            requirements: requirements
        })
        alert('Project Created')     
    }
    
}