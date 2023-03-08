import Crypto from "crypto";
import { KeyPair } from "../../common/types";

export function generateKeyPair(): KeyPair {
  const generated = Crypto.generateKeyPairSync("x25519");
  const pubExport = aliceKeyPair.publicKey.export({
    type: "spki",
    format: "pem",
  });
  
}

const aliceKeyPair = Crypto.generateKeyPairSync("x25519");

const alicePubExport = aliceKeyPair.publicKey.export({
  type: "spki",
  format: "pem",
});

const alicePrivateExport = aliceKeyPair.privateKey.export({
  type: "pkcs8",
  format: "pem",
});

console.log("alicePubExport", alicePubExport);
console.log("alicePrivateExport", alicePrivateExport);
