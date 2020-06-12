import IPFS from "ipfs";
var Buffer = require('buffer/').Buffer // note: the trailing slash is important!

async function main(username, tld, password, data) {
  let salt, iterations, keySize, hash;
  salt = `${username}${tld}`;
  iterations = 10000;
  keySize = 32;
  hash = "sha2-256";
  var derivedKey = IPFS.crypto.pbkdf2(
    password,
    salt,
    iterations,
    keySize,
    hash
  );

  const bits = 256;
  // seed is a 32 byte uint8array
  var buf = Buffer.from(derivedKey, "utf8");
  var seed = await IPFS.multihashing.digest(buf, "sha2-256");
  //var decoded = IPFS.multihash.decode(encoded).digest
  var seed64= encoded.toString("base64");

  // ENCRYPT Stuff
  
// A 16 bytes array, 128 Bits,
const IV = Buffer.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
// iv = .padEnd(20, "=")

}
