import * as functions from "firebase-functions";

import admin from "firebase-admin";
admin.initializeApp(functions.config().firebase);

export const test = functions
  .region("asia-northeast1")
  .https.onCall(async (_data, _context) => {
    console.log("test");
  });
