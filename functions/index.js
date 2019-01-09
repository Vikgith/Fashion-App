//Firebase reference
const firebase = require("firebase");

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
var admin = require("firebase-admin");

//INITIALIZATION OF THE APP
var config = {
  apiKey: "AIzaSyBEabETYOBEgV2W7xAb3o4Ttm7AxS60k2M",
  authDomain: "fashion-app1.firebaseapp.com",
  databaseURL: "https://fashion-app1.firebaseio.com",
  projectId: "fashion-app1",
  storageBucket: "fashion-app1.appspot.com",
  messagingSenderId: "679694452362"
};
firebase.initializeApp(config)

var Auth = firebase.auth();

//This function create an API; request a email&Password by query, if the mail&psswrd is correct: send back the tokens and the data.
//https://us-central1-fashion-app1.cloudfunctions.net/signIn + "?email=" + email + "&password=" + password
//https://us-central1-fashion-app1.cloudfunctions.net/signIn?email=victor@gmail.com&password=123456

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.signIn = functions.https.onRequest((req, res) => {

  var email = req.query.email || "Unknowm"
  var password = req.query.password || "Unknowm"
    
  Auth.signInWithEmailAndPassword(email, password)
  .then(user => {
    // ////////Handle User Info///////////////
    var refreshToken = Auth.currentUser.refreshToken;
    var userData = user.user;

    // ///////Send the DATA to the APIrest////
    return Auth.currentUser.getIdToken().then(idToken => {

      var sender = {
        // "USER ": userData,
        "ACCESS TOKEN ":idToken,
        "REFRESH TOKEN ":refreshToken
      }

      return res.status(200).json({sender});
    })
  })

  .catch(error => {
    // ////////Handle Errors///////////////
    var errorCode = error.code;
    var errorMessage = error.message;

    // ///////Send the Error to API Rest///
    return res.send({
      "Error Code: ": errorCode,
      "Error Message: ": errorMessage
    });
  });
});

//This function create an API; request a User&Password by query, create new user and send back the tokens & data
//https://us-central1-fashion-app1.cloudfunctions.net/registerUser + "?email=" + email + "&password=" + password
//https://us-central1-fashion-app1.cloudfunctions.net/registerUser?email=vic@gmail.com&password=123456

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.registerUser = functions.https.onRequest((req, res) => {

  var email = req.query.email || "Unknowm"
  var password = req.query.password || "Unknowm"

  Auth.createUserWithEmailAndPassword(email, password)
  .then(user => {
    // ////////Handle User Info///////////////
    var refreshToken = Auth.currentUser.refreshToken;
    var userData = user.user;

    // ///////Send the DATA to the APIrest////
    return Auth.currentUser.getIdToken().then(idToken => {

      var sender = {
        // "USER ": userData,
        "ACCESS TOKEN ":idToken,
        "REFRESH TOKEN ":refreshToken
      }

      return res.status(200).json({sender});
    })
  })

  .catch(error => {
    // ////////Handle Errors///////////////
    var errorCode = error.code;
    var errorMessage = error.message;

    // ///////Send the Error to API Rest///
    return res.send({
      "Error Code: ": errorCode,
      "Error Message: ": errorMessage
    });
  });
});