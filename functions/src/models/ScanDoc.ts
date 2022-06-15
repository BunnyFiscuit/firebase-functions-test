import { ScanModel } from "./Scan";

export class ScanDoc {
  id: string;
  scan: ScanModel;
  constructor(id: string, scanModel: ScanModel) {
    this.id = id;
    this.scan = scanModel;
  }
}
