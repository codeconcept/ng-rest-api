import * as functions from 'firebase-functions';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
    console.log(`Logged at ${new Date().toISOString()}`);
    response.send("Hello from Firebase!");
});
