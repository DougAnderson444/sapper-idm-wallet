// IPFS
import IPFS from "ipfs";

export default async function createIPFS(username) {
  let repo = "ipfs-" + username;

  // pass must be at least 20 char long
  const pass = "01234567890123456789";

  const options = {
    repo: repo, // default is "ipfs", string or ipfs.Repo instance, file path at which to store the IPFS node’s data, String(Math.random() + Date.now())
    pass: pass, // https://github.com/ipfs/js-ipfs/issues/1138
    config: {
      Addresses: {
        Swarm: [
          // "/dns4/ws-star1.par.dwebops.pub/tcp/443/wss/p2p-websocket-star",
          //"/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star",
          "/dns4/super.peerpiper.io/tcp/13577/wss/p2p-webrtc-star",
          "/dns4/super.peerpiper.io/tcp/4033/wss/ipfs/QmPFeUqE4x17gy6cV3bb9yjfiZvwPAtmwmt4zZqgnfEoz5",
        ],
      },
    },
  };

  let node = await IPFS.create(options);
  return node;
}
