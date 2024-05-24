import { Wallet, ethers, formatEther } from "ethers";
import dotenv from "dotenv";
dotenv.config();
import { EthStorageNode as EthStorage } from ".";

const getWallet = () => {
  const pk = process.env.privateKey;
  if (pk) {
    return new Wallet(pk);
  } else {
    const wallet = Wallet.createRandom();
    console.log(`privateKey:  ${wallet.privateKey}`);
    console.log(`address ${wallet.address}`);
    return wallet;
  }
};

const getRpc = () => {
  return new ethers.JsonRpcProvider(process.env.rpc);
};

const main = async () => {
  const wallet = getWallet();
  const rpc = getRpc();
  const balance = await rpc.getBalance(wallet.address);
  const storage = new EthStorage(
    process.env.rpc as string,
    wallet.privateKey,
    "0xbe3EEe31e274aabf33F455D5b29Cc96329FC39eb"
  );

  console.log(`wallet address : ${wallet.address}`);

  console.log(`balance : ${formatEther(balance)} `);
  const fileOrPath = "./package.json";
  await storage.upload(fileOrPath);
  // const flatAddress = await storage.deploySepolia();
  // console.log(flatAddress);

  await storage.uploadData("/world", "Hello World");
};

main();
