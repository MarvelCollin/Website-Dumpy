import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBIlOKi4tGw5gqM8XV8hJPtIg-7avfaWxQ",
    authDomain: "bnccfrontend-b7d68.firebaseapp.com",
    projectId: "bnccfrontend-b7d68",
    storageBucket: "bnccfrontend-b7d68.appspot.com",
    messagingSenderId: "529760573068",
    appId: "1:529760573068:web:c699ea98f5a2cb070f4da9",
    measurementId: "G-H0MMYZS4YL"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();

document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();
    var name = document.getElementById('inputName').value;
    var email = document.getElementById('inputEmail').value;
    var message = document.getElementById('inputMessage').value;


    
    push(ref(database, 'messages'), {
        name: name,
        email: email,
        message: message,
        timestamp: Date.now()
    })
        .then(() => {
            alert("Message sent successfully!");
            document.getElementById('inputName').value = '';
            document.getElementById('inputEmail').value = '';
            document.getElementById('inputMessage').value = '';
        })
        .catch((error) => {
            console.error("Error sending message: ", error);
            alert("Failed to send message. Please try again later.");
        });
});