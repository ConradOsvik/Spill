var brukerColl = db.collection('brukere');
var loginbtn = document.querySelector('#loginbutton');
var registerbtn = document.querySelector('#signupbutton')
var username = document.querySelector('#username');
var password = document.querySelector('#password');

var brukernavn = '';

const sjekkPassord = async (brukerId, passord) => {
    try{
        const ref = brukerColl.doc(brukerId);
        const bruker = await ref.get();
        if (passord == bruker.data().password) {
            console.log('success');
            brukernavn = brukerId;
            console.log(brukernavn);
            return true;
        }
        else {
            console.log('denied');
            return false;
        }
    }
    catch(err){
        console.log("Bruker ikke funnet");
    }
    
}
loginbtn.onclick = async () =>{
    const correct = await sjekkPassord(username.value,password.value);
     if(correct){
         console.log('logger in')
         var elem = document.querySelector('.loginscreen');
         elem.parentNode.removeChild(elem);
         addBodyClass();
         document.querySelector("#userinfodisplay").innerHTML = brukernavn;
     }
     else if (password.value == '' || username.value == '') 
         alert ("Skriv inn passord og brukernavn");
     else{
         alert ("Skriv inn riktig passord og brukernavn"); 
     }
 }

const sjekkNyBruker = (brukerId) => {
    var docRef = db.collection("brukere").doc(brukerId);
    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log('finnes');
            alert ('Brukeren finnes allerede')
        } else {
            console.log('finnes ikke');
            if(password.value == ''){
                alert ('skriv inn passord');
            }
            else{
                brukerColl.doc(username.value).set({
                    password: password.value,
                })
            }
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}
registerbtn.onclick = () =>{
    sjekkNyBruker(username.value);
}
 
function addBodyClass(){
    var element = document.body;
    element.className += "bodyfadein";
}
/*
*/
