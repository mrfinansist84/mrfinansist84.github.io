const firebaseConfig = {
    apiKey: "AIzaSyCCPf2eBO8OuXoMMBCaQ8xXnznUE0saX-o",
    authDomain: "todo-af545.firebaseapp.com",
    databaseURL: "https://todo-af545.firebaseio.com",
    projectId: "todo-af545",
    storageBucket: "todo-af545.appspot.com",
    messagingSenderId: "943825692455",
    appId: "1:943825692455:web:70136e83a0a1f7fb"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

function updateUserData() {
    let usersData = db.collection("users").doc("usersData")
    return usersData.update({
            users: firebase.firestore.FieldValue.arrayUnion({
                login: document.querySelector('#email').value,
                password: document.querySelector('#password').value,
                id: Date.now()
            })
        }).then(function () {
            console.log("Document successfully written!");
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });
}

function getUserData() {
    db.collection("users").doc("usersData").get()
        .then(function (doc) {
            if (doc.exists) {
                doc.data().users.forEach((el) => {
                    if (el.login == document.querySelector('#email').value) {
                        console.log(el);
                    }
                });
            } else {
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
}

document.querySelector('#quickstart-sign-up').addEventListener('click', updateUserData);
document.querySelector('#quickstart-sign-up').addEventListener('click', getUserData);
document.querySelector('#quickstart-sign-in').addEventListener('click', getUserData);


function toggleSignIn() {
    if (firebase.auth().currentUser) {
        firebase.auth().signOut();
    } else {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if (email.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (password.length < 4) {
            alert('Please enter a password.');
            return;
        }
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;

            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
            document.getElementById('quickstart-sign-in').disabled = false;
        });
    }
    document.getElementById('quickstart-sign-in').disabled = true;
}

function handleSignUp() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    if (email.length < 4) {
        alert('Please enter an email address.');
        return;
    }
    if (password.length < 4) {
        alert('Please enter a password.');
        return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {

        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
    });
}

function initApp() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {

            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;

            document.getElementById('quickstart-sign-in').textContent = 'Sign out';

        } else {
            document.getElementById('quickstart-sign-in').textContent = 'Sign in';
        }
        document.getElementById('quickstart-sign-in').disabled = false;
    });
    document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
    document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
}
window.onload = function () {
    initApp();
};