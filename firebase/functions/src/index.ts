import * as admin from "firebase-admin";
import { updateRifaOnRatingWritten } from "./updateRifaOnRatingWritten";
import { updateRifas } from "./updateRifas";

admin.initializeApp();

export { updateRifaOnRatingWritten, updateRifas };
