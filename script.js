// Firebase configuration object (replace with your own from Firebase Console)

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBe4HYTFh05JGrnxMVyITVyWab6vnY9JrU",
  authDomain: "smart-attendance-470bb.firebaseapp.com",
  projectId: "smart-attendance-470bb",
  storageBucket: "smart-attendance-470bb.firebasestorage.app",
  messagingSenderId: "542373510211",
  appId: "1:542373510211:web:17294fa642127e6c3fa8f6",
  measurementId: "G-MQGNG2HNKS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);





// Select DOM elements
const loginForm = document.getElementById('login-form');
const userInfo = document.getElementById('user-info');
const markAttendanceBtn = document.getElementById('mark-attendance-btn');
const attendanceStatus = document.getElementById('attendance-status');
const welcomeMessage = document.getElementById('welcome-message');
const logoutBtn = document.getElementById('logout-btn');

// Register User
document.getElementById('register-btn').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
        await auth.createUserWithEmailAndPassword(email, password);
        alert('User registered successfully!');
    } catch (error) {
        alert(error.message);
    }
});

// Login User
document.getElementById('login-btn').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
        await auth.signInWithEmailAndPassword(email, password);
        alert('Logged in successfully!');
    } catch (error) {
        alert(error.message);
    }
});

// Mark Attendance
markAttendanceBtn.addEventListener('click', async () => {
    const user = auth.currentUser;
    if (user) {
        const attendanceRef = db.collection('attendance').doc(user.uid);
        await attendanceRef.set({
            attended: true,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        attendanceStatus.textContent = 'Attendance marked successfully!';
    } else {
        alert('You need to login first!');
    }
});

// Logout User
logoutBtn.addEventListener('click', async () => {
    await auth.signOut();
    loginForm.style.display = 'block';
    userInfo.style.display = 'none';
});

// Firebase Authentication state change listener
auth.onAuthStateChanged(user => {
    if (user) {
        loginForm.style.display = 'none';
        userInfo.style.display = 'block';
        welcomeMessage.textContent = `Welcome, ${user.email}`;
    } else {
        loginForm.style.display = 'block';
        userInfo.style.display = 'none';
    }
});
