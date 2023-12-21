const { firestore } = require("../config/config.js");
const { collection, addDoc, getDocs } = require("firebase/firestore"); 

const parsedData = collection(firestore, 'htmlData');

//write data
exports.writeParsedData = (dataObject) => {
  setDoc(parsedData, dataObject);
};

//read data
exports.readParsedData = () => {

};