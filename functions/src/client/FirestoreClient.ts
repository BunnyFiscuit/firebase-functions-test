import { firestore } from "firebase-admin";
import { GlobalConfig } from "../GlobalConfig";
import { Logger } from "../Logger";
import { CustomQuery } from "../models/CustomQuery";
import { ScanDoc } from "../models/ScanDoc";
import { ScanModel, scanModelSchema } from "../models/Scan";
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
    const scanRef = this.db.collection(GlobalConfig.QRCollectionName);
    scanModel.timestamp = new Date().toISOString();
    let document: firestore.DocumentReference;
    try {
      document = await scanRef.add(scanModel);
    } catch (e) {
      Logger.error(`Couldn't add document - ${e}`);
      return null;
    }
    return document;
  }

  async getScans(filters: CustomQuery[], limit?: number): Promise<ScanDoc[]> {
    let query = this.db.collection(
      GlobalConfig.QRCollectionName
    ) as FirebaseFirestore.Query;

    for (const filter of filters) {
      query = query.where(filter.field, filter.operator, filter.value);
    }

    query = query.orderBy("timestamp", "desc");

    if (limit) {
      query = query.limit(limit);
    }
    const queryResult = await query.get();
    return queryResult.docs
      .filter((doc) => scanModelSchema.safeParse(doc.data()).success)
      .map((doc) => new ScanDoc(doc.id, scanModelSchema.parse(doc.data())));
  }
}
