const {getApp, getApps, initializeApp} = require("firebase/app");
const {getFirestore} =  require("firebase/firestore");
const {getStorage} = require("firebase/storage");


const firebaseConfig = {
  apiKey: "AIzaSyC09IA6QLerT3y6Rcjzs7-oiy4NOMVs95E",
  authDomain: "seo-checker-e1e7e.firebaseapp.com",
  projectId: "seo-checker-e1e7e",
  storageBucket: "seo-checker-e1e7e.appspot.com",
  messagingSenderId: "361256814725",
  appId: "1:361256814725:web:10f99f765fbfd79fc381ec"
};

// Initialize Firebase

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app)

const storage = getStorage(app)

module.exports = {app, firestore, storage};


// const specialOfTheDay = doc(firestore, "dailySpecial/2023");

// exports.writeDailySpecial = () => {
//   const docData = {
//     desciption : "something",
//     price : 3.99,
//     milk : "vanila",
//     vegan : "false"
//   }
//   setDoc(specialOfTheDay, docData);
// }



