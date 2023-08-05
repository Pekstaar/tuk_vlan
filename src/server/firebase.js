import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyB7wNWwNHhfV4vRKhxdLMTN8Q6QhAYqYo4",
  authDomain: "video-conference-0829.firebaseapp.com",
  databaseURL: "https://video-conference-0829-default-rtdb.firebaseio.com",
  projectId: "video-conference-0829",
  storageBucket: "video-conference-0829.appspot.com",
  messagingSenderId: "184720853443",
  appId: "1:184720853443:web:f2959a3a4519b9df8c1576"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase;

var firepadRef = firebase.database().ref();

// export const userName = prompt("What's your name?");
const urlparams = new URLSearchParams(window.location.search);
const roomId = urlparams.get("id");

if (roomId) {
  firepadRef = firepadRef.child(roomId);
}
// else {
//   firepadRef = firepadRef.push();
//   window.history.replaceState(null, "Meet", "?id=" + firepadRef.key);
// }

export default firepadRef;
