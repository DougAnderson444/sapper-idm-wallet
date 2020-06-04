import createWallet from "streamlined-idm-wallet-sdk";

const generateWallet = async (ipfsNode) => {
  wallet = await createWallet({ ipfs: ipfsNode });
  return wallet;
};

export default generateWallet;
