import * as functions from "firebase-functions";
import { QRService } from "./services/QRService";
import { GlobalConfig } from "./GlobalConfig";
import { ScanModel, scanModelSchema } from "./models/Scan";
import { ZodError } from "zod";
import { Logger } from "./Logger";
import { FirestoreClient } from "./client/FirestoreClient";
import { ScanQuery, scanQuerySchema } from "./models/ScanQueryModel";

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

const logError = (e: any) => {
  if (e instanceof ZodError) {
    Logger.error(JSON.stringify((e as ZodError).flatten(), undefined, 2));
  } else {
    Logger.error((e as Error).message);
  }
};

const addQRScanFunction = (qrService: QRService) =>
  functions.https.onRequest(async (req, res) => {
    if (req.method !== "POST") {
      Logger.error("Request is not of type 'POST'");
      res.status(400).end();
      return;
    }
    let scanModel: ScanModel;
    try {
      scanModel = scanModelSchema.parse(req.body);
    } catch (e) {
      logError(e);
      res.status(400).end(e);
      return;
    }
    await qrService.addQRScan(scanModel);
    res.status(200).end();
    return;
  });

exports.addQRScan = addQRScanFunction(qrService);

const getQRScansFunction = (qrService: QRService) =>
  functions.https.onRequest(async (req, res) => {
    if (req.method !== "POST") {
      Logger.error("Not a valid method");
      res.status(400).send("Not a valid request method");
      return;
    }
    let scanQuery: ScanQuery;
    try {
      scanQuery = scanQuerySchema.parse(req.body);
    } catch (e) {
      logError(e);
      res.status(400).end(e);
      return;
    }
    const result = await qrService.getScans(scanQuery);
    res.status(200).send(result);
    return;
  });

exports.getQRScans = getQRScansFunction(qrService);
