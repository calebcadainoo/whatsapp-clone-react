import firebase from 'firebase';

const firebaseConfig = {
	apiKey: "AIzaSyA1xWfCHkSOEKwURvD3hXeeCb5eRSO-Jrg",
	authDomain: "whatsapp-clone-6170b.firebaseapp.com",
	databaseURL: "https://whatsapp-clone-6170b.firebaseio.com",
	projectId: "whatsapp-clone-6170b",
	storageBucket: "whatsapp-clone-6170b.appspot.com",
	messagingSenderId: "878374160363",
	appId: "1:878374160363:web:aa68036db669b26d1c7bae",
	measurementId: "G-FPZS5HH2NH"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db

