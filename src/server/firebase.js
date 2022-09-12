import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyB7wNWwNHhfV4vRKhxdLMTN8Q6QhAYqYo4", // Add API Key
  databaseURL: "https://video-conference-0829-default-rtdb.firebaseio.com/", // Add databaseURL
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
