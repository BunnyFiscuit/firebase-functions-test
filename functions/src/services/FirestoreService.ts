import admin = require("firebase-admin");

let firebaseAdminApp: admin.app.App;
let hasLoadedFirebaseAdminApp = false;

/**
 * Initialises the Firebase admin app.
 */
export function getFirebaseAdminApp() {
  if (hasLoadedFirebaseAdminApp) return firebaseAdminApp;

  // Can optionally specify the credential to use:
  // const credential = admin.credential.cert(GlobalConfig.ServiceAccount as ServiceAccount)
  // firebaseAdminApp = admin.initializeApp({credential});

  firebaseAdminApp = admin.initializeApp();
  hasLoadedFirebaseAdminApp = true;
  return firebaseAdminApp;
}
