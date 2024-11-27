import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
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
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// Initialize Firebase Authentication
const auth = getAuth(app);

// Register a new user
function registerUser(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User registered:", user);
    })
    .catch((error) => {
      console.error("Error registering user:", error);
    });
}

// Login user
function loginUser(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User logged in:", user);
    })
    .catch((error) => {
      console.error("Error logging in user:", error);
    });
}
import { getDatabase, ref, set, get } from "firebase/database";

// Initialize Realtime Database
const database = getDatabase(app);

// Save attendance data for a student
function recordAttendance(studentId, date, status) {
  set(ref(database, 'attendance/' + studentId + '/' + date), {
    status: status // "Present" or "Absent"
  })
  .then(() => {
    console.log("Attendance recorded!");
  })
  .catch((error) => {
    console.error("Error recording attendance:", error);
  });
}

// Retrieve attendance data for a student
function getAttendance(studentId, date) {
  const attendanceRef = ref(database, 'attendance/' + studentId + '/' + date);
  get(attendanceRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log("Attendance data:", snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error("Error retrieving attendance data:", error);
    });
}
