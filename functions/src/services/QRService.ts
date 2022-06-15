import { FirestoreClient } from "../client/FirestoreClient";
import { Logger } from "../Logger";
import { carParts } from "../models/CarParts";
import { ScanModel } from "../models/ScanModel";

export class QRService {
  firestoreClient: FirestoreClient;
  private colorRegex = "#[0-9a-fA-F]{6}";

  constructor(firestoreClient: FirestoreClient) {
    this.firestoreClient = firestoreClient;
  }

  async addQRScan(scanModel: ScanModel) {
    const colorOk = new RegExp(this.colorRegex).test(scanModel.color);
    const partOk = carParts.includes(scanModel.part);
    if (!colorOk && !partOk) {
      Logger.error(`Scan Model includes invalid data`);
      return;
    }
    await this.firestoreClient.addScan(scanModel);
  }
}
