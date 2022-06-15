import * as functions from "firebase-functions";

export class Logger {
  static info(...message: any[]) {
    if (this.isRunningInFirebase()) {
      //const functions = require("firebase-functions");
      functions.logger.info(message);
    } else {
      console.info(message);
    }
  }

  static warn(...message: any[]) {
    if (this.isRunningInFirebase()) {
      const functions = require("firebase-functions");
      functions.logger.warn(message);
    } else {
      console.warn(message);
    }
  }

  static error(...message: any[]) {
    if (this.isRunningInFirebase()) {
      const functions = require("firebase-functions");
      functions.logger.error(message);
    } else {
      console.error(message);
    }
  }

  private static isRunningInFirebase(): boolean {
    return process.env.FIREBASE_CONFIG !== undefined;
  }
}
