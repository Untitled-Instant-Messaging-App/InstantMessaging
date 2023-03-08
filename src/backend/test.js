const crypto = require("crypto");

const aliceKeyPair = crypto.generateKeyPairSync("x25519");

const alicePubExport = aliceKeyPair.publicKey.export({
  type: "spki",
  format: "pem",
});

const bobKeyPair = crypto.generateKeyPairSync("x25519");

const bobPubExport = bobKeyPair.publicKey.export({
  type: "spki",
  format: "pem",
});

const bobKeyAgree = crypto.diffieHellman({
  publicKey: crypto.createPublicKey(alicePubExport),
  privateKey: bobKeyPair.privateKey,
});

const aliceKeyAgree = crypto.diffieHellman({
  publicKey: crypto.createPublicKey(bobPubExport),
  privateKey: aliceKeyPair.privateKey,
});

console.log(bobKeyAgree.toString("hex"));
console.log(aliceKeyAgree.toString("hex"));
