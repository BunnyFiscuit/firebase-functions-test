import * as functions from "firebase-functions";
export class GlobalConfig {
  static FirebaseRegion = "europe-west3";
  static QRCollectionName = "scans";

  static load() {
    const config = functions.config();
    this.FirebaseRegion = config.general.region;
    this.QRCollectionName = config.collections.scan;
  }
}
