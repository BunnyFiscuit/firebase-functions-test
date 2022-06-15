import * as functions from "firebase-functions";
export class GlobalConfig {
  static FirebaseRegion = "";
  static QRCollectionName = "";

  static load() {
    const config = functions.config();
    this.FirebaseRegion = config.general.region;
    this.QRCollectionName = config.collections.scan;
  }
}
