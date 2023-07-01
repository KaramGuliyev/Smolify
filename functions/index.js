const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.linkCreated = functions.firestore.document("users/{userUID}/links/{linkID}").onCreate((snapshot, context) => {
  const { userUID, linkID } = context.params;
  const { longURL, shortCode } = snapshot.data();
  return admin.firestore().doc(`links/${shortCode}/`).set({
    userUID,
    linkID,
    longURL,
  });
});

exports.linkDeleted = functions.firestore.document("users/{userUID}/links/{linkID}").onDelete((snapshot, context) => {
  const { shortCode } = snapshot.data();
  return admin.firestore().doc(`links/${shortCode}/`).delete();
});
