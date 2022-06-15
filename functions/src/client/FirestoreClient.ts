import { firestore } from "firebase-admin";
import { GlobalConfig } from "../GlobalConfig";
import { Logger } from "../Logger";
import { ScanModel } from "../models/ScanModel";
import { getFirebaseAdminApp } from "../services/FirestoreService";

export class FirestoreClient {
  db: FirebaseFirestore.Firestore;
  constructor() {
    this.db = getFirebaseAdminApp().firestore();
    this.db.settings({ ignoreUndefinedProperties: true });
  }

  async addScan(
    scanModel: ScanModel
  ): Promise<firestore.DocumentReference | null> {
    const collectionName = GlobalConfig.QRCollectionName;
    scanModel.timestamp = new Date().toISOString();
    let document: firestore.DocumentReference;
    try {
      document = await this.db.collection(collectionName).add(scanModel);
    } catch (e) {
      Logger.error(`Couldn't add document - ${e}`);
      return null;
    }
    return document;
  }
}
