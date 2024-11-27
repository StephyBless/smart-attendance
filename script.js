// Firebase configuration object (replace with your own from Firebase Console)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

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
