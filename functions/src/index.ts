import * as functions from "firebase-functions";
import { QRService } from "./services/QRService";
import { GlobalConfig } from "./GlobalConfig";
import { ScanModel, scanModelSchema } from "./models/ScanModel";
import { ZodError } from "zod";
import { Logger } from "./Logger";
import { FirestoreClient } from "./client/FirestoreClient";

GlobalConfig.load();
const firestoreClient = new FirestoreClient();
const qrService = new QRService(firestoreClient);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const addQRScanTask = (qrService: QRService) =>
  functions.https.onRequest(async (req, res) => {
    if (req.method !== "POST") {
      Logger.error("Request is not of type 'POST'");
      res.status(400).send();
      return;
    }
    let scanModel: ScanModel;
    try {
      scanModel = scanModelSchema.parse(req.body);
    } catch (e) {
      if (e instanceof ZodError) {
        Logger.error(JSON.stringify((e as ZodError).flatten(), undefined, 2));
      } else {
        Logger.error(e);
      }
      return;
    }
    await qrService.addQRScan(scanModel);
  });

exports.addQRScan = addQRScanTask(qrService);
